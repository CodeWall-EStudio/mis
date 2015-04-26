package com.codewalle.mis.controller;

import com.android.volley.Request;
import com.android.volley.toolbox.StringRequest;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.framework.network.CWRequestBuilder;
import static com.codewalle.mis.controller.SubjectController.*;


/**
 * Created by xiangzhipan on 15/4/25.
 */
public class RequestBuilder extends CWRequestBuilder{

    static final String BASE_URL = "http://mis.codewalle.com/";
    static final String SUBJECT_SEARCH_PATH = "cgi/subject/search";
    static final String SUBJECT_ARCHIVED_PATH = "cgi/subject/archived";
    static final String SUBJECT_FOLLOWING_PATH = "cgi/subject/following";
    static final String SUBJECT_INVITED_PATH = "cgi/subject/invited";

    static final String ARTICLE_PATH = "cgi/article/search";

    static final String LOGIN_PATH = "cgi/account/login";

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
                getArticlesUrl(subjectId,start,limit),
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

}
