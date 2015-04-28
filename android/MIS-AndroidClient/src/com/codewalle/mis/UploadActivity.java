package com.codewalle.mis;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.widget.Toast;

import java.io.File;
import java.util.Calendar;

/**
 * Created by xiangzhipan on 15/4/28.
 */
public class UploadActivity extends Activity {
    public static final String KEY_FILE_PATH = "file_path";
    private int mType;

    public static final int UPLOAD_FILE = 4;
    public static final int UPLOAD_TYPE_VIDEO_CAPTURE = 3;
    public static final int UPLOAD_TYPE_IMAGE_CAPTURE = 2;
    public static final int UPLOAD_TYPE_IMAGE = 1;
    private String mCachePath;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle bundle = getIntent().getExtras();
        mType = bundle.getInt("type");
        switch (mType) {
            case UPLOAD_TYPE_IMAGE:
                enterAlum();
                break;
            case UPLOAD_TYPE_IMAGE_CAPTURE:
                enterImageCapture();
                break;
            case UPLOAD_TYPE_VIDEO_CAPTURE:
            case UPLOAD_FILE:
        }

    }

    private void enterImageCapture() {
        Intent intent;
        mCachePath = getCameraPath();
        Uri uploadPhotoUri = Uri.fromFile(new File(mCachePath));
        intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, uploadPhotoUri);
        intent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY, 50);
        try {
            startActivityForResult(intent, UPLOAD_TYPE_IMAGE_CAPTURE);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "相机启动失败",
                    Toast.LENGTH_SHORT).show();
            setResult(Activity.RESULT_CANCELED);
            finish();
        }
    }

    private String getCameraPath() {
        Calendar calendar = Calendar.getInstance();
        StringBuilder sb = new StringBuilder(Environment.getExternalStorageDirectory()
                .getAbsolutePath()+"/TRACache/");
        if(!new File(sb.toString()).exists()){
            new File(sb.toString()).mkdir();
        }

        sb.append("IMG");
        sb.append(calendar.get(Calendar.YEAR));
        int month = calendar.get(Calendar.MONTH) + 1; // 0~11
        sb.append(month < 10 ? "0" + month : month);
        int day = calendar.get(Calendar.DATE);
        sb.append(day < 10 ? "0" + day : day);
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        sb.append(hour < 10 ? "0" + hour : hour);
        int minute = calendar.get(Calendar.MINUTE);
        sb.append(minute < 10 ? "0" + minute : minute);
        int second = calendar.get(Calendar.SECOND);
        sb.append(second < 10 ? "0" + second : second);
        if (!new File(sb.toString() + ".jpg").exists()) {
            return sb.toString() + ".jpg";
        }

        StringBuilder tmpSb = new StringBuilder(sb);
        int indexStart = sb.length();
        for (int i = 1; i < Integer.MAX_VALUE; i++) {
            tmpSb.append('(');
            tmpSb.append(i);
            tmpSb.append(')');
            tmpSb.append(".jpg");
            if (!new File(tmpSb.toString()).exists()) {
                break;
            }

            tmpSb.delete(indexStart, tmpSb.length());
        }

        return tmpSb.toString();
    }


    private void enterAlum() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(Intent.createChooser(intent, "选择图片"), UPLOAD_TYPE_IMAGE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == Activity.RESULT_CANCELED) {
            setResultAndFinish();
            return;
        }
        String filePath = "";
        switch(requestCode){
            case UPLOAD_TYPE_IMAGE: {
                if(data == null){
                    setResultAndFinish();
                    return;
                }
                Uri uri = data.getData();
                String[] proj = {MediaStore.Images.Media.DATA};
                Cursor cursor = managedQuery(uri, proj, // Which
                        // columns
                        // to return
                        null, // WHERE clause; which rows to return (all rows)
                        null, // WHERE clause selection arguments (none)
                        null); // Order-by clause (ascending by name)

                int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
                cursor.moveToFirst();
                filePath = cursor.getString(column_index);

            }
                break;
            case UPLOAD_TYPE_IMAGE_CAPTURE:
                filePath = mCachePath;
                break;
        }

        Intent resultIntent = new Intent();
        resultIntent.putExtra(KEY_FILE_PATH, filePath);
        setResult(Activity.RESULT_OK, resultIntent);

        finish();

    }

    private void setResultAndFinish() {

        setResult(Activity.RESULT_CANCELED);
        finish();
    }
}