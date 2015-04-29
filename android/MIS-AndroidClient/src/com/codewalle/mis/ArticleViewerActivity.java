package com.codewalle.mis;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuItem;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.model.Article;
import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;
import org.json.JSONException;

/**
 * Created by xiangzhipan on 15/4/29.
 */
@EActivity(R.layout.activity_article_viewer)
public class ArticleViewerActivity extends BaseFragmentActivity {


    @ViewById(R.id.title)
    TextView tvTitle;

    @ViewById(R.id.content)
    TextView tvContent;

    @ViewById(R.id.creator)
    TextView tvCreator;

    @ViewById(R.id.createTime)
    TextView tvCreatTime;


    private Article mArticle;

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
        tvCreatTime.setText(mArticle.createTime);
        tvTitle.setText(mArticle.title);
        tvContent.setText(mArticle.content);


//        app.getComments(mArticle);
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
}