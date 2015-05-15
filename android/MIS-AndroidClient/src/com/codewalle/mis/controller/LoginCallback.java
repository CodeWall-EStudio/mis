package com.codewalle.mis.controller;

import com.codewalle.mis.model.UserInfo;

/**
 *
 * onLoginSuccess 用户主动登录成功
 * onLoginFail    用户主动登录失败
 * onAutoLogined  自动登录成功
 *
 * Created by xiangzhipan on 15/4/21.
 */
public interface LoginCallback {
    void onLoginSuccess(UserInfo user);
    void onLoginFail(UserInfo user);
    void onAutoLogined(UserInfo user);
}
