package com.codewalle.mis.model;

/**
 * Created by xiangzhipan on 15/4/23.
 */
@Entry.Table("user")
public class UserEntry extends Entry {
    public static final EntrySchema SCHEMA = new EntrySchema(UserEntry.class);

    public interface Columns extends Entry.Columns {
        public static final String UID = "uid";
        public static final String ACCOUNT = "account";//关联账号：eg: 手Q的uin, 微信的手机号等
        public static final String NICK_NAME = "nick_name";
        public static final String USER_HEAD_URL = "user_head_url";
        public static final String FOLLOW_COUNT = "follow_count";//关注个数
        public static final String FANS_COUNT = "fans_count";// 粉丝个数
        public static final String FEEDS_COUNT = "feeds_count";//瞬间个数
        public static final String IS_FOLLOW = "is_follow";//当前用户是否关注此人
        public static final String UPDATE_TIME = "update_time";//更新时间
    }

    public final static String[] PROJECT_All = new String[] {
            Columns.UID,
            Columns.ACCOUNT,
            Columns.NICK_NAME,
            Columns.USER_HEAD_URL,
            Columns.FOLLOW_COUNT,
            Columns.FANS_COUNT,
            Columns.FEEDS_COUNT,
            Columns.IS_FOLLOW,
            Columns.UPDATE_TIME};

    @Column(value = Columns.UID, indexed = true)
    public long uid;

    @Column(Columns.ACCOUNT)
    public String account;

    @Column(Columns.NICK_NAME)
    public String nickName;

    @Column(Columns.USER_HEAD_URL)
    public String userHeadUrl;

    @Column(Columns.FOLLOW_COUNT)
    public int followCount;

    @Column(Columns.FANS_COUNT)
    public int fansCount;

    @Column(Columns.FEEDS_COUNT)
    public int feedsCount;

    @Column(Columns.IS_FOLLOW)
    public boolean isFollow;

    @Column(Columns.UPDATE_TIME)
    public long updateTime;

//    @Override
//    public String toString() {
//        final StringBuilder builder = new StringBuilder("UserEntry")
//                .append("\nuid:").append(uid)
//                .append("\naccount:").append(account)
//                .append("\nnickName:").append(nickName)
//                .append("\nuserHeadUrl:").append(userHeadUrl)
//                .append("\nfollowCount:").append(followCount)
//                .append("\nfansCount:").append(fansCount)
//                .append("\nfeedsCount:").append(feedsCount)
//                .append("\nisFollow:").append(isFollow)
//                .append("\nupdateTime:").append(updateTime);
//        return builder.toString();
//    }
}
