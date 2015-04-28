package com.codewalle.framework.ui;

import android.text.GetChars;
import android.text.Spannable;

/**
 * Created by xiangzhipan on 15/4/27.
 */
public class CWSimpleSpannable implements Spannable, CharSequence, GetChars, Cloneable{
    @Override
    public void getChars(int i, int i1, char[] chars, int i2) {

    }

    @Override
    public void setSpan(Object o, int i, int i1, int i2) {

    }

    @Override
    public void removeSpan(Object o) {

    }

    @Override
    public <T> T[] getSpans(int i, int i1, Class<T> aClass) {
        return null;
    }

    @Override
    public int getSpanStart(Object o) {
        return 0;
    }

    @Override
    public int getSpanEnd(Object o) {
        return 0;
    }

    @Override
    public int getSpanFlags(Object o) {
        return 0;
    }

    @Override
    public int nextSpanTransition(int i, int i1, Class aClass) {
        return 0;
    }

    @Override
    public int length() {
        return 0;
    }

    @Override
    public char charAt(int i) {
        return 0;
    }

    @Override
    public CharSequence subSequence(int i, int i1) {
        return null;
    }
}
