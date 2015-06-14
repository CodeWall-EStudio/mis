package com.codewalle.mis;

import android.content.Context;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.codewalle.mis.model.ArticleComment;
import org.androidannotations.annotations.EViewGroup;
import org.androidannotations.annotations.ViewById;

/**
 * Created by xiangzhipan on 15/6/7.
 */
@EViewGroup(R.layout.item_comment)
public class CommentItemView extends LinearLayout {
    public CommentItemView(Context context) {
        super(context);
    }

    @ViewById
    TextView createTime;

    @ViewById
    TextView creator;

    @ViewById
    TextView content;

    public void bind(ArticleComment comment) {
        createTime.setText(comment.createTime);
        creator.setText(comment.creator);
        content.setText(comment.content);
    }
}
