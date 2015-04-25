package com.codewalle.mis.controller;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.codewalle.mis.LoginCallback;
import com.codewalle.framework.CWApplication;
import com.codewalle.mis.model.UserInfo;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * Created by xiangzhipan on 15/4/21.
 */
public class UserController extends Controller{
    private static final String SAVE_LOGIN = "SVAE_LOGIN";
    private final CWApplication mApp;
    private UserInfo mUser = null;

    public UserController(CWApplication application) {
        super();
        mApp = application;
    }

    public void setUser(UserInfo user){
        mUser = new UserInfo(user);
        SharedPreferences save = mApp.getSharedPreferences(SAVE_LOGIN, Context.MODE_PRIVATE);
        SharedPreferences.Editor ed = save.edit();
        ed.putString("uid",mUser.uid);
        ed.putString("name",mUser.name);
        ed.putString("auth",mUser.auth);
        ed.commit();
    }

    public UserInfo getUser() {
        if(mUser == null){
            // 检查sharedReference

            SharedPreferences save = mApp.getSharedPreferences(SAVE_LOGIN, Context.MODE_PRIVATE);
            String uid = save.getString("uid","");
            String name = save.getString("name","");
            String auth = save.getString("auth","");
            if(!TextUtils.isEmpty(uid) &&
                    !TextUtils.isEmpty(name) &&
                    !TextUtils.isEmpty(auth)){

                setUser(new UserInfo(uid,name,auth));

            }
        }

        return new UserInfo(mUser);
    }

    public void doLogin(final String uid,final String auth,final LoginCallback cb){
        Request<String> loginRequest = requestBuilder.getLoginRequest(new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                String errMsg = "";

                try {
                    JSONObject object = new JSONObject(response);
                    int code = object.optInt("code",1);


                } catch (JSONException e) {
                    errMsg = "返回格式不正确:\n"+response;
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        },"uid",uid,"pwd",auth);
    }
    public void doLogout(){
    }

    public boolean doAutoLogin(LoginCallback cb){
        if(isValidUserInfo(mUser)){
            cb.onAutoLogined(mUser);
        }else{
            return false;
        }
        return true;
    }

    public static boolean isValidUserInfo(UserInfo userInfo){
        // TODO
        return (userInfo != null) && (!TextUtils.isEmpty(userInfo.auth));
    }
}
