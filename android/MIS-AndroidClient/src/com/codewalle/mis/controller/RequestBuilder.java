package com.codewalle.mis.controller;

import com.android.volley.Request;
import com.android.volley.toolbox.StringRequest;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.framework.network.CWRequestBuilder;
import com.codewalle.mis.model.Article;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static com.codewalle.mis.controller.SubjectController.*;


/**
 * Created by xiangzhipan on 15/4/25.
 */
public class RequestBuilder extends CWRequestBuilder{

    public static final String BASE_URL = "http://mis.codewalle.com/";
    public static final String SUBJECT_SEARCH_PATH = "cgi/subject/search";
    public static final String SUBJECT_ARCHIVED_PATH = "cgi/subject/archived";
    public static final String SUBJECT_FOLLOWING_PATH = "cgi/subject/following";
    public static final String SUBJECT_INVITED_PATH = "cgi/subject/invited";

    public static final String ARTICLE_PATH = "cgi/article/search";

    public static final String CREATE_ARTICLE_PATH = "cgi/article/create";

    public static final String LOGIN_PATH = "cgi/account/login";
    public static final String UPLOAD_PATH = "cgi/resource/upload";

    public static final String DOWNLOAD_PATH = "cgi/resource/download";

    private RequestBuilder(){
        super();
    }

    private static RequestBuilder instance;
    public synchronized static RequestBuilder getRequestBuilder(){
        if(instance == null){
            instance = new RequestBuilder();
        }
        return instance;
    }

    @Override
    public String getBaseUrl() {
        return BASE_URL;
    }

    @Override
    public String getLoginPath() {
        return LOGIN_PATH;
    }


    public Request<String> getSubjects(int type,int start,int limit,CWResponseListener listener){
        StringRequest request = getSimpleStringRequest(
                getSubjectUrl(type,start,limit),
                Request.Method.GET,
                listener.getResponseListener(),
                listener.getErrorListener()
        );
        return request;
    }

    public Request getArticles(long subjectId, int start, int limit, CWResponseListener listener) {
        StringRequest request = getSimpleStringRequest(
                getArticlesUrl(subjectId, start, limit),
                Request.Method.GET,
                listener.getResponseListener(),
                listener.getErrorListener()
        );
        return request;
    }

    private String getArticlesUrl(long subjectId,int start,int limit){
        String url = BASE_URL+ARTICLE_PATH;
        url += "?subjectId="+subjectId+"&start="+start+"&limit="+limit+"&orderby=updateTime";
        return url;
    }

    private String getSubjectUrl(int type,int start,int limit){
        String path = "";
        String query = "?start="+start+"&limit="+limit+"&orderby=updateTime";
        switch (type){
            case TYPE_ARCHIEVED:
                path = SUBJECT_ARCHIVED_PATH;
                break;
            case TYPE_CREATED_BY_SELF:
                path = SUBJECT_SEARCH_PATH;
                query += "&creator=" + CWApplication.getApp().getUser().id;
                break;

            case TYPE_PUBLIC:
                path = SUBJECT_SEARCH_PATH;
                query += "&private=1";
                break;
            case TYPE_FOLLOWING:
                path = SUBJECT_FOLLOWING_PATH;
                break;
            case TYPE_INVITED_ME:
                path = SUBJECT_INVITED_PATH;
                break;
        }
        String url = BASE_URL + path + query;
        return url;
    }
/*POST /cgi/article/create
REQ
    title:
    content:
    lables:[]
    resources:[]
    subjectId:
RES
    {
        "code": 0,
        "data": {
        "id": 26,
        "title": "这是标题啊",
        "content": "内容主体",
        "creator": 1,
        "createTime": "2015-03-29T10:41:35.000Z",
        "updator": 1,
        "updateTime": "2015-03-29T10:41:35.000Z",
        "subject_id": 1
        }
    }*/
    public Request createArticle(String subjectId,String title,String content,ArrayList<Integer> labels,ArrayList<Integer> resources,CWResponseListener listener) {
        String path = CREATE_ARTICLE_PATH;
        String url = BASE_URL + path;
        return getSimpleStringRequest(url, Request.Method.POST,listener.getResponseListener(),listener.getErrorListener(),
                "subjectId",subjectId,
                "title",title,
                "content",content,
                "lables",intArrayToJSONArray(labels),
                "resources",intArrayToJSONArray(resources)
                );
    }

    public Request uploadResource(String filePath, CWResponseListener listener,String... args) throws FileNotFoundException {
        String url = BASE_URL + UPLOAD_PATH + "?format=json";
        return getFileStringRequest(url,filePath,listener.getResponseListener(),listener.getErrorListener(),args);
    }

    public static String intArrayToJSONArray(List<Integer> arr){
        StringBuilder sb = new StringBuilder();
        sb.append("[");

        for(int i:arr){
            sb.append(i);
            sb.append(",");
        }

        sb.append("]");
        return sb.toString();
    }

    public static String stringArrayToJSONArray(String[] arr){
        StringBuilder sb = new StringBuilder();
        sb.append("[");

        for(String str:arr){
            sb.append("'"+str.replace("'","\\'")+"',");
        }

        sb.append("]");
        return sb.toString();
    }

    public Request getComments(long articleId, int start, int limit, CWResponseListener listener) {
        StringRequest request = getSimpleStringRequest(
                getCommentUrl(articleId, start, limit),
                Request.Method.GET,
                listener.getResponseListener(),
                listener.getErrorListener()
        );
        return request;
    }

    public Request getCreateComment(Article article, String commentContent, CWResponseListener listener) {
        StringRequest request = getSimpleStringRequest(
                getCreateCommentUrl(),
                Request.Method.POST,
                listener.getResponseListener(),
                listener.getErrorListener(),
                "title","",
                "content",commentContent,
                "subjectId",""+article.subjectId,
                "articleId",""+article.id
        );
        return request;
    }
    private String getCommentUrl(long articleId, int start, int limit) {
        String path = "cgi/comment/search";
        String query = "?start="+start+"&limit="+limit+"&orderby=updateTime&articleId="+articleId;
        String url = BASE_URL + path + query;
        return url;
    }

    public String getCreateCommentUrl() {
        String path = "cgi/comment/create";
        String url = BASE_URL + path;
        return url;
    }

}
