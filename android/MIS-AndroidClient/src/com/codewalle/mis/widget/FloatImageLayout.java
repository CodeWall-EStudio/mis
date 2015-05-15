package com.codewalle.mis.widget;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.util.AttributeSet;
import android.widget.ImageView;
import com.android.volley.toolbox.NetworkImageView;
import com.codewalle.framework.network.CWVolley;
import com.codewalle.framework.ui.FloatLayout;
import com.codewalle.mis.R;

import java.io.File;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class FloatImageLayout extends FloatLayout {
    public FloatImageLayout(Context context) {
        super(context);
    }

    public FloatImageLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public FloatImageLayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void addImage(String src,int width,int height){
        NetworkImageView imageView = new NetworkImageView(getContext());
        imageView.setImageUrl(src, CWVolley.getImageLoader());
        imageView.setDefaultImageResId(R.drawable.icon);
        addImage(imageView, width, height);
    }

    public void addImage(Uri uri,int width,int height){
        ImageView imageView = new ImageView(getContext());
        imageView.setImageURI(uri);
        addImage(imageView,width,height);
    }

    public void addImage(File file,int width,int height){
        ImageView imageView = new ImageView(getContext());
        imageView.setImageDrawable(Drawable.createFromPath(file.getAbsolutePath()));

        addImage(imageView,width,height);
    }

    private void addImage(ImageView imageView,int width,int height){
        LayoutParams lp = imageView.getLayoutParams();
        if(lp == null){
            lp = new LayoutParams(width,height);
        }else {
            lp.width = width;
            lp.height = height;
        }
        imageView.setLayoutParams(lp);
        addView(imageView);
    }

    public void addImage(int resId, int width, int height) {
        ImageView imageView = new ImageView(getContext());
        imageView.setImageResource(resId);
        addImage(imageView,width,height);
    }
}
