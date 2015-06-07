package com.codewalle.mis;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import com.codewalle.framework.ui.CWListAdapter;
import com.codewalle.mis.controller.RequestBuilder;
import com.codewalle.mis.model.Article;
import com.codewalle.mis.model.Resource;
import com.codewalle.mis.model.Subject;
import com.codewalle.mis.widget.FloatImageLayout;
import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiangzhipan on 15/4/25.
 */


public class ArticleAdapter extends CWListAdapter{

    List<Article> mArticles = new ArrayList<Article>();

    public ArticleAdapter() {

    }

    @Override
    public int getCount() {
        return mArticles.size();
    }

    @Override
    public Object getItem(int i) {
        if(i>=mArticles.size())return null;
        return mArticles.get(i);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup parent) {
        if (convertView == null || convertView.getTag() == null) {
            LayoutInflater inflater = (LayoutInflater) parent.getContext().getSystemService
                    (Context.LAYOUT_INFLATER_SERVICE);

            convertView = inflater.inflate(R.layout.item_article, parent, false);
        }

        ViewHolder holder = (ViewHolder) convertView.getTag();
        if (holder == null) {
            holder = new ViewHolder(convertView);
            convertView.setTag(holder);
        }
        holder.update((Article) getItem(i));


        return convertView;
    }

    @Override
    protected void clearData() {
        mArticles.clear();
    }

    @Override
    protected void addJSONData(JSONArray newData) {
        for(int i=0;i<newData.length();++i){
            mArticles.add(new Article(newData.optJSONObject(i)));
        }
    }

    @Override
    protected int getDataCount() {
        return mArticles.size();
    }

    private class ViewHolder {

        public TextView creator;
        public TextView title;
        public TextView content;

        public FloatImageLayout imageLayout;

        public ViewHolder(View parent) {
            creator = (TextView)parent.findViewById(R.id.creator);
            title = (TextView)parent.findViewById(R.id.title);
            content = (TextView)parent.findViewById(R.id.content);
            imageLayout = (FloatImageLayout)parent.findViewById(R.id.resource);
        }

        public void update(Article item) {
            creator.setText(item.creatorName);
            title.setText(item.title);
            content.setText(item.content);

            List<Resource> resources = item.resources;
            if(resources != null && resources.size() != 0){

                imageLayout.reset();
                title.setText(item.title + resources.size());
                imageLayout.setVisibility(View.VISIBLE);
                for(Resource r:resources){
                    imageLayout.addImage(RequestBuilder.BASE_URL+RequestBuilder.DOWNLOAD_PATH+"?id="+r.id,100,100);
                }
            }else{
                imageLayout.setVisibility(View.GONE);
            }


        }
    }
}
