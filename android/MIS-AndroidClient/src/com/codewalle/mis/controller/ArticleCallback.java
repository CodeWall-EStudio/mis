package com.codewalle.mis.controller;

import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/26.
 */
public interface ArticleCallback {
    void onGetArticles(long subjectId,int start,int length,JSONObject articles);
    void onFail(int code, String msg, JSONObject data);
}
