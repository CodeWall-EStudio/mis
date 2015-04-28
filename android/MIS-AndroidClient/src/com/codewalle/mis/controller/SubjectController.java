package com.codewalle.mis.controller;

import android.net.Uri;
import com.android.volley.Request;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.mis.model.Article;
import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.util.ArrayList;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class SubjectController extends Controller {
    public static final int TYPE_PUBLIC = 0;
    public static final int TYPE_INVITED_ME = 1;
    public static final int TYPE_CREATED_BY_SELF = 2;
    public static final int TYPE_FOLLOWING = 3;
    public static final int TYPE_ARCHIEVED = 4;

    public SubjectController(CWApplication app) {
        super(app);
    }

    public void getSubjectList(final int type,final int start,final int limit, final SubjectCallback callback){
        Request req = requestBuilder.getSubjects(type, start, limit, new CWResponseListener() {
            @Override
            public void onResponseJSON(int code, String msg, final JSONObject data) {
                if(code == 0){
                    callback.onGetSubjects(type,start,limit,data);
                }else{
                    callback.onFail(code,msg,data);
                }
            }
        });

        requestQueue.add(req);
        requestQueue.start();
    }

    public void getArticleList(final long subjectId,final int start,final int limit,final ArticleCallback callback){
        Request req = requestBuilder.getArticles(subjectId, start, limit, new CWResponseListener() {
            @Override
            public void onResponseJSON(int code, String msg, final JSONObject data) {
                if (code == 0) {
                    callback.onGetArticles(subjectId, start, limit, data);
                } else {
                    callback.onFail(code, msg, data);
                }
            }
        });

        requestQueue.add(req);
        requestQueue.start();
    }

    public void createArticle(String subjectId, String title, String content, ArrayList<Integer> labels, ArrayList<Integer> resources, final CWResponseListener listener){
        Request req = requestBuilder.createArticle(subjectId, title, content, labels, resources, listener);
        requestQueue.add(req);
        requestQueue.start();
    }

    public void uploadResource(String filePath,CWResponseListener listener) throws FileNotFoundException {
        /*
POST /cgi/resource/upload
REQ
    file: {form-data} 文件内容
RES
    {
      "code": 0,
      "data": {
        "id": 2,
        "name": "测试服务器.md",
        "ext": "md",
        "mimetype": "application/octet-stream",
        "path": "2015/03/28/0115/d466991a60e0c299d8f966ac58d487ff.md",
        "size": 173,
        "createTime": "2015-03-27T17:15:49.000Z",
        "creator": 1
      }
    }
*/

        Request req = requestBuilder.uploadResource(filePath,listener);
        requestQueue.add(req);
        requestQueue.start();
    }

}
