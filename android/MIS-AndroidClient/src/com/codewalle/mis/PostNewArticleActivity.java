package com.codewalle.mis;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.framework.ui.BaseFragmentActivity;
import com.codewalle.mis.model.Subject;
import com.codewalle.mis.widget.FloatImageLayout;
import com.codewalle.mis.widget.TagLayout;
import org.androidannotations.annotations.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.File;
import java.util.ArrayList;

/**
 * Created by xiangzhipan on 15/4/27.
 */
@EActivity(R.layout.activity_post_article)
public class PostNewArticleActivity extends BaseFragmentActivity {


    private Subject mSubject;
    private ArrayList<Integer> mResources = new ArrayList<Integer>();
    private ArrayList<Integer> mLabels = new ArrayList<Integer>();

    @ViewById(R.id.article_title)
    EditText mEtTitle;

    @ViewById(R.id.article_content)
    EditText mEtContent;

    @ViewById(R.id.resources)
    FloatImageLayout resources;

    private CWResponseListener mResponseListener = new CWResponseListener() {
        @Override
        public void onResponseJSON(int code, String msg, JSONObject data) {
            if(code == 0) {
                finish();
                setResult(Activity.RESULT_OK);
            }else{
                Toast.makeText(PostNewArticleActivity.this,"发表失败",Toast.LENGTH_SHORT).show();
            }
        }
    };

    @Click({R.id.upload_file,R.id.upload_image_from_camera,R.id.upload_image,R.id.upload_video})
    public void onUploadClicked(View view){
        int type = 0;
        switch(view.getId()){
            case R.id.upload_file:
                type = UploadActivity.UPLOAD_FILE;
                break;
            case R.id.upload_image_from_camera:
                type = UploadActivity.UPLOAD_TYPE_IMAGE_CAPTURE;
                break;
            case R.id.upload_image:
                type = UploadActivity.UPLOAD_TYPE_IMAGE;
                break;
            case R.id.upload_video:
                type = UploadActivity.UPLOAD_FILE;
                break;
        }
        doUpload(type);
    }

    @Override
    protected void onFileUploaded(int type ,boolean success, String filePath, JSONObject resultData, String errorMsg) {
        if(success){
            /*
            {"id":101,
            "name":"xxx.jpg",
            "ext":"jpg",
            "mimetype":"image/jpeg",
            "path":"2015/04/28/1339/5b6e853010cc34efdc2030684d69150f.jpg",
            "size":61897,
            "createTime":"2015-04-28T13:39:51.000Z",
            "creator":3,"type":1,"md5":null
            }
            */
            int id = resultData.optInt("id");
            mResources.add(id);
            if(type == UploadActivity.UPLOAD_TYPE_IMAGE ||
                    type == UploadActivity.UPLOAD_TYPE_IMAGE_CAPTURE) {
                resources.addImage(new File(filePath), 80, 80);
            }else{
                resources.addImage(R.drawable.icon,80,80);
            }

        }else{
//            resources.addImage(new File(filePath), 80, 80);
            Toast.makeText(this,"上传失败 "+type+" "+filePath+" "+errorMsg,Toast.LENGTH_SHORT).show();
        }


    }

    @AfterInject
    public void init(){

        setRightMenuText("完成");

        Intent i =getIntent();
        try {
            mSubject = new Subject(i.getStringExtra("data"));
        } catch (JSONException e) {
            e.printStackTrace();
            finish();
            return;
        }
    }


    @Override
    protected boolean onRightButtonClick() {
        String subjectId = mSubject.id+"";
        String title = mEtTitle.getText().toString();
        String content = mEtContent.getText().toString();
        if(TextUtils.isEmpty(title) || TextUtils.isEmpty(content)){
            return false;
        }

        app.createArticle(subjectId,title,content,mLabels,mResources,mResponseListener);
        return super.onRightButtonClick();
    }
}