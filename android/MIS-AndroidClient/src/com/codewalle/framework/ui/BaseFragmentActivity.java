package com.codewalle.framework.ui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.KeyEvent;
import android.widget.TextView;
import android.widget.Toast;
import com.actionbarsherlock.app.ActionBar;
import com.actionbarsherlock.app.SherlockFragmentActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuItem;
import com.codewalle.framework.CWApplication;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.mis.R;
import com.codewalle.mis.SplashActivity;
import com.codewalle.mis.UploadActivity;
import org.json.JSONObject;

import java.io.FileNotFoundException;

/**
 * Created by pxz on 13-12-28.
 */
public class BaseFragmentActivity extends SherlockFragmentActivity {
    private static final int MESSAGE_CONFIRM_QUIT = 1;

    public static final int MENU_DONE = 1;
    public static final int NEMU_ADD = 2;


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
    private boolean mIsShowRightMenu = true;
    protected MenuItem mRightMenu;


    public void setRightMenu(boolean show){
        mIsShowRightMenu = show;
        invalidateOptionsMenu();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.clear();
        if(mIsShowRightMenu) {

            mRightMenu = menu.add(1,NEMU_ADD,Menu.NONE,"添加")
                    .setIcon(R.drawable.add);
            if(mRightMenuText != null){
                mRightMenu.setTitle(mRightMenuText);
                mRightMenu.setIcon(null);
            }
            mRightMenu.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);

            MenuItem doneMenu = menu.add(1,MENU_DONE,Menu.NONE,"完成");
            doneMenu.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
            TextView tv = new TextView(this);
            tv.setText("完成");

            doneMenu.setActionView(tv);


        }

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onMenuItemSelected(int featureId, MenuItem item) {
        if(item == mRightMenu && onRightButtonClick()){
            onRightButtonClick();
            return false;
        }
        return super.onMenuItemSelected(featureId, item);
    }

    protected boolean onRightButtonClick() {
        return false;
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


    String mRightMenuText = null;
    public void setRightMenuText(String txt){
        mRightMenuText = txt;
        invalidateOptionsMenu();
    }

    public void setBackConfirm(boolean backConfirm){
        mBackConfirm = backConfirm;
    }


    protected void doUpload(int type){
        Intent i = new Intent(this, UploadActivity.class);
        i.putExtra("type",type);
        startActivityForResult(i, type);
    }

    @Override
    protected void onActivityResult(final int requestCode, int resultCode, Intent data) {
        if(resultCode == Activity.RESULT_OK) {
            final String filePath = data.getStringExtra(UploadActivity.KEY_FILE_PATH);
            switch (requestCode) {
                case UploadActivity.UPLOAD_TYPE_IMAGE:
                case UploadActivity.UPLOAD_TYPE_IMAGE_CAPTURE:
                case UploadActivity.UPLOAD_TYPE_VIDEO_CAPTURE:
                case UploadActivity.UPLOAD_FILE:
                    try {
                        app.uploadResource(filePath, new CWResponseListener() {
                            @Override
                            public void onResponseJSON(int code, String msg, JSONObject data) {
                                if (code == 0) {
                                    onFileUploaded(requestCode,true, filePath, data, "");
                                } else {
                                    onFileUploaded(requestCode,false, filePath, data, msg);
                                }
                            }
                        });
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                        onFileUploaded(requestCode,false,filePath,null,"file not found");
                    }
                    break;
                default:
                    super.onActivityResult(requestCode,resultCode,data);
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }


    protected void onFileUploaded(int type,boolean success,String filePath,JSONObject resultData,String errorMsg){
        // do nothing
    }
}
