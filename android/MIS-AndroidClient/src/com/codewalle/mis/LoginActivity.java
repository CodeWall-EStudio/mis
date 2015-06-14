package com.codewalle.mis;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import com.actionbarsherlock.app.ActionBar;
import com.codewalle.framework.Utils;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.framework.ui.InputMethodRelativeLayout;
import com.codewalle.mis.controller.LoginCallback;
import com.codewalle.mis.model.UserInfo;

/**
 * Created by xiangzhipan on 15/4/18.
 */
public class LoginActivity extends BaseActivity implements LoginCallback, View.OnClickListener, InputMethodRelativeLayout.onSizeChangedListenner {
    private EditText mEtUserName;
    private EditText mEtPassword;
    private View mLoginButton;

    private View mIcon;
    private RelativeLayout.LayoutParams mIconParams;
    private int mTopMargin;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        mEtUserName = (EditText) findViewById(R.id.username);
        mEtPassword = (EditText) findViewById(R.id.password);
        mLoginButton = findViewById(R.id.login_button);
        mIcon = findViewById(R.id.login_school_name);
        mIconParams = (RelativeLayout.LayoutParams)mIcon.getLayoutParams();
        mTopMargin = mIconParams.topMargin;

        mLoginButton.setOnClickListener(this);

        ((InputMethodRelativeLayout) findViewById(R.id.root)).setOnSizeChangedListenner(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.login_button) {
            String userName = mEtUserName.getText().toString();
            String password = mEtPassword.getText().toString();
            if (!TextUtils.isEmpty(userName) &&
                    !TextUtils.isEmpty(password)) {
                Utils.hideKeyBoard(this);
                app.doLogin(userName, password, this);
                showProgress();
                mLoginButton.setEnabled(false);
            } else {
                // TODO
            }
        }
    }


    @Override
    public void onLoginSuccess(UserInfo user) {
        dismissProgressDialog();
        startActivity(new Intent(this, MainActivity.class));
        finish();
    }

    @Override
    public void onLoginFail(UserInfo user) {
        dismissProgressDialog();
        mLoginButton.setEnabled(true);
    }

    public void onCancelLogin() {
        dismissProgressDialog();
        mLoginButton.setEnabled(true);
    }

    @Override
    public void onAutoLogined(UserInfo user) {
        // do nothing
    }

    @Override
    public void onCancel(DialogInterface dialog) {
        onCancelLogin();
    }


    @Override
    public void onSizeChange(boolean isOpen, int preH, int curH) {
        if (isOpen) {
            mIconParams.topMargin = 5;
//            findViewById(R.id.login_school_name).setVisibility(View.GONE);
        } else {
            mIconParams.topMargin = mTopMargin;
//            findViewById(R.id.login_school_name).setVisibility(View.VISIBLE);
        }
        mIcon.setLayoutParams(mIconParams);
    }
}