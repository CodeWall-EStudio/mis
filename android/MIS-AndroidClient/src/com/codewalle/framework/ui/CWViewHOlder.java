package com.codewalle.framework.ui;

import android.util.Pair;
import android.view.View;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xiangzhipan on 15/5/7.
 */
public abstract class CWViewHolder {

    protected List<Pair<View,Integer>> mapping = new ArrayList<Pair<View, Integer>>();
    protected List<View> views = new ArrayList<View>();

    public CWViewHolder(View holder){

    }

    public abstract void update(Object object);
}
