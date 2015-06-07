package com.codewalle.mis;

import android.content.Context;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.codewalle.mis.model.ArticleComment;
import org.androidannotations.annotations.EViewGroup;
import org.androidannotations.annotations.ViewById;
import org.w3c.dom.Text;

/**
 * Created by xiangzhipan on 15/5/8.
 */

@EViewGroup(R.layout.article_comment)
public class CommentView extends LinearLayout{


    public CommentView(Context context) {
        super(context);
    }


    @ViewById
    TextView commentor;

    @ViewById
    TextView commentCreateTime;

    @ViewById
    TextView commentTitle;

    @ViewById
    TextView commentContent;

    public void bind(ArticleComment comment){
        commentor.setText(comment.creator);
    }


}
