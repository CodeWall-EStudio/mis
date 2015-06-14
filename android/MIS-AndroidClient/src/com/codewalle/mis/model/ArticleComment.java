package com.codewalle.mis.model;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by xiangzhipan on 15/5/8.
 */
public class ArticleComment {
    public int id;
    public String creator;
    public String createTime;
    public String title;
    public String content;
    public int article_id;
    public int subject_id;

    /*


     "content": "and four",
        "id": 12,
        "createTime": "2015-06-07T14:20:28.000Z",
        "article_id": 17,
        "title": "",
        "creatorName": "A-Z",
        "updateTime": "2015-06-07T14:20:28.000Z",
        "subject_id": 2,
        "updator": 3,
        "creator": 3
    * */
    public ArticleComment(JSONObject jsonObject)throws JSONException{
        setJSONData(jsonObject);
    }

    public void setJSONData(JSONObject jsonObject)throws JSONException{

        content = jsonObject.optString("content");
        id = jsonObject.optInt("id",0);
        title = jsonObject.optString("title");
        creator = jsonObject.optString("creatorName");
        article_id = jsonObject.optInt("article_id");
        subject_id = jsonObject.optInt("subject_id");

    }
}
