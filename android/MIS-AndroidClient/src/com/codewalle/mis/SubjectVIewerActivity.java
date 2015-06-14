package com.codewalle.mis;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.*;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.controller.ArticleCallback;
import com.codewalle.mis.model.Article;
import com.codewalle.mis.model.Subject;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class SubjectViewerActivity extends BaseFragmentActivity implements ArticleCallback, AdapterView.OnItemClickListener {
    private static final int CODE_JUMP_NEXT = 1001;
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
            Toast.makeText(this, "错误数据.", Toast.LENGTH_LONG).show();
            finish();
            return;
        }

        mListView = (ListView) findViewById(R.id.listview);
        initHeaderView();
        mArticleAdapter = new ArticleAdapter();
        mListView.setAdapter(mArticleAdapter);
        mListView.setOnItemClickListener(this);

    }

    @Override
    public void onResume(){
        super.onResume();
        setTitle("浏览主题");
        app.getArticleList(mSubject.id, 0, 100, this);

    }


    @Override
    public boolean onRightButtonClick() {
        Intent i = new Intent(this, PostNewArticleActivity_.class);
        i.putExtra("data", mSubject.toString());
        startActivityForResult(i, CODE_JUMP_NEXT);
        return false;
    }
    private void initHeaderView() {
        mHeaderView = findViewById(R.id.include);

        mHeaderView.setClickable(false);
        mHeaderView.setFocusableInTouchMode(false);

        ImageView imageView = (ImageView) mHeaderView.findViewById(R.id.imageView);
        TextView creator = getTextView(mHeaderView, R.id.creator);
        TextView title = getTextView(mHeaderView, R.id.title);
        TextView createTime = getTextView(mHeaderView, R.id.createTime);
        TextView lastUpdateUser = getTextView(mHeaderView, R.id.lastUpdator);
        TextView member = getTextView(mHeaderView, R.id.memberCount);
        TextView articleCount = getTextView(mHeaderView, R.id.articleCount);
        TextView resourceCount = getTextView(mHeaderView, R.id.resourceCount);

        title.setText(mSubject.title);
        creator.setText(String.format("%s", mSubject.creator));
        member.setText(String.format("%d", mSubject.memberCount));
        createTime.setText(String.format("%s", mSubject.createTime));
        articleCount.setText(String.format("%d", mSubject.articleCount));
        lastUpdateUser.setText(String.format("%s", mSubject.updatorName));
        resourceCount.setText(String.format("%d", mSubject.resourceCount));

//        ((TextView)mHeaderView.findViewById(R.id.title)).setText(mSubject.title);
//        ((TextView)mHeaderView.findViewById(R.id.creator)).setText(
//                String.format("创建人   %s",mSubject.creator));
//        ((TextView)mHeaderView.findViewById(R.id.createTime)).setText(
//                String.format("创建时间 %s",mSubject.createTime));
//        ((TextView)mHeaderView.findViewById(R.id.lastUpdateTime)).setText(
//                String.format("更新时间 %s", mSubject.lastUpdateTime));

//        mListView.addHeaderView(mHeaderView);
    }

    private TextView getTextView(View parent, int resId) {
        return (TextView) parent.findViewById(resId);
    }

    @Override
    public void onGetArticles(long subjectId, int start, int length, JSONObject articles) {
        if (isFinishing()) return;
        mArticleAdapter.updateData(articles, start);
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

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        if (view == mHeaderView) return;
        Article article = (Article) parent.getAdapter().getItem(position);
        Intent i = new Intent(this, ArticleViewerActivity_.class);
        i.putExtra("data", article.toString());
        startActivityForResult(i, CODE_JUMP_NEXT);
    }
}