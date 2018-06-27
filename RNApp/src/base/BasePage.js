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
    DeviceEventEmitter,
    StatusBar,
    InteractionManager,
    NativeModules
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import ModalUtil from '../utils/ModalUtil'
import Toast from "react-native-root-toast";
import Status from '../utils/Status'
import Header from '../component/Header'
import * as Style from '../style';

global.Style = Style;
// import SplashScreen from "react-native-splash-screen";
// import CodePush from 'react-native-code-push';
type Props = {};

export default class BasePage extends Component<Props> {
    static Navigation_routers;
    static navigationOptions = (nav)=>{
        let state =  nav.navigation.state;
        let {state:{routes}} = nav.navigation;
        // BasePage.Navigation_routers = routes;
        // console.log('BasePage.Navigation_routers',BasePage.Navigation_routers);
        // console.log('BasePage.nav',nav);
        return {
            header:({navigation}) =>{
                let {state:{routes}} = navigation;
                BasePage.Navigation_routers = routes;//获取路由站必须放到这里
                let title = routes[routes.length-1].params&&routes[routes.length-1].params.title;
                console.log('BasePage.routes',routes);
                return <Header navigation = {navigation} centerTxt = {title}/>;
            },
        }
    };

    render(){
        return <View style={{flex:1,backgroundColor:'transparent'}}>
            {this.renderNonNetWork()}
            {this.renderModal(this.state.loading?this.renderLoading:this.contentView,this.state.visible,this.state.customerlayout,'fade')}
            {this.renderPage&&this.renderPage()}
        </View>
    }

    //声明周期回调********************************************************************************************
    constructor(props) {
        super(props);
        this.BaseState = {
            flag:true,
            isNet:true,
            visible:false,
            loading:false,
            customerlayout:{justifyContent:'center',alignItems:'center',backgroundColor:'red'}
        };
        NetInfo.addEventListener('connectionChange', this.HandleConnectivityChange);

    }

    componentDidMount() {
        this.isLogin = DeviceEventEmitter.addListener('isLogin',(data)=>{
            Log('DeviceEventEmitter data',data);
            this.loginCallBack(data)
        });
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        // SplashScreen.hide();
        // this.readFile()
    }


    //清除缓存
    clearData(){
        CLEAR_All();
        HttpUtil.token = null;
    }

    readFile(){
        InteractionManager.runAfterInteractions(()=>{
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange');
        this.isLogin&&this.isLogin.remove()
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
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
                Log('执行了这里 返回'+PageName+":",routers[i].key);
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
        // let NoTokenPage = [];
        // for(let i=0;i<NoTokenPage.length;i++){
        //     if(page==NoTokenPage[i]){
        //         this.props.navigation.navigate(page,params);
        //         return;
        //     }
        // }
        this.props.navigation.navigate(page,params);
    }

    /***
     * 可以重定向到tab的某个页面
     * ***/
    reset(page,params={}){
        let tab = [];
        let routeName = page;
        for(let i=0;i<tab.length;i++){
            if(page==tab[i]){
                routeName = 'Index';
                break;
            }
        }
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate(
                    {
                        index: 0,
                        routeName: routeName,
                        action: NavigationActions.navigate({routeName:page,params:params})
                    }
                )
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }


    //全局可覆盖
    loginCallBack(res){
        Log('callback res',res)
    };

    /***
     * 请求失败默认弹出弹框
     * 显示失败信息
     * ***/
    async HttpPost(url,params,headers,NoloadingAfter,NoloadingBefore){
        if(!NoloadingBefore){
            this.setState({
                customerlayout:{justifyContent:'center',alignItems:'center',backgroundColor:'transparent'},
                visible:true,
                loading:true,
            });
        }

        let res = await HttpUtil.POST(url,params,headers);
        Log('网络请求获取数据BasePage HttpPost',res);
        if(!res||res.status&&res.status!=Status.SUCC){//失败显示错误信息
            if(!res){//网络请求失败
                if(!NoloadingAfter){
                    Log('NoloadingAfter 执行这里 loading 消失');
                    this.setState({
                        visible:false,
                        loading:false,
                        customerlayout:{justifyContent:'center',alignItems:'center'},
                    });
                }
                return;
            }
            if(res.status==Status.ERROR_login_no){//token失效 跳到登录页面 然后重新登录
                this.setState({
                    visible:false,
                    loading:false,
                    customerlayout:{justifyContent:'center',alignItems:'center'},
                });
                this.props.navigation.navigate('Login');
                return false;
            }
            this.setState({
                loading:false,
                visible:true,
                msg:res.message,
                customerlayout:{justifyContent:'center',alignItems:'center'},
            });
            return false;
        }
        if(!NoloadingAfter){
            Log('NoloadingAfter 执行这里 loading 消失');
            this.setState({
                visible:false,
                loading:false,
                customerlayout:{justifyContent:'center',alignItems:'center'},
            });
        }
        //成功没有res 里面没有status(一般情况下)
        return res;
    }

    /***
     * 安卓返回键监听
     *
     * ***/
    onBackAndroid = (params) => {
        if(this.state.visible){
            this.setState({
                visible:false,
            })
            return true;
        }
        Log("testhahahahahahahhaf");
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
            Log("CodePush status",status);
        },(progress)=>{
            Log("CodePush progress",progress)
        },(update)=>{
            Log("CodePush update",update)
        });
    }

    /**
     *监听网络变化回调
     * */
    HandleConnectivityChange = (status) =>{
        let type =""+status.type;
        Log('status change:' , type);
        if (type.toLowerCase() == 'none'||type.toLowerCase() == 'unknown'){
            if(this.state.isNet){
                Log('handleConnectivityChange 执行了这里没有网络hahahhahaha');
                this.setState({
                    isNet:false,
                },()=>{
                    this.props.navigation.setParams({tabBarVisible:this.state.isNet});
                })
            }
        }else{
            Log('HandleConnectivityChange this.state',this.state)
            if(!this.state.isNet){
                Log('handleConnectivityChange 执行了这里有网络');
                this.setState({
                    isNet:true,
                },()=>{
                    this.props.navigation.setParams({tabBarVisible:this.state.isNet});
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
                Log("执行了这里延迟执行函数");
                todo&&todo()
            }
        });
    }

    Test(...parmas){
        Base.ShowToast("调用了Base方法");
        this.setState({
            h:"hahah"
        },()=>{
            Log('this.state',this.state)
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
        Log('判断是否有网络isNet',isNet);
        if(isNet.status=200){
            if(!this.state.isNet){
                Log('执行了这里有网络');
                this.setState({
                    isNet:true,
                });
            }
            Log('有网络',isNet);
            return true;
        }else{
            if(this.state.isNet){
                Log('执行了这里没有网络hahahhahaha');
                this.setState({
                    isNet:false,
                });
            }
            return false;
        }
    };


    //显示对话框
    showDialog =(msg) =>{
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
                Log('data',data);
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
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
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
            <Text style={{color:Color.fontColor,fontSize:FONT(18)}} note >{"努力加载中..."}</Text>
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
                    source={AppImages.Common.nodata}/>
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
                        <Text style={{fontSize:FONT(0.53 * 75 / 2),color:Color.fontColor}}>{this.state.msg}</Text>
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
