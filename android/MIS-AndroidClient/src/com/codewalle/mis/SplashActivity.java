package com.codewalle.mis;

import android.app.ActionBar;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.TextView;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.mis.model.UserInfo;

public class SplashActivity extends BaseActivity implements LoginCallback {
    private ActionBar mActionBar;
    private TextView mUnreadConvCount;

    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // 检查是否可自动更新
        if(!app.doAutoLogin(this)){
            gotoLogin();
        }else{
            showProgress();
        }
    }



    private void gotoLogin() {
        startActivity(new Intent(this, LoginActivity.class));
        finish();
    }

    @Override
    public void onLoginSuccess(UserInfo user) {
        dismissProgressDialog();
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
    }
}
