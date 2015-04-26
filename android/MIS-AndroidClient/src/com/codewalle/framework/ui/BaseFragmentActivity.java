package com.codewalle.framework.ui;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;
import com.actionbarsherlock.app.ActionBar;
import com.actionbarsherlock.app.SherlockFragmentActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuItem;
import com.codewalle.framework.CWApplication;
import com.codewalle.mis.R;

/**
 * Created by pxz on 13-12-28.
 */
public class BaseFragmentActivity extends SherlockFragmentActivity {
    private static final int MESSAGE_CONFIRM_QUIT = 1;
    public CWApplication app;
    protected String TAG;
    private boolean mBackConfirm;
    private long mLastBackTime;
    private static final long DOUBLE_BACK_QUIT_INTERVAL = 2500;
    protected Handler mHandler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what){
                case MESSAGE_CONFIRM_QUIT:
                    if(mLastBackTime == 0){
                        mLastBackTime = System.currentTimeMillis();
                        Toast.makeText(BaseFragmentActivity.this, "再按一次返回键退出", Toast.LENGTH_SHORT).show();
                    }else{
                        if(System.currentTimeMillis() - mLastBackTime <= DOUBLE_BACK_QUIT_INTERVAL){
                            finish();
                        }else{
                            mLastBackTime = System.currentTimeMillis();
                            Toast.makeText(BaseFragmentActivity.this,"再按一次返回键退出",Toast.LENGTH_SHORT).show();
                        }
                    }
                    break;
            }
        }
    };
    private boolean mIsShowAddMenu = true;


    public void setPostMenu(boolean show){
        mIsShowAddMenu = show;
        invalidateOptionsMenu();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.clear();
        if(mIsShowAddMenu) {
            MenuItem mMenuItemSettings = menu.add("POST")
                    //.setIcon(R.drawable.logout_icon);
                    .setIcon(R.drawable.add);
            mMenuItemSettings.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
        }

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = CWApplication.getApp();
        TAG = getClass().getName();



        ActionBar actionBar = getSupportActionBar();
        if(actionBar != null){
            actionBar.setCustomView(R.layout.title_bar);
            actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
            actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM | ActionBar.DISPLAY_USE_LOGO);
            actionBar.setDisplayShowCustomEnabled(true);
            actionBar.setBackgroundDrawable(getResources().getDrawable((R.color.title_bg)));
        }

        setBackConfirm(false);

    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if(mBackConfirm && keyCode == KeyEvent.KEYCODE_BACK){
            mHandler.sendEmptyMessage(MESSAGE_CONFIRM_QUIT);
            return true;
        }

        return super.onKeyDown(keyCode, event);    //To change body of overridden methods use File | Settings | File Templates.
    }



    public void setBackConfirm(boolean backConfirm){
        mBackConfirm = backConfirm;
    }
}
