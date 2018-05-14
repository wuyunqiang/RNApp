package com.rnapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rnapp.rnmodules.NativeUtil;
import com.rnapp.rnview.PopModalManager;
import com.rnapp.rnview.PullLayout;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xq on 18/4/17.
 */

public class RNPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList();
        modules.add(new NativeUtil(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        views.add(new PullLayout());
        views.add(new PopModalManager());
        return views;
    }
}
