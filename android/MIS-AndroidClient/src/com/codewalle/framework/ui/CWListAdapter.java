package com.codewalle.framework.ui;

import android.widget.BaseAdapter;
import com.codewalle.mis.model.Subject;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * listAdapter 的基本接口：
 *  a. 分页
 *  b. 更新数据
 *
 * Created by xiangzhipan on 15/4/26.
 */
public abstract class CWListAdapter extends BaseAdapter{

    protected int mCount = 0;
    protected int mNextIndex = 0;
    protected boolean mHasMore = true;

    public int getNextIndex(){
        return mNextIndex;
    }
    public boolean hasMore(){
        return mHasMore;
    }

    public void updateData(JSONObject data,int start){
        mCount = data.optInt("total", 0);
        if ( start == 0) {
            clearData();
        }
        JSONArray newData = data.optJSONArray("list");
        addJSONData(newData);

        mNextIndex = getDataCount();;
        mHasMore = mNextIndex < mCount;
        notifyDataSetChanged();
    }

    protected abstract void clearData();
    protected abstract void addJSONData(JSONArray newData);
    protected abstract int getDataCount();

}
