package com.rnapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.rnapp.utils.BarUtils;
import com.rnapp.utils.Utils;

public class NativeActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native);
        BarUtils.setNavBarVisibility(this,false);
    }
}
