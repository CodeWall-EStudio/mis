package com.codewalle.framework.ui;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.Bundle;
import com.actionbarsherlock.app.SherlockActivity;
import com.codewalle.framework.CWApplication;

/**
 * Created by xiangzhipan on 15/4/21.
 */
public class BaseActivity extends SherlockActivity {

    protected String TAG = getClass().getCanonicalName();
    protected CWApplication app;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        app = CWApplication.getApp();
    }


    protected ProgressDialog mDialog;
    protected String progressMessage = "";
    protected void showProgress() {
        if(isFinishing())return;
        mDialog  = new ProgressDialog(this);
        mDialog.setMessage(progressMessage);
        mDialog.show();
    }

    protected void dismissProgressDialog() {
        if(mDialog != null && mDialog.isShowing()) {
            mDialog.dismiss();
        }
    }

}
