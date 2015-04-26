package com.codewalle.mis.controller;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import com.android.volley.Request;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.framework.CWApplication;
import com.codewalle.mis.model.UserInfo;
import org.json.JSONObject;

/**
 *
 * Created by xiangzhipan on 15/4/21.
 */
public class UserController extends Controller{


    private static final int CODE_SUCCESS = 0;
    private static final String SAVE_LOGIN = "SVAE_LOGIN";
    private UserInfo mUser = null;

    private CWResponseListener mResponseListener = new CWResponseListener() {
        @Override
        public void onResponseJSON(int code, String msg, JSONObject data) {
            if(code == CODE_SUCCESS){

            }else{

            }
        }
    };

    public UserController(CWApplication application) {
        super(application);
    }

    public void setUser(UserInfo user){
        mUser = new UserInfo(user);
        SharedPreferences save = mApp.getSharedPreferences(SAVE_LOGIN, Context.MODE_PRIVATE);
        SharedPreferences.Editor ed = save.edit();
        ed.putString("id",mUser.id);
        ed.putString("uid",mUser.uid);
        ed.putString("name",mUser.name);
        ed.putString("auth",mUser.auth);
        ed.commit();
    }

    public UserInfo getUser() {
        if(mUser == null){
            // 检查sharedReference

            SharedPreferences save = mApp.getSharedPreferences(SAVE_LOGIN, Context.MODE_PRIVATE);
            String id = save.getString("id","");
            String uid = save.getString("uid","");
            String name = save.getString("name","");
            String auth = save.getString("auth","");
            if(!TextUtils.isEmpty(uid) &&
                    !TextUtils.isEmpty(name) &&
                    !TextUtils.isEmpty(auth)){

                setUser(new UserInfo(id,uid,name,auth));

            }
        }

        return new UserInfo(mUser);
    }

    public void doLogin(final String uid,final String auth,final LoginCallback cb){
        Request<String> loginRequest = requestBuilder.getLoginRequest(new CWResponseListener() {
            @Override
            public void onResponseJSON(int code, String msg, JSONObject data) {
                if (code == CODE_SUCCESS) {
                    UserInfo userInfo = new UserInfo(data.optString("id",""),uid, data.optString("name", "unnamed"), auth);
                    mApp.setUser(userInfo);
                    cb.onLoginSuccess(userInfo);
                } else {
                    cb.onLoginFail(null);
                }
            }
        }, "uid", uid, "pwd", auth);
        requestQueue.add(loginRequest);
        requestQueue.start();
    }
    public void doLogout(){
    }

    public boolean doAutoLogin(LoginCallback cb){
        if(isValidUserInfo(mUser)){
            // 要换新的sid，所以还是重新登录一下吧
            doLogin(mUser.uid,mUser.auth,cb);
//            cb.onAutoLogined(mUser);
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
