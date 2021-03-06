package com.codewalle.mis.model;

import com.codewalle.framework.Utils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiangzhipan on 15/4/26.
 */
public class Article {
    /**
     id = decoder["id"].integer
     subject_id = decoder["subject_id"].integer
     creator = decoder["creator"].integer
     updator = decoder["updator"].integer
     status = decoder["status"].integer
     isStar = decoder["isStar"].integer
     isCollect = decoder["isCollect"].integer

     title = decoder["title"].string
     content = decoder["content"].string
     createTime = decoder["createTime"].string
     updateTime = decoder["updateTime"].string
     creatorName = decoder["creatorName"].string
     updatorName = decoder["updatorName"].string
     */
    public long id;
    public long subjectId;
    public long creator;
    public long updator;
    public int status;
    public int isStar;
    public int isCollect;


    public String title;
    public String content;
    public String createTime;
    public String updateTime;
    public String creatorName;
    public String updatorName;

    public List<Resource> resources = new ArrayList<Resource>();

    private String mJSONString;

    public Article(String jsonString) throws JSONException {
        mJSONString = jsonString;
        JSONObject object = new JSONObject(jsonString);
        init(object);
    }

    public Article(JSONObject object) {
        mJSONString = object.toString();
        init(object);
    }

    private void init(JSONObject object) {
        id = object.optLong("id");
        subjectId = object.optLong("subject_id");
        creator = object.optLong("creator");
        updator = object.optLong("updator");
        status = object.optInt("status");
        isStar = object.optInt("isStar");
        isCollect = object.optInt("isCollect");

        title = object.optString("title", "-");
        content = object.optString("content", "-");
        createTime = Utils.timeFormat(object.optString("createTime", "-"));
        updateTime = Utils.timeFormat(object.optString("updateTime", "-"));
        creatorName = object.optString("creatorName", "-");
        updatorName = object.optString("updatorName", "-");

        JSONArray resourcesObj = object.optJSONArray("resource");
        if(resourcesObj != null){
            for(int i=0;i<resourcesObj.length();++i){
                JSONObject resource = resourcesObj.optJSONObject(i);
                if(resource == null)continue;
                Resource r = new Resource(resource);
                resources.add(r);
            }
        }
    }


    @Override
    public String toString(){
        return mJSONString;
    }
}
