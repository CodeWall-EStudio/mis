package com.codewalle.mis;

import android.app.Activity;
import android.content.Context;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.codewalle.framework.ui.CWListAdapter;
import com.codewalle.mis.model.Subject;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by xiangzhipan on 15/4/25.
 */
public class MISListAdapter extends CWListAdapter {
    private List<Subject> mSubjects = new ArrayList<Subject>(5);
    private TextView mMoreView;

    @Override
    public int getCount() {
        if(getDataCount()  == 0)
            return 0;

        return getDataCount() + 1;
    }

    @Override
    public Object getItem(int i) {
        if(i<getDataCount()) {
            return mSubjects.get(i);
        }else{
            return null;
        }
    }

    @Override
    public long getItemId(int i) {
        if(i < mSubjects.size()) return 0;
        else return 1;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup parent) {
        if(getItemId(i) == 0) {
            if (convertView == null || convertView.getTag() == null) {
                LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService
                        (Context.LAYOUT_INFLATER_SERVICE);

                convertView = inflater.inflate(R.layout.item_subject, parent, false);
            }

            ViewHolder holder = (ViewHolder) convertView.getTag();
            if (holder == null) {
                holder = new ViewHolder(convertView);
                convertView.setTag(holder);
            }
            holder.update((Subject) getItem(i));


            return convertView;
        }else{
            if(mMoreView == null){
                mMoreView = new TextView(parent.getContext());
                mMoreView.setGravity(View.TEXT_ALIGNMENT_CENTER);
                mMoreView.setEnabled(false);
//                DisplayMetrics dm = new DisplayMetrics();
//                ((Activity)parent.getContext()).getWindowManager().getDefaultDisplay().getMetrics(dm);
//                mMoreView.setHeight((int)(30*dm.density));
            }
            if(!mHasMore){
                mMoreView.setText("加载完毕");
            }else{
                mMoreView.setText("查看更多");
            }

            return mMoreView;
        }
    }

    @Override
    protected void clearData() {
        mSubjects.clear();
    }

    @Override
    protected void addJSONData(JSONArray newData) {
        for(int i=0;i<newData.length();++i){
            JSONObject object = newData.optJSONObject(i);
            mSubjects.add(new Subject(object));
        }
    }

    @Override
    protected int getDataCount() {
        return mSubjects.size();
    }


    /*
    articleCount: 0
    createTime: "2015-04-23T15:02:46.000Z"
    creator: 3creatorName: "A-Z"
    guest: 0
    id: 60
    isArchive: 0
    mark: " 是进是"
    memberCount: 1
    private: 1
    resourceCount: 1
    title: "力是是图片"
    updateTime: "2015-04-23T15:02:46.000Z"
    updator: 3
    * */

    static class ViewHolder{

        Subject subject;

        public ImageView imageView;
        public TextView creator;
        public TextView title;
        public TextView createTime;
        public TextView lastUpdateUser;
        public TextView member;
        public TextView articleCount;
        public TextView resourceCount;

        public ViewHolder(View view) {
            imageView = (ImageView)view.findViewById(R.id.imageView);
            creator = getTextView(view,R.id.creator);
            title = getTextView(view,R.id.title);
            createTime = getTextView(view,R.id.createTime);
            lastUpdateUser = getTextView(view,R.id.lastUpdator);
            member = getTextView(view,R.id.memberCount);
            articleCount = getTextView(view,R.id.articleCount);
            resourceCount = getTextView(view,R.id.resourceCount);
        }

        private TextView getTextView(View view, int resId) {
            return (TextView)view.findViewById(resId);
        }

        public void update(Subject subject){
            imageView.setImageResource(R.drawable.subject05);
            this.subject = subject;
            title.setText(subject.title);
            creator.setText(String.format("%s",subject.creator));
            member.setText(String.format("%d员",subject.memberCount));
            createTime.setText(String.format("%s",subject.createTime));
            articleCount.setText(String.format("%d",subject.articleCount));
            lastUpdateUser.setText(String.format("%s",subject.updatorName));
            resourceCount.setText(String.format("%d",subject.resourceCount));
//            creator.setText(String.format("创建人\t\t\t%s",subject.creator));
//            member.setText(String.format("%d\t个成员",subject.memberCount));
//            createTime.setText(String.format("创建时间\t%s",subject.createTime));
//            articleCount.setText(String.format("%d\t个帖子",subject.articleCount));
//            lastUpdateUser.setText(String.format("最近更新\t%s",subject.updatorName));
//            resourceCount.setText(String.format("%d\t个资源",subject.resourceCount));
        }
    }
}
