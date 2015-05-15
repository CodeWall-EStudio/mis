package com.codewalle.framework.ui;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class TagView extends TextView {

    protected static final int mDefaultStrokeWidth = 2;//标签边框宽度
    protected int mBorderStrokeColor;
    protected static final int mPaddingLeft = 12;
    protected static final int mPaddingRight = 12;
    protected static final int mPaddingTop = 1;
    protected static final int mPaddingBom = 1;
    protected static final int mEachLabelMargin = 4; //标签之间的距离


    public TagView(Context context, int borderStrokeColor, int textColor) {
        super(context);
        setEllipsize(TextUtils.TruncateAt.MIDDLE);
        mBorderStrokeColor = borderStrokeColor;
        this.setMaxLines(1);
        this.setTextSize(12);
        this.setTextColor(textColor);
        this.setGravity(Gravity.CENTER_HORIZONTAL);
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutParams.rightMargin = mEachLabelMargin;
        this.setLayoutParams(layoutParams);
        setPadding(mPaddingLeft, mPaddingTop, mPaddingRight, mPaddingBom);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        int ext = getPaddingLeft() + getPaddingRight();//标签长度要把文字离边框的左右间距给加上
        super.onLayout(changed, left, top, right + ext, bottom);
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(Color.WHITE);
        drawable.setStroke(mDefaultStrokeWidth, mBorderStrokeColor);
        int defaultCornerRadius = this.getHeight()/2;
        drawable.setCornerRadius(defaultCornerRadius);
        this.setBackgroundDrawable(drawable);
    }

}