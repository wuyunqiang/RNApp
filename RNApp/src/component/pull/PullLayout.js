/**
 * Created by wuyunqiang on 2018/1/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    UIManager,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
    requireNativeComponent,
} from 'react-native';
const ReactNative = require('ReactNative');
import PropTypes from 'prop-types';
var PullLayout = requireNativeComponent('PullLayout', App);
export default class App extends Component {
    constructor(props){
        super(props);
    }

    //数据获取后回调 刷新结束
    finishRefresh = (key)=>{
        Log("结束下拉"+key);
        UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(this),
            UIManager.PullLayout.Commands.FinishRefresh,[key])
    };

    resolve = ()=>{
        this.finishRefresh(this.props.Key);
    };

    onPullRelease = ()=>{
        this.props.onPullRelease(this.resolve)
    };

    render() {
        console.log('PullLayout this.props',this.props);
        return (
            <PullLayout
                method={(this.props.method==1||this.props.method==2)?this.props.method:2}
                ref = {(pull)=>{this.pullLayout = pull}}
                style={[{flex: 1,},this.props.style]}
                EnableOverScrollDrag = {true}
                EnableOverScrollBounce = {false}
                DisableContentWhenRefresh = {false}
                onRefreshReleased={this.onPullRelease}
                {...this.props}
            >
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </PullLayout>
        )
    }
}

PullLayout.propTypes = {
    ...View.propTypes,
    Key:PropTypes.string.isRequired,//必须 否则监听回调可能无法被调用
    method:PropTypes.oneOf([1,2]).isRequired,//使用哪种方式发送消息 1实例方式 2广播消息的方式 Key针对第二种方式
    onRefreshReleased:PropTypes.func,//网络请求加载数据
    EnableOverScrollDrag:PropTypes.bool,//设置是否启用越界回弹
    EnableOverScrollBounce:PropTypes.bool,//设置是否启用越界拖动（仿苹果效果）
    DragRate:PropTypes.number, //显示拖动高度/真实拖动高度（默认0.5，阻尼效果）
    HeaderMaxDragRate:PropTypes.number,//设置下拉最大高度和Header高度的比率（将会影响可以下拉的最大高度）
    HeaderTriggerRate:PropTypes.number,//设置 触发刷新距离 与 HeaderHieght 的比率
    ReboundDuration:PropTypes.number,//设置回弹动画时长
    EnableRefresh:PropTypes.bool,//是否启用下拉刷新（默认启用）
    EnableHeaderTranslationContent:PropTypes.bool,//设置是否启在下拉Header的同时下拉内容
    DisableContentWhenRefresh:PropTypes.bool,//设置是否开启在刷新时候禁止操作内容视图
    EnablePureScrollMode:PropTypes.bool,//设置是否开启纯滚动模式
    EnableNestedScroll:PropTypes.bool,//设置是会否启用嵌套滚动功能（默认关闭+智能开启）
};