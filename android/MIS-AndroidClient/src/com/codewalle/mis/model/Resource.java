package com.codewalle.mis.model;

import org.json.JSONObject;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class Resource {
    public int id;

    public Resource(JSONObject resource) {
        id = resource.optInt("id");
    }
}
