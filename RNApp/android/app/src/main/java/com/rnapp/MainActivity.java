package com.rnapp;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.ColorInt;
import android.support.annotation.Nullable;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.rnapp.utils.BarUtils;
import com.rnapp.utils.Utils;

public class MainActivity extends ReactActivity {

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


}
