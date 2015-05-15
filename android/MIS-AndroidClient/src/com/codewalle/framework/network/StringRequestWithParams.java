package com.codewalle.framework.network;

import com.android.volley.AuthFailureError;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.Map;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class StringRequestWithParams extends StringRequest {
    private final Map<String, String> mParam;

    public StringRequestWithParams(int method, String url, Map<String, String> params, Response.Listener<String> successListener, Response.ErrorListener failListener) {
        super(method,url,  successListener,failListener);
        mParam = params;
    }

    @Override
    protected Map<String, String> getParams() throws AuthFailureError {
        return mParam;
    }
}
