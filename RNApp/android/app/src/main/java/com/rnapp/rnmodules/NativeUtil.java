package com.nnshandai.rnmodules;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.nnshandai.MainActivity;
import com.nnshandai.R;
import com.nnshandai.utils.CodeUtils;
import com.nnshandai.utils.ImageUtil;
import com.nnshandai.utils.Utils;

import java.lang.reflect.Field;

/**
 * Created by wuyunqiang on 2018/1/2.
 */

public class NativeUtil extends ReactContextBaseJavaModule {

    public static final String TAG = "StatusBar";
    private Activity activity;

    public NativeUtil(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeUtil";
    }

//    @ReactMethod
//    public void StatusBar(final Promise promise) {
//        final Activity activity = getCurrentActivity();
//        if(activity!=null){
//            activity.runOnUiThread(new Runnable() {
//                @Override
//                public void run() {
//                    Utils.init(activity.getApplication());
//                    BarUtils.setStatusBarAlpha(activity, 0);
//                    int height = BarUtils.getStatusBarHeight();
//                    Log.i(TAG,height+"");
//                }
//            });
//
//        }
//    }
//
//    @ReactMethod
//    public void StatusBarHeigh(final Promise promise) {
//        final Activity activity = getCurrentActivity();
//        WritableMap params = Arguments.createMap();
//        if(activity!=null){
//            Utils.init(activity.getApplication());
//            int height = BarUtils.getStatusBarHeight();
//            params.putInt("StatusBarHeight",height);
//            promise.resolve(params);
//        }else{
//            params.putInt("StatusBarHeight",0);
//            promise.resolve(params);
//        }
//    }

    @ReactMethod
    public void VerifyImage(String code, final Promise promise) {
        if (getCurrentActivity() != null) {
            CodeUtils codeUtils = CodeUtils.getInstance();
            Bitmap bitmap = codeUtils.createBitmap(code);
            String base64 = Utils.bitmapToBase64(bitmap);
            WritableMap params = Arguments.createMap();
            params.putString("base64", base64);
            promise.resolve(params);
//            String path = ImageUtil.saveImage(getCurrentActivity(), bitmap);
//            Log.i(MainActivity.TAG, "path: " + path);
//            Bitmap bit = ImageUtil.getBitmap(path, 200, 200);
//            Uri uri = ImageUtil.getImageContentUri(getCurrentActivity(), path);
//            String base64 = ImageUtil.bitmapToString(bit);
//            Log.i(MainActivity.TAG, "uri: " + uri);
//            Log.i(MainActivity.TAG, "base64: " + base64);
//            Log.i(MainActivity.TAG, "verify: " + verify);
//       Bitmap bitmap = CodeUtils.createBitmap(code);
//       String verify = CodeUtils.bitmapToBase64(bitmap);
        }else{
            promise.reject("-1","activity null");
        }
    }

}
