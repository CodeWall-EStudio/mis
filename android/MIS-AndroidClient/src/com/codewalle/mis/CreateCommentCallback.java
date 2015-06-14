package com.codewalle.mis;

import com.codewalle.mis.model.Article;
import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/6/7.
 */
public interface CreateCommentCallback {

    void onCreateFail(Article article,String msg,JSONObject data);

    void onCommentCreated(Article article, JSONObject data);
}
