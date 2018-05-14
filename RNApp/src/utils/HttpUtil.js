/**
 * Created by wuyunqiang on 2018/1/24.
 */
import {DeviceEventEmitter, Alert, NetInfo, NativeModules,Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import Toast from 'react-native-root-toast';
const HOST = 'http://sit1-apis.qianbao.com/';//测试环境
// const HOST =  'http://long-apis.qianbao.com'//生产环境
// const HOST = 'http://dev-apis.qianbao.com/' //开发环境
const baseParams = {
    'credentials': 'include',//手动添加cookier
    'Accept': 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',

    // ...others  //自己配置需要的参数
};
const TIMEOUT = 30000;
const CONFIG = {timeout:TIMEOUT,followRedirects:false};
export default class HttpRequest {
    static token;
    static flag = true;
    static NetFlag = true;
    //监听网络连接状态
    static async checkNet(){
        let data = false;
        let isNet ={};
        if(HttpRequest.NetFlag){
            HttpRequest.NetFlag = false;
            isNet = await fetch("https://www.baidu.com").then((res)=>{
                Log('有网络',res);
                HttpRequest.NetFlag = true;
                return true;
            }).catch((err)=>{
                Log('没有网络',err);
                HttpRequest.showToast('没有网络');
                setTimeout(()=>{HttpRequest.NetFlag = true;},3000);
                return false;
            });
            return isNet;
        }
    };

    static showToast(msg){
        Toast.show(msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: false,
            delay: 0
        });
    }

    static async GET(url,headers) {
        Log('url',HOST+url);
        let res = await RNFetchBlob.config({fileCache:true,...CONFIG}).fetch('GET',HOST+url,{
            ...baseParams,
            ...headers
        }).then((res)=>{
            Log('res.json',res.json());
            return res.json();
        }).catch(async (err) => {
            if (err.message.indexOf('timed out') >= 0) {
                HttpRequest.showToast('请求超时');
                return false;
            }
            if(err.message.indexOf('JSON') >= 0) {
                HttpRequest.showToast(err.message);
                return false;
            }
            let check = await HttpRequest.checkNet();
            if (!check) {
                return false;
            }
            HttpRequest.showToast(err.message);
            Log('其他错误',err.message);
            return false;
        });
        Log('res',res);
        HttpRequest.emitData(res);
        return res;
    }

    static async POST(url, params, headers) {
        Log('url', HOST + url);
        Log('明文对象params', params);
        // let p1 = HttpRequest.ToQueryString(params);
        let p1 = JSON.stringify(params);
        // Log('明文字符串params', p1);
        let p2 = HttpRequest.encrypt(p1);
        let p3 = {content:p2};
        // Log('加密后params', p2);
        let h = {
            ...baseParams,
            token:HttpRequest.token,
            ...headers
        };
        Log('header',h);
        let res = await RNFetchBlob.config(CONFIG).fetch('POST', HOST + url, h, JSON.stringify(p3))
            .uploadProgress((written, total) => {
                Log('uploaded', written / total)
            })
            // listen to download progress event
            .progress((received, total) => {
                Log('progress', received / total)
            })
            .then((res) => {
                Log('res.json', res.json());
                return res.json();
            }).catch(async (err) => {
                Log('err',err);
                if(err.message.indexOf('timed out') >= 0) {
                    HttpRequest.showToast('请求超时');
                    return false;
                }
                if(err.message.indexOf('Unexpected') >= 0) {
                    HttpRequest.showToast(err.message);
                    return false;
                }
                let check = await HttpRequest.checkNet();
                if (!check) {
                    return false;
                }
                HttpRequest.showToast(err.message);
                Log('其他错误',err.message);
                return false;
            });
        return res;
    }

    static emitData(res){
        //这里可以验证cookie是否到期
        // if(res.message.indexOf('登录')>-1){
        //     if(HttpRequest.flag){
        //         HttpRequest.flag = false;
        //         Log('丢失cookie跳到登录页面');
        //         DeviceEventEmitter.emit('data', 'Login');
        //         setTimeout(()=>{HttpRequest.flag = true;},2000)
        //     }
        // }
    }


    static ToQueryString(obj) {
        return obj
            ? Object
                .keys(obj)
                .sort()
                .map(function (key) {
                    var val = obj[key];
                    if (Array.isArray(val)) {
                        return val
                            .sort()
                            .map(function (val2) {
                                // return ""+key + '=' + val2;
                                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                            })
                            .join('&');
                    }

                    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
                    // return ""+key + '=' + val;
                })
                .join('&')
            : '';


    }
}
global.HttpUtil = HttpRequest;