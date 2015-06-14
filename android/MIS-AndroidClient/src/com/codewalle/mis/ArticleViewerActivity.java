package com.codewalle.mis;

import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import com.actionbarsherlock.view.Menu;
import com.codewalle.framework.Utils;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.controller.RequestBuilder;
import com.codewalle.mis.model.Article;
import com.codewalle.mis.model.Resource;
import com.codewalle.mis.widget.FloatImageLayout;
import com.handmark.pulltorefresh.library.PullToRefreshListView;
import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by xiangzhipan on 15/4/29.
 */
@EActivity(R.layout.activity_article_viewer)
public class ArticleViewerActivity extends BaseFragmentActivity implements CommentCallback, CreateCommentCallback {


    @ViewById(R.id.title)
    TextView tvTitle;

    @ViewById(R.id.content)
    TextView tvContent;

    @ViewById(R.id.creator)
    TextView tvCreator;

    @ViewById(R.id.createTime)
    TextView tvCreatTime;

    @ViewById
    ListView listview;

    @ViewById(R.id.resource)
    FloatImageLayout imageLayout;


    @ViewById
    EditText commentInput;

    @Click
    public void send(View view){
        if(TextUtils.isEmpty(commentInput.getText().toString())){
            Toast.makeText(this,"请先输入评论",Toast.LENGTH_SHORT).show();
        }else {
            app.createComment(mArticle, commentInput.getText().toString(), this);
            view.setEnabled(false);
        }
    }

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


        setTitle("查看帖子");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

//        MenuItem item =  menu.add("?");
//        item.setIcon(R.drawable.alarm);
//        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);
//
//        item = menu.add("search");
//        item.setIcon(R.drawable.search);
//        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS);

        return true;
    }



    @Override
    public void onGetComment(long articleId, int begin, int num, JSONObject data) {
        mAdapter.updateData(data, begin);
    }

    @Override
    public void onFail(long articleId, String message, JSONObject data) {
        Toast.makeText(this,"获取数据失败",Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onCreateFail(Article article, String msg, JSONObject data) {
        Toast.makeText(this,"发送失败",Toast.LENGTH_SHORT).show();
        findViewById(R.id.send).setEnabled(true);
    }

    @Override
    public void onCommentCreated(Article article, JSONObject data) {
        Utils.hideKeyBoard(this);
        commentInput.setText("");
        Toast.makeText(this,"发送成功",Toast.LENGTH_SHORT).show();
        findViewById(R.id.send).setEnabled(true);
        app.getComments(mArticle.id,0,100,this);
        commentInput.setText("");

    }
}