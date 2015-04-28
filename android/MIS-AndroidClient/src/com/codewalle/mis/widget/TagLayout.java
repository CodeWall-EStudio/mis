package com.codewalle.mis.widget;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import com.codewalle.framework.ui.FloatLayout;
import com.codewalle.framework.ui.TagView;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class TagLayout extends FloatLayout{
    private static final String DEFAULT_SEPERATOR = "\t";
    private static final int DEFAULT_BORDER_COLOR = Color.GRAY;
    private static final int DEFAULT_TEXT_COLOR = Color.GREEN;

    public TagLayout(Context context) {
        super(context);
    }

    public TagLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public TagLayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setTags(String tagString){
        setTags(tagString, DEFAULT_SEPERATOR);
    }

    public void setTags(String tagString,String seperator){
        String[] tags = tagString.split(seperator);
        for(String tag:tags){
            addTag(tag);
        }
    }

    public void addTag(String tag) {
        TagView tagView = new TagView(getContext(),DEFAULT_BORDER_COLOR,DEFAULT_TEXT_COLOR);
        tagView.setText(tag);
        addView(tagView);
    }
}
