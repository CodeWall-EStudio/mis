package com.codewalle.framework.ui;

import android.app.AlertDialog;
import android.content.DialogInterface;
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
import com.swall.tra.model.AccountInfo;
import com.swall.tra.network.ServiceManager;
import com.swall.tra.R;
import com.umeng.analytics.MobclickAgent;
import com.umeng.update.*;

/**
 * Created by pxz on 13-12-28.
 */
public class BaseFragmentActivity extends SherlockFragmentActivity implements UmengUpdateListener {
    private static final int MESSAGE_CONFIRM_QUIT = 1;
    public TRAApplication app;
    protected String TAG;
    private View mTitleView;
    protected Bundle defaultRequestData;
    private boolean mShowQuitButton;
    protected MenuItem mMenuItemSettings;
    private AlertDialog mQuitProgramConfirmDialog;
    private boolean mBackConfirm;
    private long mLastBackTime;
    private static final long DOUBLE_BACK_QUIT_INTERVAL = 2500;
    private Handler mHandler = new Handler(){
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


    protected AccountInfo getCurrentAccount(){
        return app.getCachedAccount();
    }
    public String getCurrentAcccountName(){
        return getCurrentAccount().userName;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.clear();
        if(mShowQuitButton){
            mMenuItemSettings = menu.add("设置")
                     //.setIcon(R.drawable.logout_icon);
                    .setIcon(R.drawable.setting_icon);
            mMenuItemSettings.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
        }
//        menu.add("设置").setIcon(R.drawable.setting_icon);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onMenuItemSelected(int featureId, MenuItem item) {
        if(item == mMenuItemSettings){
//            confirnQuitProgram();
//            startActivity(new Intent(this,QuitActivity.class));
            startActivity(new Intent(this,SettingActivity.class));
        }
        return super.onMenuItemSelected(featureId, item);
    }

    private void confirnQuitProgram() {
        if(mQuitProgramConfirmDialog == null){
            mQuitProgramConfirmDialog = new AlertDialog.Builder(this)
                    .setTitle("是否注销本帐号?")
                    .setCancelable(false)
                    .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            mQuitProgramConfirmDialog.dismiss();
                        }
                    })
                    .setPositiveButton("退出", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            mQuitProgramConfirmDialog.dismiss();
//                            app.updateCurrentAccount(null);
                            finish();
                        }
                    })
                    .create();
        }
        mQuitProgramConfirmDialog.show();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = TRAApplication.getApp();
        TAG = getClass().getName();
        //Log.i("SWall",TAG+":onCreate");
        defaultRequestData = new Bundle();
        defaultRequestData.putString(ServiceManager.Constants.KEY_USER_NAME,getCurrentAccount().userName);


        ActionBar actionBar = getSupportActionBar();
        if(actionBar != null){
            actionBar.setCustomView(R.layout.title_bar);
            actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
//            if(ServiceManager.Constants.getCurEnv() == ServiceManager.Constants.ENV_PUBLISH) {
//                actionBar.setIcon(R.drawable.icon_qiyi);
//            }else{
//                actionBar.setIcon(R.drawable.icon_hong);
//            }
            actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM | ActionBar.DISPLAY_USE_LOGO);
            actionBar.setDisplayShowCustomEnabled(true);
            actionBar.setBackgroundDrawable(getResources().getDrawable((R.color.bg)));
        }



        UmengUpdateAgent.setUpdateAutoPopup(false);
        UmengUpdateAgent.setDialogListener(new UmengDialogButtonListener() {

            @Override
            public void onClick(int status) {
                switch (status) {
                    case UpdateStatus.Update:

                        break;
                    case UpdateStatus.Ignore:

                        break;
                    case UpdateStatus.NotNow:

                        break;
                }
            }
        });
//        if(isIgnoredOnce) {
//            UmengUpdateAgent.update(this);
//        }
        UmengUpdateAgent.setUpdateListener(this);
        UmengUpdateAgent.update(app.getApplicationContext());

        showQuitButton();

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

    public void showQuitButton(){
        mShowQuitButton = true;
    }
    public void hideQuitButton(){
        mShowQuitButton = false;
        invalidateOptionsMenu();
    }

    @Override
    protected void onResume() {
        //Log.i("SWall",TAG+":onResume");
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        //Log.i("SWall",TAG+":onPause");
        super.onPause();
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onDestroy() {
        Log.i("SWall", TAG + ":onDestroy");
        super.onDestroy();
    }

    @Override
    public void onUpdateReturned(int updateStatus, UpdateResponse updateInfo) {
        switch (updateStatus) {
            case UpdateStatus.Yes: // has update
                UmengUpdateAgent.showUpdateDialog(app.getApplicationContext(), updateInfo);
                break;
            case UpdateStatus.No: // has no update
//                Toast.makeText(app.getApplicationContext(), "没有更新", Toast.LENGTH_SHORT).show();
                break;
            case UpdateStatus.NoneWifi: // none wifi
                //Toast.makeText(app.getApplicationContext(), "没有wifi连接， 只在wifi下更新", Toast.LENGTH_SHORT).show();
                break;
            case UpdateStatus.Timeout: // time out
                Toast.makeText(app.getApplicationContext(), "查询更新超时", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
