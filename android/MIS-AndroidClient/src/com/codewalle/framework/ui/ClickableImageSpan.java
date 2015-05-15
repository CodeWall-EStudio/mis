package com.codewalle.framework.ui;

import android.graphics.drawable.Drawable;
import android.graphics.drawable.StateListDrawable;
import android.text.style.ImageSpan;
import android.util.StateSet;
import android.view.MotionEvent;
import android.view.View;

/**
 * Created by xiangzhipan on 15/4/27.
 */
public class ClickableImageSpan extends ImageSpan {

    public interface ClickableImageSpanListener {
        public void onClick(ClickableImageSpan span);
    }

    private boolean beEnable = true;
    private Drawable mDrawable;
    private ClickableImageSpanListener mClickListener;

    public ClickableImageSpan(Drawable normalDrawable, Drawable pressedDrawable) {
        super(normalDrawable);
        StateListDrawable drawable = new StateListDrawable();
        drawable.addState(statePressed, pressedDrawable);
        drawable.addState(StateSet.WILD_CARD, normalDrawable);
        mDrawable = drawable;
        mDrawable.setBounds(0, 0, pressedDrawable.getBounds().right,
                pressedDrawable.getBounds().bottom);
    }

    public void setClickListener(ClickableImageSpanListener listener) {
        mClickListener = listener;
    }

    /**
     * 去除选中态
     * @param parentView
     */
    public void setDisselected(View parentView) {
        mDrawable.setState(StateSet.WILD_CARD);
        parentView.invalidate();
    }
    /**
     * 设置选中态
     */
    public void setSelected(View parentView) {
        mDrawable.setState(statePressed);
        parentView.invalidate();
    }

    /**
     * 设置点击态是否可用
     * @param enabled
     */
    public void setEnable(boolean enabled) {
        beEnable = enabled;
    }

    /**
     * 判断是否可用，可用包含是否接收Touch事件和是否可以被选中
     * @return
     */
    public boolean isEnable() {
        return beEnable;
    }

    @Override
    public Drawable getDrawable() {
        return mDrawable;
    }

    private static final int[] statePressed = new int[] {
            android.R.attr.state_pressed
    };

    public boolean onTouch(View widget, MotionEvent event) {
        if (!beEnable) {
            return false;
        }
        int action = event.getAction();
        if (action == MotionEvent.ACTION_MOVE) {
            return false;
        } else if (action == MotionEvent.ACTION_DOWN) {
            mDrawable.setState(statePressed);
        } else {
            mDrawable.setState(StateSet.WILD_CARD);
        }

        if (action == MotionEvent.ACTION_UP && mClickListener != null) {
            mClickListener.onClick(this);
        }

        widget.invalidate();
        return true;
    }
}
