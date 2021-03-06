//
// DO NOT EDIT THIS FILE, IT HAS BEEN GENERATED USING AndroidAnnotations 3.0.1.
//


package com.codewalle.mis;

import android.content.Context;
import android.widget.TextView;
import com.codewalle.mis.R.id;
import com.codewalle.mis.R.layout;
import org.androidannotations.api.view.HasViews;
import org.androidannotations.api.view.OnViewChangedListener;
import org.androidannotations.api.view.OnViewChangedNotifier;


/**
 * We use @SuppressWarning here because our java code
 * generator doesn't know that there is no need
 * to import OnXXXListeners from View as we already
 * are in a View.
 * 
 */
@SuppressWarnings("unused")
public final class CommentView_
    extends CommentView
    implements HasViews, OnViewChangedListener
{

    private boolean alreadyInflated_ = false;
    private final OnViewChangedNotifier onViewChangedNotifier_ = new OnViewChangedNotifier();

    public CommentView_(Context context) {
        super(context);
        init_();
    }

    public static CommentView build(Context context) {
        CommentView_ instance = new CommentView_(context);
        instance.onFinishInflate();
        return instance;
    }

    /**
     * The mAlreadyInflated_ hack is needed because of an Android bug
     * which leads to infinite calls of onFinishInflate()
     * when inflating a layout with a parent and using
     * the <merge /> tag.
     * 
     */
    @Override
    public void onFinishInflate() {
        if (!alreadyInflated_) {
            alreadyInflated_ = true;
            inflate(getContext(), layout.article_comment, this);
            onViewChangedNotifier_.notifyViewChanged(this);
        }
        super.onFinishInflate();
    }

    private void init_() {
        OnViewChangedNotifier previousNotifier = OnViewChangedNotifier.replaceNotifier(onViewChangedNotifier_);
        OnViewChangedNotifier.registerOnViewChangedListener(this);
        OnViewChangedNotifier.replaceNotifier(previousNotifier);
    }

    @Override
    public void onViewChanged(HasViews hasViews) {
        commentor = ((TextView) hasViews.findViewById(id.commentor));
        commentCreateTime = ((TextView) hasViews.findViewById(id.commentCreateTime));
        commentContent = ((TextView) hasViews.findViewById(id.comment_content));
        commentTitle = ((TextView) hasViews.findViewById(id.comment_title));
    }

}
