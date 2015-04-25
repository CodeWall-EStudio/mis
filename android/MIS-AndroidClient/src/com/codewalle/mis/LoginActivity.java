package com.codewalle.mis;

import android.app.ProgressDialog;
import android.os.Bundle;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.mis.model.UserInfo;

/**
 * Created by xiangzhipan on 15/4/18.
 */
public class LoginActivity extends BaseActivity implements LoginCallback{
    private ProgressDialog mGlobalProgress;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // show loading & wait for auto login callback
//        checkIfLogined(this);
    }


    void checkIfLogined(LoginCallback cb){
        if(mGlobalProgress == null){
            mGlobalProgress = new ProgressDialog(this);
        }
        mGlobalProgress.show();
    }

    void doLogin(LoginCallback cb){

    }


    @Override
    public void onLoginSuccess(UserInfo user) {

    }

    @Override
    public void onLoginFail(UserInfo user) {

    }

    @Override
    public void onAutoLogined(UserInfo user) {
        mGlobalProgress.dismiss();
        if(user == null){
            // 自动登录失败，不做任何事
        }else{
            // 自动登录成功
            app.setUser(user);
        }
    }
}