package com.codewalle.mis;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.codewalle.framework.ui.CWListAdapter;
import com.codewalle.mis.model.Article;
import com.codewalle.mis.model.ArticleComment;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.EBean;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiangzhipan on 15/5/8.
 */

@EBean
public class CommentAdapter extends CWListAdapter {

    List<ArticleComment> mCommentList = new ArrayList<ArticleComment>(5);

    @Override
    protected void clearData() {
        mCommentList.clear();
    }

    @Override
    protected void addJSONData(JSONArray newData) {
        try {
            Log.i("CommentAdapter",newData.toString(2));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        for(int i=0;i<newData.length();++i){
            try {
                mCommentList.add(new ArticleComment(newData.optJSONObject(i)));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected int getDataCount() {
        return mCommentList.size();
    }

    /**
     * How many items are in the data set represented by this Adapter.
     *
     * @return Count of items.
     */
    @Override
    public int getCount() {
        return mCommentList.size();
    }

    /**
     * Get the data item associated with the specified position in the data set.
     *
     * @param position Position of the item whose data we want within the adapter's
     *                 data set.
     * @return The data at the specified position.
     */
    @Override
    public Object getItem(int position) {
        if(position >= mCommentList.size())return null;
        return mCommentList.get(position);
    }

    /**
     * Get the row id associated with the specified position in the list.
     *
     * @param position The position of the item within the adapter's data set whose row id we want.
     * @return The id of the item at the specified position.
     */
    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    protected int getLayoutRes() {
        return R.layout.item_comment;
    }

    @Override
    protected ViewHolder getViewHolder(View convertView) {
        return new MyViewHolder(convertView);
    }

    private static class MyViewHolder extends ViewHolder{

        private TextView createTime;
        private TextView creator;
        private TextView content;

        public MyViewHolder(View parent){
            createTime = findTextView(parent, R.id.createTime);
            creator = findTextView(parent,R.id.creator);
            content = findTextView(parent,R.id.content);

        }
        @Override
        public void update(Object obj) {
            ArticleComment comment = (ArticleComment)obj;

            createTime.setText(comment.createTime);
            creator.setText(comment.creator);
            content.setText(comment.content);
        }
    }
}
