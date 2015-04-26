package com.codewalle.mis.controller;

import com.android.volley.RequestQueue;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWVolley;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class Controller {
    protected final CWApplication mApp;
    protected RequestBuilder requestBuilder;
    protected RequestQueue requestQueue = CWVolley.getRequestQueue();
    public Controller(CWApplication app){
        mApp = app;
        requestBuilder = RequestBuilder.getRequestBuilder();
    }
}
