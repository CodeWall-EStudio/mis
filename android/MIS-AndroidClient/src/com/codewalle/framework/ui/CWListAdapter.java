package com.codewalle.framework.ui;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import com.codewalle.mis.R;
import com.codewalle.mis.model.Article;
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

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null || convertView.getTag() == null) {
            LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService
                    (Context.LAYOUT_INFLATER_SERVICE);

            convertView = inflater.inflate(getLayoutRes(),parent,false);
//            convertView = getConverView();
        }

        ViewHolder holder = (ViewHolder) convertView.getTag();
        if (holder == null) {
            holder = getViewHolder(convertView);
            convertView.setTag(holder);
        }
        holder.update( getItem(position));
        return convertView;
    }

    protected abstract int getLayoutRes();
    protected abstract ViewHolder getViewHolder(View convertView);
    protected abstract void clearData();
    protected abstract void addJSONData(JSONArray newData);
    protected abstract int getDataCount();


    public abstract static class ViewHolder{
        public TextView findTextView(View parent,int resId){
            return (TextView)parent.findViewById(resId);
        }
        public abstract void update(Object item);
    }
}
