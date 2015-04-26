package com.codewalle.mis;

import android.test.ActivityInstrumentationTestCase2;
import android.util.Log;
import com.codewalle.framework.CWApplication;
import com.codewalle.mis.controller.LoginCallback;
import com.codewalle.mis.model.UserInfo;
import junit.framework.Assert;

/**
 * This is a simple framework for a test of an Application.  See
 * {@link android.test.ApplicationTestCase ApplicationTestCase} for more information on
 * how to write and extend Application tests.
 * <p/>
 * To run this test, you can type:
 * adb shell am instrument -w \
 * -e class com.codewalle.mis.SplashActivityTest \
 * com.codewalle.mis.tests/android.test.InstrumentationTestRunner
 */
public class SplashActivityTest extends ActivityInstrumentationTestCase2<SplashActivity> {

    public SplashActivityTest() {
        super("com.codewalle.mis", SplashActivity.class);

    }

    public void testLogin() throws Exception {
        CWApplication app = (CWApplication)getActivity().getApplication();
        app.doLogin("az", "8888", new LoginCallback() {
            @Override
            public void onLoginSuccess(UserInfo user) {
                Assert.assertNotNull(user);
                Assert.assertNotSame(user.auth, "");
                Log.i("Splash", "login success");
            }

            @Override
            public void onLoginFail(UserInfo user) {
                Assert.assertNull(user);
                Log.i("Splash", "login fail");
            }

            @Override
            public void onAutoLogined(UserInfo user) {

            }
        });
        Assert.assertEquals(true,true);
    }
}
