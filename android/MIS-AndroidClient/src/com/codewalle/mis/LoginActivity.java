package com.codewalle.mis;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.mis.controller.LoginCallback;
import com.codewalle.mis.model.UserInfo;

/**
 * Created by xiangzhipan on 15/4/18.
 */
public class LoginActivity extends BaseActivity implements LoginCallback, View.OnClickListener {
    private EditText mEtUserName;
    private EditText mEtPassword;
    private View mLoginButton;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        mEtUserName = (EditText)findViewById(R.id.username);
        mEtPassword = (EditText)findViewById(R.id.password);
        mLoginButton = findViewById(R.id.login_button);
        mLoginButton.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        if(view.getId() == R.id.login_button){
            String userName = mEtUserName.getText().toString();
            String password = mEtPassword.getText().toString();
            if(!TextUtils.isEmpty(userName) &&
                    !TextUtils.isEmpty(password)) {
                app.doLogin(userName,password,this);
                showProgress();
                mLoginButton.setEnabled(false);
            }else{
                // TODO
            }
        }
    }



    @Override
    public void onLoginSuccess(UserInfo user) {
        dismissProgressDialog();
        startActivity(new Intent(this,MainActivity.class));
        finish();
    }

    @Override
    public void onLoginFail(UserInfo user) {
        mLoginButton.setEnabled(true);
    }

    @Override
    public void onAutoLogined(UserInfo user) {
        // do nothing
    }
}