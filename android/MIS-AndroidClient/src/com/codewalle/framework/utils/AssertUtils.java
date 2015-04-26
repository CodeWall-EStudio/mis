package com.codewalle.framework.utils;

/**
 * Created by xiangzhipan on 15/4/24.
 */
public final class AssertUtils {
    private static final String TAG = "AssertUtils";

    public static void assertTrue(boolean cond) {
        if (!Const.isDebug) {
            return;
        }

        if (!cond) {
            throw new AssertionError();
        }
    }

    public static void fail(String message, Object... args) {
        if (!Const.isDebug) {
            return;
        }

        throw new AssertionError(
                args.length == 0 ? message : String.format(message, args));
    }

    public static <T> T checkNotNull(T object) {
        if (!Const.isDebug) {
            return object;
        }

        if (object == null) throw new NullPointerException();
        return object;
    }
}
