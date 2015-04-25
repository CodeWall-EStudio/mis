package com.codewalle.mis.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;

/**
 * Created by xiangzhipan on 15/4/21.
 */
public class UserInfo implements Parcelable {
    public String uid;
    public String name;
    public String auth;
    public UserInfo(){

    }
    public UserInfo(String uid,String name,String auth){
        this.uid = uid;
        this.name = name;
        this.auth = auth;
    }

    public UserInfo(UserInfo other) {
        if(other != null) {
            uid = other.uid;
            name = other.name;
            auth = other.auth;
        }else{
            uid = name = auth = "";

        }
    }

    public UserInfo(Parcel in) {
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
