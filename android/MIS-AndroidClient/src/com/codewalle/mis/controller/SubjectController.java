package com.codewalle.mis.controller;

import com.android.volley.Request;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWResponseListener;
import org.json.JSONObject;

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
                if(code == 0){
                    callback.onGetArticles(subjectId,start,limit,data);
                }else{
                    callback.onFail(code,msg,data);
                }
            }
        });

        requestQueue.add(req);
        requestQueue.start();
    }

}
