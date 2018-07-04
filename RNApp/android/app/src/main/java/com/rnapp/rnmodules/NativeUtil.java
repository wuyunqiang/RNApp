package com.rnapp.rnmodules;

import android.app.Activity;
import android.graphics.Bitmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.rnapp.MainActivity;
import com.rnapp.utils.CodeUtils;
import com.rnapp.utils.Utils;

import javax.annotation.Nullable;

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


    @ReactMethod
    public void Finish(final Promise promise) {
        if (getCurrentActivity() != null) {
            getCurrentActivity().finish();
        }
    }

    @ReactMethod
    public void Permission(@Nullable ReadableArray args, final Promise promise){
        final WritableMap params = Arguments.createMap();
        if(getCurrentActivity()==null){
            params.putInt("code", -1);
            params.putString("Permission", "getCurrentActivity()==null");
            promise.resolve(params);
            return;
        }

        if(args.size()<=0){
            params.putInt("code", -1);
            params.putString("Permission", "申请的权限列表为空");
            promise.resolve(params);
            return;
        }

        String[] list = new String[args.size()];
        for (int i=0;i<args.size();i++){
            list[i] = args.getString(i);
        }
        ((MainActivity)getCurrentActivity()).requestPermission(list,promise);
    }




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
