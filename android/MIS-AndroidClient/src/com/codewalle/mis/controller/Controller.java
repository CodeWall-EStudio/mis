package com.codewalle.mis.controller;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class Controller {
    protected RequestBuilder requestBuilder;
    public Controller(){
        requestBuilder = RequestBuilder.getRequestBuilder();
    }
}
