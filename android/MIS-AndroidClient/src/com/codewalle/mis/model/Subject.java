package com.codewalle.mis.model;

import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class Subject {

    public long id;
    public String creator;
    public String title;
    public String createTime;
    public long lastUpdateUserId;
    public long memberCount;
    public long articleCount;
    public long resourceCount;
    public String updatorName;

    public Subject(JSONObject object) {
        creator = object.optString("creatorName", "-");
        title = object.optString("title", "-");
        createTime = object.optString("createTime", "-");
        id = object.optLong("id", 0);
        lastUpdateUserId = object.optLong("updator", 0);
        memberCount = object.optLong("memberCount", 0);
        updatorName = object.optString("updatorName", "无");
        resourceCount = object.optLong("resourceCount", 0);
        articleCount = object.optLong("articleCount", 0);

    }
}
