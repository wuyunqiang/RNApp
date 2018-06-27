package com.rnapp.rnview;
import android.graphics.Bitmap;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.CallBackFunction;

import java.util.Map;


/**
 * Created by wuyunqiang on 2017/11/23.
 */

public class WebViewManager extends SimpleViewManager<BridgeWebView> {

    private final String TAG = "WebViewManager";
    BridgeWebView webView;
    ThemedReactContext reactContext;

    @Override
    public String getName() {
        return "WebViewManager";
    }

    @Override
    protected BridgeWebView createViewInstance(final ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        webView =  new BridgeWebView(reactContext);
        webView.setWebChromeClient(webChromeClient);
        webView.setWebViewClient(webViewClient);
        //很重要 fix白屏bug
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
        webView.setLayoutParams(params);
        webView.registerHandler("onMessage", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "js调用原生 " + data);
                WebViewManager.this.dispatchEvent("onMessage",data);
            }
        });
        return webView;
    }


    private void dispatchEvent(String eventName,String data) {

        if (this.reactContext==null) {
            Log.i(TAG, "reactContext==null");
        }else{
            WritableMap params = Arguments.createMap();
            params.putString("data",data);
            this.reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    this.webView.getId(),//实例的ID native和js两个视图会依据getId()而关联在一起
                    eventName,//事件名称
                    params
            );
            //原生模块发送事件
//            this.reactContext
//                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit(eventName, params);
        }
    }


    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onMessage", MapBuilder.of("registrationName", "onMessage"))
                .put("onPageStarted", MapBuilder.of("registrationName", "onPageStarted"))
                .put("onPageFinished", MapBuilder.of("registrationName", "onPageFinished"))
                .put("onReceivedTitle", MapBuilder.of("registrationName", "onReceivedTitle"))
                .put("onProgressChanged", MapBuilder.of("registrationName", "onProgressChanged"))
                .build();
    }

    @ReactProp(name = "url")
    public void setUrl(final BridgeWebView webView,String url) {//设置URL加载路径
        Log.i(TAG,"执行了这里loadUrl: "+url);
        webView.loadUrl(url);
    }


    @ReactProp(name = "postMessage")
    public void postMessage(final BridgeWebView webView,String msg) {//这里setText应该高亮
        Log.i(TAG,"msg: "+msg);
        webView.callHandler("postMessage", msg, new CallBackFunction() {
            @Override
            public void onCallBack(String data) {
                Log.i(TAG, "原生主动调用js 返回的数据 " + data);
            }
        });
    }


    @Override
    public void onDropViewInstance(BridgeWebView view) {//销毁实例执行
        super.onDropViewInstance(view);
    }

    //WebChromeClient主要辅助WebView处理Javascript的对话框、网站图标、网站title、加载进度等
    private WebChromeClient webChromeClient=new WebChromeClient(){
        //不支持js的alert弹窗，需要自己监听然后通过dialog弹窗
        @Override
        public boolean onJsAlert(WebView webView, String url, String message, JsResult result) {
            Log.i(TAG,"onJsAlert:"+message);
            //注意:
            //必须要这一句代码:result.confirm()表示:
            //处理结果为确定状态同时唤醒WebCore线程
            //否则不能继续点击按钮
            return true;
        }

        //获取网页标题
        @Override
        public void onReceivedTitle(WebView view, String title) {
            super.onReceivedTitle(view, title);
            WebViewManager.this.dispatchEvent("onReceivedTitle",title);
//            Log.i(TAG,"网页标题:"+title);
        }


        //加载进度回调
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
//            Log.i(TAG,"加载进度:"+newProgress);
            WebViewManager.this.dispatchEvent("onProgressChanged",""+newProgress);
        }
    };

    private WebViewClient webViewClient=new WebViewClient(){
        @Override
        public void onPageFinished(WebView view, String url) {//页面加载完成
//            Log.i(TAG,"页面加载完成 onPageFinished:"+url);
            WebViewManager.this.dispatchEvent("onPageFinished",url);
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            Log.i(TAG,"页面加载完成 request:"+request);
            Log.i(TAG,"页面加载完成 error:"+error);
            super.onReceivedError(view, request, error);
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {//页面开始加载
//            Log.i(TAG,"页面开始加载 onPageStarted:"+url);
            WebViewManager.this.dispatchEvent("onPageStarted",url);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String urlConection) {
            Log.i(TAG,"拦截url:"+urlConection);
            return false;
        }

    };
}
