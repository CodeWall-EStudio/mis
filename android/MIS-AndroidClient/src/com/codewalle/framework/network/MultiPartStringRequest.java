package com.codewalle.framework.network;

import com.android.volley.*;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.StringRequest;
import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;

import java.io.*;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class MultiPartStringRequest extends Request<String> {

    private HttpEntity mEntity;

    private final Response.Listener<String> mListener;

    public MultiPartStringRequest(String url,
                                  String filePath,
                                  Response.Listener<String> listener,
                                  Response.ErrorListener errorListener,
                                  String... args) throws FileNotFoundException {

        super(Request.Method.POST, url, errorListener);

        File file = new File(filePath);
        if(!file.exists() && !file.isFile()){
            throw new FileNotFoundException("file not exists: "+filePath);
        }

        mListener = listener;

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setBoundary("----WebKitFormBoundaryOZP8ZyAfN79iuKUB--");
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
//        builder.addBinaryBody("file",file);
        builder.addBinaryBody("file",file,ContentType.create("image/jpeg"),"xxx.jpg");



        for(int i = 0;i<args.length/2;++i){
            builder.addTextBody(args[i*2],args[i*2+1]);
        }

        mEntity = builder.build();

    }


    @Override
    public String getBodyContentType()
    {
        return mEntity.getContentType().getValue();
    }

    @Override
    public byte[] getBody() throws AuthFailureError
    {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try
        {
            mEntity.writeTo(bos);
        }
        catch (IOException e)
        {
            VolleyLog.e("IOException writing to ByteArrayOutputStream");
        }
        return bos.toByteArray();
    }

    @Override
    protected Response<String> parseNetworkResponse(NetworkResponse response)
    {
        try {
            String string =
                    new String(response.data, HttpHeaderParser.parseCharset(response.headers));
            return Response.success(string,
                    HttpHeaderParser.parseCacheHeaders(response));
        } catch (UnsupportedEncodingException e) {
            return Response.error(new ParseError(e));
        }
    }

    @Override
    protected void deliverResponse(String response)
    {
        mListener.onResponse(response);
    }


}
