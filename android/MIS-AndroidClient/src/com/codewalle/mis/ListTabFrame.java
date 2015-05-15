package com.codewalle.mis;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;
import com.codewalle.framework.ui.TabFrame;
import com.codewalle.mis.controller.SubjectCallback;
import com.codewalle.mis.model.Subject;
import com.handmark.pulltorefresh.library.PullToRefreshBase;
import com.handmark.pulltorefresh.library.PullToRefreshListView;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by xiangzhipan on 15/4/25.
 */
public class ListTabFrame extends TabFrame implements AdapterView.OnItemClickListener {
    private PullToRefreshListView mPullToRefreshListView;
    private ListView mListView;

    private int mIncreasement = 10;
    private MISListAdapter mAdapter;
    private boolean mIsPullingData = false;



    @Override
    public View onCreateView(LayoutInflater inflater) {

        mView = inflater.inflate(R.layout.pull_to_refresh_list,null);
        mPullToRefreshListView = (PullToRefreshListView)findViewById(R.id.listview);
        mPullToRefreshListView.setMode(PullToRefreshBase.Mode.BOTH);

        mPullToRefreshListView.setOnRefreshListener(new PullToRefreshBase.OnRefreshListener2<ListView>() {

            @Override
            public void onPullDownToRefresh(PullToRefreshBase<ListView> refreshView) {
                getData(0);
            }

            @Override
            public void onPullUpToRefresh(PullToRefreshBase<ListView> refreshView) {

                getData(mAdapter.getNextIndex());
            }

        });

        mListView = mPullToRefreshListView.getRefreshableView();
        mAdapter = new MISListAdapter();

        mListView.setAdapter(mAdapter);
        mListView.setOnItemClickListener(this);
        getData(0);
        Log.e("ListTabFrame","OnCreateView");
        return mView;
    }

    SubjectCallback subjectCallback = new SubjectCallback() {
        @Override
        public void onGetSubjects(int type, int start, int length, JSONObject subjects) {
            mIsPullingData = false;
            mPullToRefreshListView.onRefreshComplete();


            try {
                Log.e("ListTabFrame","got data:"+subjects.toString(2));
            } catch (JSONException e) {
                e.printStackTrace();
            }

            mAdapter.updateData(subjects, start);


            if(mAdapter.hasMore()){
                mPullToRefreshListView.setMode(PullToRefreshBase.Mode.BOTH);
            }else{
                mPullToRefreshListView.setMode(PullToRefreshBase.Mode.PULL_FROM_START);
            }
        }

        @Override
        public void onFail(int code, String msg, JSONObject data) {
            mIsPullingData = false;
            mPullToRefreshListView.onRefreshComplete();
            Log.e("ListTabFrame", "get data fail " + code+" "+msg+" " + type);

            if(mActivityRef.get() != null && !mActivityRef.get().isFinishing()) {
                Toast.makeText(mActivityRef.get(), "error..type="+type+"code="+code+" msg:" + msg, Toast.LENGTH_LONG).show();
            }
        }
    };

    private void getData(int startIndex) {
        mIsPullingData = true;
        app.getSubjectList(type, startIndex, mIncreasement, subjectCallback);
    }


    private void showEmptyOrShowError() {
        Activity activity = getActivity();
        if(activity == null || activity.isFinishing()){
            return;
        }
        Toast.makeText(getActivity(), "暂无数据，请稍后下拉刷新...", Toast.LENGTH_LONG).show();
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int pos, long id) {
        String data = adapterView.getAdapter().getItem(pos).toString();
        if(id == 1){
            if(mAdapter.hasMore()){
                if(mIsPullingData) return;
                getData(mAdapter.getNextIndex());
            }
        }else{
            Intent intent = new Intent(getActivity(),SubjectViewerActivity.class);
            intent.putExtra("data",data);
            startActivity(intent);
        }
    }
}
