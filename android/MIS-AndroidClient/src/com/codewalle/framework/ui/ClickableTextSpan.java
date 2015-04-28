package com.codewalle.framework.ui;

import android.content.Context;
import android.text.SpannableString;
import android.text.style.*;
import android.util.StateSet;
import android.view.MotionEvent;
import android.view.View;
import com.codewalle.mis.PostNewSubjectActivity;

/**
 * Created by xiangzhipan on 15/4/27.
 */
public class ClickableTextSpan extends android.text.style.ClickableSpan {
    public void setOnclickListener(OnClickListener listener) {
        mClickListener = listener;
    }

    @Override
    public void onClick(View view) {
        mClickListener.onClick(this);
    }

    public interface OnClickListener{
        public void onClick(ClickableTextSpan span);
    }
    protected boolean beEnable;
    private OnClickListener mClickListener;


}
