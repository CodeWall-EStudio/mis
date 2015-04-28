package com.codewalle.mis;

import android.app.Activity;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.TextAppearanceSpan;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.TextView;
import com.codewalle.framework.ui.BaseActivity;
import com.codewalle.framework.ui.ClickableTextSpan;
import com.codewalle.mis.widget.TagLayout;
import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

/**
 * Created by xiangzhipan on 15/4/26.
 */

@EActivity(R.layout.activity_post_subject)
public class PostNewSubjectActivity extends BaseActivity implements ClickableTextSpan.OnClickListener {

    @ViewById(R.id.member)
    ViewGroup memberLayout;

    @ViewById(R.id.members)
    TagLayout members;



    @AfterViews
    public void onPost(){
        String txt = "hello\tworld";
        members.setTags(txt);
    }

    @Override
    public void onClick(ClickableTextSpan span) {

        Log.e("PostNewSubjectActivity","onclick "+span.toString());
    }
}