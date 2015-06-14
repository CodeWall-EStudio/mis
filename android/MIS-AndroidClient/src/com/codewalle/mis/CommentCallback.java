package com.codewalle.mis;

import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/6/7.
 */
public interface CommentCallback {
    void onGetComment(long articleId,int begin,int num,JSONObject data);
    void onFail(long articleId, String message, JSONObject data);
}
