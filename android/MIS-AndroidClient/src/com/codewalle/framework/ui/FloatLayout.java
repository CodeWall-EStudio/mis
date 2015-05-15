package com.codewalle.framework.ui;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by xiangzhipan on 15/4/27.
 */
public class FloatLayout extends ViewGroup implements View.OnClickListener {
    private OnItemClickListener mTagClickListener;

    // remove all children
    public void reset() {
        removeAllViews();
    }

    public static interface OnItemClickListener {
        void onItemClick(View v);
    }

    public FloatLayout(Context context) {
        super(context);
    }

    public FloatLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public FloatLayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        int measureHeight = 0;
        int measureWidth = MeasureSpec.getSize(widthMeasureSpec);

        super.measureChildren(widthMeasureSpec, heightMeasureSpec);

        // height
        int paddingLeft = getPaddingLeft();
        int paddingRight = getPaddingRight();
        int paddingTop = getPaddingTop();
        int paddingBottom = getPaddingBottom();

        int childrenHeightTotal = 0;
        int childrenWidthTotal = measureWidth - paddingLeft - paddingRight;
        int childrenMaxHeightOfLine = 0;
        int offsetX = paddingLeft;
        for(int i=0;i<getChildCount();++i){
            View child = getChildAt(i);
            if(child == null || child.getVisibility() ==View.GONE)continue;
            int childH = child.getMeasuredHeight();
            int childW = child.getMeasuredWidth();
            if(childW > childrenWidthTotal)childW = childrenWidthTotal;

            // 换行时计算本行总高度
            if(offsetX + childW > measureWidth - paddingRight){

                offsetX = paddingLeft + childW;
                // 叠加上一行高度
                childrenHeightTotal += childrenMaxHeightOfLine;

                // 因为换行了，最大高度置为当前元素高度
                childrenMaxHeightOfLine = childH;
            }else{
                offsetX += childW;
                if(childH > childrenMaxHeightOfLine){
                    childrenMaxHeightOfLine = childH;
                }
            }
        }
        //加上最后一行
        childrenHeightTotal += childrenMaxHeightOfLine;


        measureHeight = childrenHeightTotal + getPaddingBottom() + getPaddingTop();


        super.setMeasuredDimension(measureWidth, measureHeight);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        int paddingLeft = getPaddingLeft();
        int paddingRight = getPaddingRight();
        int paddingTop = getPaddingTop();
        int paddingBottom = getPaddingBottom();

        final int width = r - l;
        final int childreWidthSpace = r - l- paddingLeft - paddingRight;



        int count = getChildCount();

        int childStartL = paddingLeft;
        int childStartT = paddingTop;

        int childNextL = childStartL;
        int childNextT = childStartT;



        int preChildH = 0;
        for(int i=0;i<count;++i){
            View child = getChildAt(i);

            int childW = child.getMeasuredWidth();
            if(childW > childreWidthSpace)childW = childreWidthSpace;

            int childH = child.getMeasuredHeight();
            int childL = childNextL;
            int childT = childNextT;



            if(childW + childNextL > width){// 换行显示
                childL = childStartL;
                childT += preChildH;
                childNextT += preChildH;
                childNextL = childStartL + childW;
                preChildH = childH;
            }else{
                preChildH = (preChildH > childH)?preChildH:childH;
                // x移动
                childNextL += childW;
            }

            child.layout(childL,childT,childL + childW,childT+childH);

        }

    }





    @Override
    public void onClick(View view) {
        if(mTagClickListener != null){
            mTagClickListener.onItemClick(view);
        }
    }
}
