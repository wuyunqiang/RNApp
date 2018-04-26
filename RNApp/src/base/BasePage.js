/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    NetInfo,
    StatusBar,
    InteractionManager,
    NativeModules
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import ModalUtil from '../utils/ModalUtil'
import Toast from "react-native-root-toast";
import SplashScreen from "react-native-splash-screen";
import CodePush from 'react-native-code-push';
import URL from "../utils/Constant";
type Props = {};
export default class Base extends Component<Props> {

    render(){
        return <View style={{width:'100%',height:'100%'}}>
            {this.renderNonNetWork()}
            {this.renderPage&&this.renderPage()}
            {this.renderModal(this.contentView,this.state.visible,{justifyContent:'center',alignItems:'center'},'fade')}
        </View>
    }

    //声明周期回调********************************************************************************************
    constructor(props) {
        super(props);
        this.BaseState = {
            flag:true,
            isNet:true,
            url: "http://m.nnshandai.com",
            visible:false,
        };
        NetInfo.addEventListener('connectionChange', this.HandleConnectivityChange);
    }

    componentDidMount() {
        if(Platform.OS==='android'){
            // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        SplashScreen.hide();
        this.readFile()
    }

    readFile(){
        InteractionManager.runAfterInteractions(()=>{
            READ_CACHE('token',(res)=>{
                res?HttpUtil.token = res:null;
                console.log('HttpUtil.token',HttpUtil.token)
            },(err)=>{
                console.log('缓存文件读取token 错误',err)
            });

            READ_CACHE('userinfo',(res)=>{
                res? CacheData.userinfo = res:null;
                console.log('CacheData.userinfo',CacheData.userinfo)

            },(err)=>{
                console.log('缓存文件读取userinfo 错误',err)
            })
            READ_CACHE('securityLevel',(res)=>{
                res? CacheData.securityLevel = res:null;
                console.log('CacheData.securityLevel',CacheData.securityLevel)

            },(err)=>{
                console.log('缓存文件读取securityLevel 错误',err)
            })
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange');
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this.OnBackAndroid);
        }
    }
    //声明周期回调结束********************************************************************************************


    //各种事件函数处理********************************************************************************************
    /**
     * 不传任何参数或者不传路由 默认返回上一个页面
     * react navigation返回任意页面
     * */
    goBackPage(PageName,routers){
        if(!routers){
            this.props.navigation.goBack(null);
            return;
        }
        for(let i=0;i<routers.length;i++){
            if(routers[i].routeName==PageName){
                if(i+1==routers.length){
                    this.props.navigation.goBack(null);
                    return;
                }
                console.log('执行了这里 返回'+PageName+":",routers[i].key);
                this.props.navigation.goBack(routers[i+1].key);
                return;
            }
        }
    };

    /***
     * 验证是否登录
     * 验证token失效
     * **/
    navigate(page,params){
        if(!HttpUtil.token){
            //没有登录显示登录页面
        }
        this.props.navigation.navigate(page,params);
    }

    /***
     * 可以重定向到tab的某个页面
     * ***/
    reset(page,params={}){
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate(
                    {
                        index: 0,
                        routeName: 'Index',
                        action: NavigationActions.navigate({routeName:page,params:params})
                    }
                   )
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }


    /***
     * 请求失败默认弹出弹框
     * 显示失败信息
     * ***/
    async HttpPost(url,params,headers){
        let res = await HttpUtil.POST(url,params,headers);
        if(res.status&&res.status!="20000000"){//失败显示错误信息
            this.setState({
                visible:true,
                msg:res.message,
            });
            return false;
        }
        //成功没有res 里面没有status(一般情况下)
        return res;
    }

    /***
     * 安卓返回键监听
     *
     * ***/
    OnBackAndroid = (params) => {
        console.log("testhahahahahahahhaf");
        return false;
    };


    /***
     * 初始化codepush
     *
     * ***/
    InitCodePush(){
        CodePush.sync({
            // updateDialog: {
            //     appendReleaseDescription:false,
            //     descriptionPrefix:'更新内容:',
            //     mandatoryContinueButtonLabel:'更新',
            //     mandatoryUpdateMessage:'好贷宝有新版本了，请您及时更新',
            //     optionalInstallButtonLabel: '立即更新',
            //     optionalIgnoreButtonLabel: '稍后',
            //     optionalUpdateMessage:'好贷宝有新版本了，是否更新？',
            //     title: '提示'
            // },
            installMode: CodePush.InstallMode.IMMEDIATE
        },(status)=>{//先返回现在的版本再返回将要更新的版本
            console.log("CodePush status",status);
        },(progress)=>{
            console.log("CodePush progress",progress)
        },(update)=>{
            console.log("CodePush update",update)
        });
    }

    /**
     *监听网络变化回调
     * */
    HandleConnectivityChange = (status) =>{
        let type =""+status.type;
        console.log('status change:' , type);
        if (type.toLowerCase() == 'none'||type.toLowerCase() == 'unknown'){
            if(this.state.isNet){
                console.log('handleConnectivityChange 执行了这里没有网络hahahhahaha');
                this.setState({
                    isNet:false,
                })
            }
        }else{
            console.log('HandleConnectivityChange this.state',this.state)
            if(!this.state.isNet){
                console.log('handleConnectivityChange 执行了这里有网络');
                this.setState({
                    isNet:true,
                })
            }
        }
    }

    /**
    *做一些延迟事情 优化函数
    * */
    DoSomething(todo){
        InteractionManager.runAfterInteractions(()=>{
            if(typeof(todo) =='function'){
                console.log("执行了这里延迟执行函数");
                todo&&todo()
            }
        });
    }

    Test(...parmas){
        Base.ShowToast("调用了Base方法");
        this.setState({
            h:"hahah"
        },()=>{
            console.log('this.state',this.state)
        })
    }


    /***
     * 弹窗关闭
     * ***/
    close=()=>{
        this.setState({
            visible:false,
        })
    }

    /**
     * 弹框点击确定按钮
     * ***/
    confirm=()=>{
        this.setState({
            visible:false,
        })
    };

    /**
     *判断是否有网络
     * */
    IsConnNet = async()=>{
        let isNet = await fetch("https://www.baidu.com");
        console.log('判断是否有网络isNet',isNet);
        if(isNet.status=200){
            if(!this.state.isNet){
                console.log('执行了这里有网络');
                this.setState({
                    isNet:true,
                });
            }
            console.log('有网络',isNet);
            return true;
        }else{
            if(this.state.isNet){
                console.log('执行了这里没有网络hahahhahaha');
                this.setState({
                    isNet:false,
                });
            }
            return false;
        }
    };


    //显示对话框
    showDialog = (msg)=>{
        if(typeof msg ==='string'){
            this.setState({
                visible:true,
                msg:msg,
            })
        }
        if(typeof msg ==='object'){
            this.setState({
                visible:true,
                msg:msg.message,
            })
        }
    }

    //生成图形验证码图片
     async GenerateCodeImage(phoneNo,type){
        let params = {
            phoneNo:phoneNo,
            type:type,
        };
        let res = await HttpUtil.POST(URL.generateCode,params);
        if(res.status){//请求失败
            Base.ShowToast(res.info);
        }else{
            if(Platform.OS=='android'){
                let data = await NativeModules.NativeUtil.VerifyImage(res.generateCode);//获取base64格式的图片
                console.log('data',data);
                this.setState({
                    verifyImage:'data:image/png;base64,'+data.base64,
                    generateCode:res.generateCode,
                })
            }else{
                let NativeUtil  = NativeModules.NativeUtil;
                NativeUtil.getBase64Image(res.generateCode).then((code)=>{
                    this.setState({
                        verifyImage:code,
                        generateCode:res.generateCode,
                    })
                }).catch((error)=>{
                    this.setState({
                        generateCode:res.generateCode,
                    })
                })
            }

        }
    };



    //各种事件函数处理结束********************************************************************************************



    //绘制各种UI****************************************************************************************************
    /*
    *显示Toast
    * */
    static ShowToast(msg){
        Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: false,
            delay: 0
        });
    }

    /**
     *显示loading
     * */
    renderLoading(){
        return (<View style={{width:"100%",height:"100%",justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator animating size="large" color={'#FF6347'}/>
            <Text note >{"努力加载中..."}</Text>
        </View>)
    }

    /**
     *无网络视图
     * */
    renderNonNetWork(){
        if(!this.state.isNet){
            return (<View  style={{width:'100%',height:'100%',backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width:229, height:141}}
                    source={AppImages.Web.nonet}/>
                <Text style={{fontSize:16,color:"#333333",marginTop:50,marginBottom:60,}}>网络无法刷新，请检查您的网络</Text>
                <TouchableOpacity style={{width:258,height:35,justifyContent:'center', alignItems:'center'}}
                                  activeOpacity={0.8}
                                  onPress={this.IsConnNet}>
                    <View style={{width:258,height:35,backgroundColor:'#0094ff',borderRadius:30, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:"white",fontSize:20}}>重新加载</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }
        return null;
    }


    /**
     *显示弹框内容
     * */
    contentView = ()=>{
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{width:'80%',height:SCALE(232),borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}
                onPress={()=>{}}>
                <View
                    style={{width:'80%',height:SCALE(232),borderRadius:10,justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
                    <View>
                        <Text style={{fontSize:FONT(0.53 * 75 / 2),color:'#b7b9c5'}}>{this.state.msg}</Text>
                    </View>
                    <TouchableOpacity onPress={this.confirm}>
                        <View
                            style={{width:SCALE(120),height:SCALE(50),borderRadius:10,backgroundColor:'#0094ff',justifyContent:'center',
                                alignItems:'center'}}>
                            <Text style={{fontSize:FONT(0.53 * 75 / 2),color:'white'}}>确定</Text></View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>)
    };

    /**
     *显示弹出框
     * */
    renderModal(contentView, visible, customerlayout,animation){
        return <ModalUtil
            visible={visible}
            close={this.close}
            contentView={contentView?contentView:this.contentView}
            animation={animation}
            customerlayout={customerlayout}
        />
    }

    renderStatusBar(params){
        return (<StatusBar backgroundColor={'red'} barStyle={'default'}/>)
    }

    //绘制各种UI********************************************************************************************

}
