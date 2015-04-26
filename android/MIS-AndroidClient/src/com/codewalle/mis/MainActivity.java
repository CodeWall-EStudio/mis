package com.codewalle.mis;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TabHost;
import android.widget.TextView;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.framework.ui.TabFrame;
import com.codewalle.mis.controller.SubjectCallback;
import com.codewalle.mis.controller.SubjectController;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by xiangzhipan on 15/4/24.
 */
public class MainActivity extends BaseFragmentActivity implements SubjectCallback, TabHost.OnTabChangeListener, TabHost.TabContentFactory {

    private TabHost mTabHost;
    private Map<String,TabFrame> mTabFrames = new HashMap<String,TabFrame>();
    private boolean mTabInited = false;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if(android.os.Build.VERSION.SDK_INT >= 11){
            getWindow().setFlags(0x01000000, 0x01000000);//开启硬件加速
        }

        setContentView(R.layout.main);
        mTabHost = (TabHost) findViewById(android.R.id.tabhost);

        setBackConfirm(true);
        initTabs();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if(hasFocus){
        }
    }

    private void initTabs() {

        if(!mTabInited){
            mTabInited = true;
        }else{
            return;
        }
        mTabHost.setup();
        mTabHost.setOnTabChangedListener(this);

        //mTabHost.addTab(getTabSpec(CollectionFrame.class,R.string.collection_tab_name));
        //mTabHost.addTab(getTabSpec(TimelineFrame.class,R.string.timeline_tab_name));
        mTabHost.addTab(getTabSpec(ListTabFrame.class,"公开主题", SubjectController.TYPE_PUBLIC));
        mTabHost.addTab(getTabSpec(ListTabFrame.class,"邀请我的", SubjectController.TYPE_INVITED_ME));
        mTabHost.addTab(getTabSpec(ListTabFrame.class,"我创建的", SubjectController.TYPE_CREATED_BY_SELF));
        mTabHost.addTab(getTabSpec(ListTabFrame.class,"我关注的", SubjectController.TYPE_FOLLOWING));
        mTabHost.addTab(getTabSpec(ListTabFrame.class, "归档主题", SubjectController.TYPE_ARCHIEVED));
    }
    private TabHost.TabSpec getTabSpec(Class<? extends TabFrame> tabFrameClass,String indicator,int type) {
        TabHost.TabSpec tabSpec = mTabHost.newTabSpec(tabFrameClass.getName()+":"+type);
        tabSpec.setIndicator(indicator);
        tabSpec.setContent(this);
        tabSpec.setIndicator(getIndicatorView(indicator));
        return tabSpec;
    }

    private View getIndicatorView(String indicator) {
        LayoutInflater inflater = getLayoutInflater();
        View v = inflater.inflate(R.layout.nav_tab_item,null,false);
        TextView tv = (TextView) v.findViewById(R.id.textView);
        tv.setText(indicator);
        return v;
    }


    private TabFrame getCurrentTab(){
        String tag = mTabHost.getCurrentTabTag();
        return mTabFrames.get(tag);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode,resultCode,data);
        getCurrentTab().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onGetSubjects(int type, int start, int length, JSONObject subjects) {
        try {
            Log.e("MIS",subjects.toString(4));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onFail(int code, String msg, JSONObject data) {
        Log.e("MIS","fail:"+msg);
    }

    @Override
    public void onTabChanged(String s) {

    }

    @Override
    public View createTabContent(String classTag) {
        TabFrame tf = null;
        try {
            String[] classAndType = classTag.split(":");
            String cls = classAndType[0];
            String type = classAndType[1];
            int typeInt = Integer.valueOf(type);

            tf = (TabFrame)Class.forName(cls).newInstance();
            tf.setActivity(this,mHandler);
            tf.setType(typeInt);
            mTabFrames.put(classTag, tf);
            return tf.onCreateView(getLayoutInflater());

        } catch (Exception e){
            // do nothing
        }

        return null;
    }
}
