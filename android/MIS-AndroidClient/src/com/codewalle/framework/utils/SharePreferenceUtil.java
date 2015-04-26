package com.codewalle.framework.utils;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import java.util.*;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class SharePreferenceUtil {
    private static final int MODE_PRIVATE = Application.MODE_PRIVATE;
    private static final String KEY_SP_CONTENT = "CONTENT";

    // ############ 基本接口，后续可换为 SQLite ####################

    private boolean saveMappingData(String cacheType, String[] keys, String[] valuse,Context ctx) {
        return saveMappingData(cacheType, Arrays.asList(keys), Arrays.asList(valuse),ctx);
    }

    private boolean saveMappingData(String cacheType, List<String> keys, List<String> values,Context ctx) {
        if(keys.size() != values.size()){
            throw new Error("key size not match with value size!");
        }
        SharedPreferences.Editor editor = getSharedPreferencesEditor(cacheType,ctx);
        for(int i=0;i<keys.size();++i){
            String key = keys.get(i);
            String value = values.get(i);
            editor.putString(key,value);
        }
        return editor.commit();
    }

    public Map<String,String> getMappingData(String cacheType,String[] keys,Context ctx){
        return getMappingData(cacheType, Arrays.asList(keys),ctx);
    }
    public Map<String,String> getMappingData(String cacheType,List<String> keys,Context ctx){
        if(keys.isEmpty()){
            return Collections.EMPTY_MAP;
        }

        Map<String, String> result = new HashMap<String, String>(keys.size());
        SharedPreferences sp = getSharedPreferences(cacheType,ctx);
        for(String key : keys){
            result.put(key, sp.getString(key, ""));
        }
        return result;
    }

    public String getCachedData(String cacheType,String key,String defaultValue,Context ctx){
        SharedPreferences sp = getSharedPreferences(cacheType,ctx);
        return sp.getString(key, defaultValue);
    }
    public boolean updateCachedData(String listType,String updatedStr,Context ctx){
        SharedPreferences.Editor editor = getSharedPreferencesEditor(listType,ctx);
        editor.putString(KEY_SP_CONTENT, updatedStr);
        return editor.commit();
    }

    public boolean removeCachedData(String cacheType,Context ctx){
        SharedPreferences.Editor editor = getSharedPreferencesEditor(cacheType,ctx);
        editor.clear();
        return editor.commit();
    }
    public boolean removeCachedData(String cacheType,String key,Context ctx){
        SharedPreferences.Editor editor = getSharedPreferencesEditor(cacheType,ctx);
        editor.remove(key);
        return editor.commit();
    }


    private SharedPreferences getSharedPreferences(String name,Context ctx){
        return ctx.getSharedPreferences(name, MODE_PRIVATE);
    }
    private SharedPreferences.Editor getSharedPreferencesEditor(String name,Context ctx){
        return getSharedPreferences(name,ctx).edit();
    }

    // ############ 基本接口END  ####################
}
