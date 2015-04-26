package com.codewalle.mis;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.mis.controller.LoginCallback;
import com.codewalle.mis.model.UserInfo;

public class SplashActivity extends BaseActivity implements LoginCallback {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash);

    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // 检查是否可自动更新
                if(!app.doAutoLogin(SplashActivity.this)){
                    gotoLogin();
                }else{
                    showProgress();
                }
            }
        },1500);
    }

    private void gotoLogin() {
        startActivity(new Intent(this, LoginActivity.class));
        finish();
    }

    @Override
    public void onLoginSuccess(UserInfo user) {
        dismissProgressDialog();
        if(TextUtils.isEmpty(user.auth)){
            gotoLogin();
        }else{
            gotoMain();
        }
    }

    @Override
    public void onLoginFail(UserInfo user) {
        dismissProgressDialog();
    }

    @Override
    public void onAutoLogined(UserInfo user) {
        dismissProgressDialog();
        if(TextUtils.isEmpty(user.auth)){
            gotoLogin();
        }else{
            gotoMain();
        }
    }

    private void gotoMain() {
        startActivity(new Intent(this,MainActivity.class));
        finish();
    }

}
