package com.rnapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.rnapp.utils.BarUtils;
import com.rnapp.utils.Utils;

public class BaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Utils.init(this.getApplication());
        BarUtils.setStatusBarAlpha(this, 0);
    }
}
