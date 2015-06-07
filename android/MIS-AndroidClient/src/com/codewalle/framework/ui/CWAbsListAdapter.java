package com.codewalle.framework.ui;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import com.codewalle.framework.ui.CWViewHolder;
import com.codewalle.mis.R;
import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiangzhipan on 15/5/7.
 */
public abstract class CWAbsListAdapter<ItemCls,ViewHolderCls extends CWViewHolder> extends BaseAdapter {


    private Class<ViewHolderCls> mViewHolderCls;

    protected List<ItemCls> data = new ArrayList<ItemCls>();


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


    @Override
    public int getCount() {
        return data.size();
    }

    @Override
    public Object getItem(int position) {
        return data.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null || convertView.getTag() == null) {
            LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService
                    (Context.LAYOUT_INFLATER_SERVICE);

            convertView = inflater.inflate(R.layout.item_article, parent, false);
        }

        ViewHolderCls holder = (ViewHolderCls) convertView.getTag();
        if (holder == null) {
            try {
                holder = mViewHolderCls.getConstructor(View.class).newInstance(convertView);
                convertView.setTag(holder);
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        holder.update((ItemCls)getItem(position));
        return convertView;
    }
}
