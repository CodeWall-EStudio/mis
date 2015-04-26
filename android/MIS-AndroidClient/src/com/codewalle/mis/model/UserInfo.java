package com.codewalle.mis.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;

/**
 * Created by xiangzhipan on 15/4/21.
 */
public class UserInfo implements Parcelable {
    public String id;// id 是存储用的
    public String uid;// uid 为用户登录名
    public String name;
    public String auth;
    public UserInfo(String id, String uid, String s, String auth){
        this.id = id;
        this.uid = uid;
        this.name = name;
        this.auth = auth;
    }

    public UserInfo(UserInfo other) {
        if(other != null) {
            id = other.id;
            uid = other.uid;
            name = other.name;
            auth = other.auth;
        }else{
            uid = name = auth = "";

        }
    }

    public UserInfo(Parcel in) {
        id = in.readString();
        uid = in.readString();
        name = in.readString();
        auth = in.readString();
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int flags) {
        parcel.writeString(id);
        parcel.writeString(uid);
        parcel.writeString(name);
        parcel.writeString(auth);
    }

    static final Parcelable.Creator<UserInfo> CREATOR = new Parcelable.Creator<UserInfo>(){

        @Override
        public UserInfo createFromParcel(Parcel parcel) {
            return new UserInfo(parcel);
        }

        @Override
        public UserInfo[] newArray(int i) {
            return new UserInfo[0];
        }

    };
}
