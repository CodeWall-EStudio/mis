package com.codewalle.framework.ui;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.widget.TextView;
import com.actionbarsherlock.app.ActionBar;
import com.actionbarsherlock.app.SherlockActivity;
import com.codewalle.framework.CWApplication;
import com.codewalle.mis.R;

/**
 * Created by xiangzhipan on 15/4/21.
 */
public class BaseActivity extends SherlockActivity implements DialogInterface.OnCancelListener {

    protected String TAG = getClass().getCanonicalName();
    protected CWApplication app;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        app = CWApplication.getApp();

        ActionBar actionBar = getSupportActionBar();
        if(actionBar != null){
            actionBar.setCustomView(R.layout.title_bar);
            actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
            actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM | ActionBar.DISPLAY_USE_LOGO);
            actionBar.setDisplayShowCustomEnabled(true);
//            actionBar.setBackgroundDrawable(getResources().getDrawable((R.color.primary_color)));
        }
    }


    public void setTitle(CharSequence title){
        ((TextView)findViewById(R.id.tv_title)).setText(title);
    }

    protected ProgressDialog mDialog;
    protected String progressMessage = "登录中,请稍候...";
    protected void showProgress() {
        if(isFinishing())return;
        mDialog  = new ProgressDialog(this);
        mDialog.setMessage(progressMessage);
        mDialog.setOnCancelListener(this);
        mDialog.show();
    }

    protected void dismissProgressDialog() {
        if(mDialog != null && mDialog.isShowing()) {
            mDialog.dismiss();
        }
    }

    @Override
    public void onCancel(DialogInterface dialog) {

    }
}
