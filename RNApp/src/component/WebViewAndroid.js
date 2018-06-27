/**
 * Created by wuyunqiang on 2017/9/19.
 */
import React, {Component,PureComponent} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    NativeModules,
    requireNativeComponent,
    Dimensions,
    DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
let WebViewNative = requireNativeComponent('WebViewManager',H5WebView);
export default class H5WebView extends Component {

    static navigationOptions = {
        header:null,
    };

    constructor(props){
        super(props);
        this.state = {
            msg:'test',
        };
    }

    onMessage = (e)=>{
        let params = e.nativeEvent.data;
        Log('WebView onMessage 收到H5参数 ',params);
        params = JSON.parse(params);
        Log('WebView onMessage 收到H5参数 json后 ',params);
    };

    onPageStarted = (e)=>{
        Log('WebView onPageStarted');
    };
    onPageFinished = (e)=>{
        Log('WebView onPageFinished');
    }

    onReceivedTitle = (e)=>{
        Log('WebView onReceivedTitle: ', e.nativeEvent.data);
    }
    onProgressChanged = (e)=>{
        Log('WebView e.nativeEvent.data: ', e.nativeEvent.data);
    }

    render() {
        return (<WebViewNative
            ref={(c) => {this.WebViewNative = c;}}
            style={{flex:1, backgroundColor:'blue'}}
            url={"https://github.com/wuyunqiang"}
            onMessage={this.onMessage} //接收js的数据方法
            onPageStarted={this.onPageStarted}
            onPageFinished = {this.onPageFinished}
            onReceivedTitle = {this.onReceivedTitle}
            onProgressChanged = {this.onProgressChanged}
            postMessage={this.state.msg}//发送给js的数据
        />)
    }
}

WebViewNative.propTypes = {
    ...View.propTypes,
    url: PropTypes.string,
    postMessage:PropTypes.string,
    onMessage:PropTypes.func,
    onPageStarted:PropTypes.func,
    onPageFinished:PropTypes.func,
    onReceivedTitle:PropTypes.func,
    onProgressChanged:PropTypes.func,
};
