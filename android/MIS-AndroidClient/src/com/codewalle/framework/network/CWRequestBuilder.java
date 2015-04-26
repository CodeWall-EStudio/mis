package com.codewalle.framework.network;

import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public abstract class CWRequestBuilder {
    public abstract String getBaseUrl();
    public abstract String getLoginPath();

    public Request getLoginRequest(CWResponseListener listener,String... args){
        return getSimpleStringRequest(getBaseUrl() + getLoginPath(),Request.Method.POST,listener.getResponseListener(),listener.getErrorListener(), args);
    }


    protected StringRequest getSimpleStringRequest(String url,int method,Response.Listener listener,Response.ErrorListener errorListener, String... args) {

        Map<String,String> params = new HashMap<String,String>(args.length/2);
        for(int i = 0;i<args.length/2;++i){
            params.put(args[i*2],args[i*2+1]);
        }
        StringRequest req = new StringRequestWithParams(method,url,params,listener,errorListener);
        return req;
    }
}
