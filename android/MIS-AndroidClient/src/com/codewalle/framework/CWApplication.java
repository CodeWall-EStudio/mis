package com.codewalle.framework;

import android.app.Application;
import android.util.Pair;
import com.codewalle.framework.network.CWResponseListener;
import com.codewalle.framework.network.CWVolley;
import com.codewalle.framework.utils.SharePreferenceUtil;
import com.codewalle.mis.controller.*;
import com.codewalle.mis.model.UserInfo;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by xiangzhipan on 15/4/18.
 */
public class CWApplication extends Application {

    private static CWApplication sApp;
    private UserController mUserController;
    private SubjectController mSubjectController;

    public CWApplication(){
        super();
        sApp = this;
    }



    @Override
    public void onCreate() {
        super.onCreate();

        CWVolley.init(getApplicationContext());
        mUserController = new UserController(this);
        mSubjectController = new SubjectController(this);


    }

    public static CWApplication getApp(){
        return sApp;
    }



    // TODO:返回网络请求所需要的header
    public static Map<String, String> getRequestHeaders() {
        return null;
    }
    // TODO 保存cookies
    public void saveCookies(Set<Pair<String, String>> headerSet) {

    }

    public void getArticleList(long subjectId, int start, int limit, ArticleCallback callback) {
        mSubjectController.getArticleList(subjectId, start, limit, callback);
    }

    public void getSubjectList(int type, int start, int limit, SubjectCallback callback) {
        mSubjectController.getSubjectList(type, start, limit, callback);
    }

    public void createArticle(String subjectId, String title, String content, ArrayList<Integer> labels, ArrayList<Integer> resources, CWResponseListener listener) {
        mSubjectController.createArticle(subjectId, title, content, labels, resources, listener);
    }

    public void uploadResource(String filePath, CWResponseListener listener) throws FileNotFoundException {
        mSubjectController.uploadResource(filePath, listener);
    }

    // DELEGATE UserController
    public void setUser(UserInfo user) {
        mUserController.setUser(user);
    }
    public UserInfo getUser(){
        return mUserController.getUser();
    }
    public boolean doAutoLogin(LoginCallback cb) {
        return mUserController.doAutoLogin(cb);
    }
    public void doLogout() {
        mUserController.doLogout();
    }

    public void doLogin(String uid, String auth, LoginCallback cb) {
        mUserController.doLogin(uid, auth, cb);
    }

    public static boolean isValidUserInfo(UserInfo userInfo) {
        return UserController.isValidUserInfo(userInfo);
    }

    // DELEGATE SharePreferenceUtil
    SharePreferenceUtil mSPUtil = new SharePreferenceUtil();
    public String getCachedData(String cacheType, String key, String defaultValue) {
        return mSPUtil.getCachedData(cacheType, key, defaultValue, this);
    }

    public Map<String, String> getMappingData(String cacheType, List<String> keys) {
        return mSPUtil.getMappingData(cacheType, keys, this);
    }

    public boolean updateCachedData(String listType, String updatedStr) {
        return mSPUtil.updateCachedData(listType, updatedStr, this);
    }

    public Map<String, String> getMappingData(String cacheType, String[] keys) {
        return mSPUtil.getMappingData(cacheType, keys, this);
    }

    public boolean removeCachedData(String cacheType) {
        return mSPUtil.removeCachedData(cacheType, this);
    }

    public boolean removeCachedData(String cacheType, String key) {
        return mSPUtil.removeCachedData(cacheType, key, this);
    }

}
