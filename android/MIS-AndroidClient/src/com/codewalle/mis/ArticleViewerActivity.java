package com.codewalle.mis;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuItem;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.controller.ArticleCallback;
import com.codewalle.mis.controller.RequestBuilder;
import com.codewalle.mis.model.Article;
import com.codewalle.mis.model.Resource;
import com.codewalle.mis.widget.FloatImageLayout;
import com.handmark.pulltorefresh.library.PullToRefreshExpandableListView;
import com.handmark.pulltorefresh.library.PullToRefreshListView;
import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by xiangzhipan on 15/4/29.
 */
@EActivity(R.layout.activity_article_viewer)
public class ArticleViewerActivity extends BaseFragmentActivity implements ArticleCallback {


    @ViewById(R.id.title)
    TextView tvTitle;

    @ViewById(R.id.content)
    TextView tvContent;

    @ViewById(R.id.creator)
    TextView tvCreator;

    @ViewById(R.id.createTime)
    TextView tvCreatTime;

    @ViewById
    PullToRefreshListView listview;

    @ViewById(R.id.resource)
    FloatImageLayout imageLayout;


    private Article mArticle;
    private CommentAdapter mAdapter;

    @AfterViews
    public void initUI(){
//        setRightMenu(false);
        String article = getIntent().getStringExtra("data");
        try {
            mArticle = new Article(article);
        } catch (JSONException e) {
            e.printStackTrace();
            finish();
            Toast.makeText(this,"数据错误",Toast.LENGTH_SHORT).show();
            return;
        }


        tvCreator.setText(mArticle.creatorName);
        tvTitle.setText(mArticle.title);
        tvContent.setText(mArticle.content);
        tvCreatTime.setText(mArticle.createTime);

        List<Resource> resources = mArticle.resources;
        if(resources != null && resources.size() != 0){

            imageLayout.reset();
            imageLayout.setVisibility(View.VISIBLE);
            for(Resource r:resources){
                imageLayout.addImage(RequestBuilder.BASE_URL+RequestBuilder.DOWNLOAD_PATH+"?id="+r.id,100,100);
            }
        }else{
            imageLayout.setVisibility(View.GONE);
        }

        mAdapter = new CommentAdapter();

        listview.setAdapter(mAdapter);

        app.getComments(mArticle.id,0,100,this);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        MenuItem item =  menu.add("?");
        item.setIcon(R.drawable.alarm);
        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);

        item = menu.add("search");
        item.setIcon(R.drawable.search);
        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);

        return true;
    }

    @Override
    public void onGetArticles(long subjectId, int start, int length, JSONObject articles) {
        if(start == 0) {
            mAdapter.clearData();
        }
    }

    @Override
    public void onFail(int code, String msg, JSONObject data) {

    }
}