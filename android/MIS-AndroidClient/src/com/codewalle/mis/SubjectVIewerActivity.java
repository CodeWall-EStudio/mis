package com.codewalle.mis;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import com.actionbarsherlock.view.MenuItem;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.controller.ArticleCallback;
import com.codewalle.mis.model.Subject;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class SubjectViewerActivity extends BaseFragmentActivity implements ArticleCallback {
    private Subject mSubject;
    private ListView mListView;
    private ArticleAdapter mArticleAdapter;
    private View mHeaderView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subject);
        String data = getIntent().getStringExtra("data");
        try {
            mSubject = new Subject(data);
        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(this,"错误数据.",Toast.LENGTH_LONG).show();
            finish();
            return;
        }

        mListView = (ListView)findViewById(R.id.listview);
        initHeaderView();
        mArticleAdapter = new ArticleAdapter();
        mListView.setAdapter(mArticleAdapter);

        app.getArticleList(mSubject.id,0,100,this);

    }

    @Override
    public boolean onRightButtonClick(){
        Intent i = new Intent(this,PostNewArticleActivity_.class);
        i.putExtra("data", mSubject.toString());
        startActivity(i);
        return false;
    }

    private void initHeaderView() {
        mHeaderView = getLayoutInflater().inflate(
                R.layout.subject_header,
                mListView,
                false
        );
        ((TextView)mHeaderView.findViewById(R.id.title)).setText(mSubject.title);
        ((TextView)mHeaderView.findViewById(R.id.creator)).setText(
                String.format("创建人   %s",mSubject.creator));
        ((TextView)mHeaderView.findViewById(R.id.createTime)).setText(
                String.format("创建时间 %s",mSubject.createTime));
        ((TextView)mHeaderView.findViewById(R.id.lastUpdateTime)).setText(
                String.format("更新时间 %s", mSubject.lastUpdateTime));

        mListView.addHeaderView(mHeaderView);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode == Activity.RESULT_OK){
            // 发表成功。刷新数据
            app.getArticleList(mSubject.id,0,100,this);
        }

    }
    @Override
    public void onGetArticles(long subjectId, int start, int length, JSONObject articles) {
        mArticleAdapter.updateData(articles,start);
        try {
            Log.e("SubjectViewerActivity", articles.toString(4));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onFail(int code, String msg, JSONObject data) {
        // TODO
    }
}