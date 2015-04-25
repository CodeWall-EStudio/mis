package com.codewalle.framework.network;

import com.android.volley.Network;
import com.android.volley.NetworkResponse;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public abstract class CWResponseListener implements CWNetWorkCallback{
    protected Response.Listener<String> responseListener = new Response.Listener<String>() {
        @Override
        public void onResponse(String response) {
            String msg = "";
            int code = 1;
            JSONObject data = new JSONObject();
            try {
                JSONObject object = new JSONObject(response);
                code = object.optInt("code", 1);
                msg = object.optString("msg", "");
                data = object.optJSONObject("data");
            } catch (JSONException e) {
                e.printStackTrace();
                msg = "JSON格式错误:\n"+response;
            }
            onResponseJSON(code, msg, data);
        }
    };
    protected Response.ErrorListener errorListener = new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {
            int code = 1;
            String msg = error.getMessage();
            JSONObject data = null;
            NetworkResponse response = error.networkResponse;
            if(response != null){
                // TODO NetWorkResponse 要经过parse才行
                code = response.statusCode;
                msg = new String(response.data);
            }
            onResponseJSON(code,msg,data);
        }
    };

    public Response.Listener<String> getResponseListener(){
        return responseListener;
    }
    public Response.ErrorListener getErrorListener(){
        return errorListener;
    }
}
