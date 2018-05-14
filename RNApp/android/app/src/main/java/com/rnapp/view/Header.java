package com.rnapp.view;

import android.support.annotation.ColorInt;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.bumptech.glide.Glide;
import com.facebook.react.bridge.ReactContext;
import com.rnapp.R;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;
import com.scwang.smartrefresh.layout.util.DensityUtil;

/**
 * Created by wuyunqiang on 2018/1/17.
 */

public class Header extends LinearLayout implements RefreshHeader {
    static final String TAG = "HeaderLayout";
    ImageView pulling;
    ImageView pullrelease;
    ImageView pullok;
    LinearLayout header;
    private ReactContext reactContext;

    public Header(ReactContext context) {
        super(context);
        initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs) {
        super(context, attrs);
        this.initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context);
    }

    private void initView(ReactContext context) {
        this.reactContext = context;
        header = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.header,null);
         pulling = header.findViewById(R.id.pulling);
         pullok = header.findViewById(R.id.pullok);
         pullrelease = header.findViewById(R.id.pullrelease);
        Glide.with(context).asGif()
                .load(R.mipmap.pulling)
                .into(pulling);
        Glide.with(context).asGif()
                .load(R.mipmap.pullrelease)
                .into(pullrelease);
//        pulling.setImageResource(R.mipmap.pulling);
        pullok.setImageResource(R.mipmap.pullok);
//        pullrelease.setImageResource(R.mipmap.pullrelease);
//        pulling.setVisibility(GONE);
//        pullrelease.setVisibility(GONE);
//        pullok.setVisibility(GONE);
//        Glide.with(context).load(R.mipmap.pullok).into(image);
//        header.addView(image);
//        setGravity(Gravity.CENTER);
//        mHeaderText = new TextView(context);
//        mHeaderText.setText("下拉开始刷新");
//        mProgressDrawable = new ProgressDrawable();
//        mArrowView = new PathsView(context);
//        mProgressView = new ImageView(context);
//        mProgressView.setImageDrawable(mProgressDrawable);
//        mArrowView.parserPaths("M20,12l-1.41,-1.41L13,16.17V4h-2v12.17l-5.58,-5.59L4,12l8,8 8,-8z");
//        header.addView(mArrowView, DensityUtil.dp2px(20), DensityUtil.dp2px(20));
//        header.addView(mProgressView, DensityUtil.dp2px(20), DensityUtil.dp2px(20));
//        header.addView(new View(context), DensityUtil.dp2px(20), DensityUtil.dp2px(20));
//        header.addView(mHeaderText, LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
         LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
         params.gravity= Gravity.CENTER;
//        this.setLayoutParams(params);
        this.addView(header,params);
        setMinimumHeight(DensityUtil.dp2px(60));
    }


    @NonNull
    public View getView() {
        return this;//真实的视图就是自己，不能返回null
    }


    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;//指定为平移，不能null
    }
    @Override
    public void onStartAnimator(RefreshLayout layout, int headHeight, int extendHeight) {
//        this.mProgressDrawable.start();//开始动画
    }
    @Override
    public int onFinish(RefreshLayout layout, boolean success) {
//        this.mProgressDrawable.stop();//停止动画
        if (success){
            this.pulling.setVisibility(GONE);
            this.pullok.setVisibility(VISIBLE);
            this.pullrelease.setVisibility(GONE);
//            this.mHeaderText.setText("刷新完成");
        } else {
//            this.mHeaderText.setText("刷新失败");
        }
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                Log.i(TAG,"PullDownToRefresh");
                  this.pulling.setVisibility(VISIBLE);
                  this.pullok.setVisibility(GONE);
                  this.pullrelease.setVisibility(GONE);
                break;
            case Refreshing:
                Log.i(TAG,"Refreshing");
                this.pulling.setVisibility(GONE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(VISIBLE);
                break;
            case ReleaseToRefresh:
                Log.i(TAG,"ReleaseToRefresh");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
        }
    }
    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }
    @Override
    public void onInitialized(RefreshKernel kernel, int height, int extendHeight) {
    }
    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {
    }
    @Override
    public void onPullingDown(float percent, int offset, int headHeight, int extendHeight) {
        Log.i(TAG,"onPullingDown");
//        Log.i(TAG,"percent"+percent);
//        Log.i(TAG,"offset"+offset);
//        Log.i(TAG,"headHeight"+headHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void onReleasing(float percent, int offset, int headHeight, int extendHeight) {
        Log.i(TAG,"onReleasing");
//        Log.i(TAG,"percent"+percent);
//        Log.i(TAG,"offset"+offset);
//        Log.i(TAG,"headHeight"+headHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void onRefreshReleased(RefreshLayout layout, int headerHeight, int extendHeight) {

//        Log.i(TAG,"headHeight"+headerHeight);
//        Log.i(TAG,"extendHeight"+extendHeight);
    }
    @Override
    public void setPrimaryColors(@ColorInt int ... colors){
    }


}
