package com.codewalle.mis.controller;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public interface SubjectCallback {
    void onGetSubjects(int type,int start,int length,JSONObject subjects);

    void onFail(int code, String msg, JSONObject data);
}
