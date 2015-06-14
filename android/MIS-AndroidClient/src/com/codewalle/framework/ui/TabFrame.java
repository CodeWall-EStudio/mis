package com.codewalle.framework.ui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.codewalle.framework.CWApplication;

import java.lang.ref.WeakReference;

/**
 * Author: iptton
 * Date: 13-12-8
 * Time: 上午2:02
 */
public abstract class TabFrame {

    protected String TAG;
    protected Bundle defaultRequestData;

    protected WeakReference<BaseFragmentActivity> mActivityRef;
    protected CWApplication app;
    protected View mView;
    protected int type;
    protected WeakReference<Handler> mHandlerRef;

    protected BaseFragmentActivity getActivity(){
        return mActivityRef.get();
    }


    public void setActivity(BaseFragmentActivity activity,Handler handler){
        mActivityRef = new WeakReference<BaseFragmentActivity>(activity);
        mHandlerRef = new WeakReference<Handler>(handler);
        app = activity.app;

        TAG = getClass().getName();

    }
    public void startActivityForResult(Intent i,int reqCode){
        getActivity().startActivityForResult(i,reqCode);
    }

    public void startActivity(Intent i){
        Activity activity = mActivityRef.get();
        if(activity != null){
            activity.startActivity(i);
        }
    }

    public boolean onActivityResult(int requestCode, int resultCode, Intent data){
        return false;
    }
    public View findViewById(int resouceId){
        return mView.findViewById(resouceId);
    }

    public void onDestroy(){
        if(mActivityRef != null){
            mActivityRef.clear();
        }

    }
    public abstract View onCreateView(LayoutInflater inflater, ViewGroup parent);

    public void setType(int type) {
        this.type = type;
    }
}
