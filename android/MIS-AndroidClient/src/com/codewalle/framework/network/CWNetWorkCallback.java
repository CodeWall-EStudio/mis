package com.codewalle.framework.network;

import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public interface CWNetWorkCallback {
    void onResponseJSON(int code,String msg,JSONObject data);
}
