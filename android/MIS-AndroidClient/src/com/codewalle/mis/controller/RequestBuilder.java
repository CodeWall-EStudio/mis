package com.codewalle.mis.controller;

import com.codewalle.framework.network.CWRequestBuilder;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class RequestBuilder extends CWRequestBuilder{



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
        return "http://mis.codewalle.com/";
    }

    @Override
    public String getLoginPath() {
        return "cgi/account/login";
    }
}
