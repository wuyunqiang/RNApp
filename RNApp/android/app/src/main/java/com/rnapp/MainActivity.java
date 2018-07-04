package com.rnapp;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.ColorInt;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.rnapp.rnmodules.NativeUtil;
import com.rnapp.utils.BarUtils;
import com.rnapp.utils.PermissionUtils;
import com.rnapp.utils.Utils;

public class MainActivity extends ReactActivity {


    public static final int REQUEST_CODE= 0x123;
    private String[] permissionList;
    private Promise promise;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNApp";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initStatusBar();
//        Intent it = new Intent(this,NativeActivity.class);
//        startActivity(it);
    }

    private void initStatusBar(){
        Utils.init(this.getApplication());
        BarUtils.setStatusBarAlpha(this, 0);
    }




    public void requestPermission(final String[] str, final Promise promise){
        this.permissionList = str;
        this.promise = promise;
        final WritableMap params = Arguments.createMap();
        PermissionUtils.checkMorePermissions(this, str, new PermissionUtils.PermissionCheckCallBack() {
            @Override
            public void onHasPermission() {
                Log.i(NativeUtil.TAG," checkMorePermissions onHasPermission");
                params.putInt("code", 1);
                if(promise!=null){
                    promise.resolve(params);
                }
                MainActivity.this.permissionList = null;
            }

            @Override
            public void onUserHasAlreadyTurnedDown(String... permission) {
                Log.i(NativeUtil.TAG," checkMorePermissions onUserHasAlreadyTurnedDown");
                PermissionUtils.requestMorePermissions(MainActivity.this,str,REQUEST_CODE);
            }

            @Override
            public void onUserHasAlreadyTurnedDownAndDontAsk(String... permission) {
                Log.i(NativeUtil.TAG," checkMorePermissions onUserHasAlreadyTurnedDownAndDontAsk");
                params.putInt("code", -3);
                params.putString("Permission", "用户去设置界面");
                if(promise!=null){
                    promise.resolve(params);
                }
                PermissionUtils.toAppSetting(MainActivity.this);
            }
        });
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if(requestCode==REQUEST_CODE){
            final WritableMap params = Arguments.createMap();
            Log.i(NativeUtil.TAG,"执行了这里 权限管理");
            PermissionUtils.onRequestMorePermissionsResult(this,this.permissionList, new PermissionUtils.PermissionCheckCallBack() {
                @Override
                public void onHasPermission() {
                    Log.i(NativeUtil.TAG,"onHasPermission");
                    params.putInt("code",1);
                    if(MainActivity.this.promise!=null){
                        MainActivity.this.promise.resolve(params);
                    }
                    MainActivity.this.permissionList = null;
                }

                @Override
                public void onUserHasAlreadyTurnedDown(String... permission) {
                    Log.i(NativeUtil.TAG,"用户已经拒绝了");
                    params.putInt("code",-1);
                    params.putString("Permission", "用户已经拒绝");
                    if(MainActivity.this.promise!=null){
                        MainActivity.this.promise.resolve(params);
                    }
                    MainActivity.this.permissionList = null;
                }

                @Override
                public void onUserHasAlreadyTurnedDownAndDontAsk(String... permission) {
                    PermissionUtils.toAppSetting(MainActivity.this);
                    Log.i(NativeUtil.TAG,"用户已经拒绝了,并且不希望再出现");
                    params.putInt("code",-2);
                    params.putString("Permission", "用户已经拒绝,并且不希望在询问");
                    if(MainActivity.this.promise!=null){
                        MainActivity.this.promise.resolve(params);
                    }
                    MainActivity.this.permissionList = null;
                }
            });
        }
    }


}
