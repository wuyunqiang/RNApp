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
    InteractionManager
} from 'react-native';
import Toast from "react-native-root-toast";

export default class Base extends Component{

    render(){
        return <View style={{width:'100%',height:'100%'}}>
            {this.renderNonNetWork()}
            {this.renderPage&&this.renderPage()}
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
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
    }

    componentWillUnMount() {
        NetInfo.removeEventListener('connectionChange');
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this.OnBackAndroid);
        }
    }

    //声明周期回调结束********************************************************************************************


    //各种事件函数处理********************************************************************************************
    //react navigation返回任意页面
    goBackPage(routers,PageName){
        console.log('全局路由routers',routers);
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

    OnBackAndroid = (params) => {
        console.log("testhahahahahahahhaf");
        return false;
    };

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
        this.ShowToast("调用了Base方法");
    }

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
    //各种事件函数处理结束********************************************************************************************



    //绘制各种UI****************************************************************************************************
    /*
    *显示Toast
    * */
    ShowToast(msg){
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

    close=()=>{
        this.setState({
            visible:false,
        })
    }

    /**
     *显示弹出框
     * */
    // renderModal(contentView, visible, customerlayout,animation){
    //     return <ModalUtil
    //         visible={visible}
    //         close={this.close}
    //         contentView={contentView}
    //         animation={animation}
    //         customerlayout={customerlayout}
    //     />
    // }

    renderStatusBar(params){
        return (<StatusBar backgroundColor={'red'} barStyle={'default'}/>)
    }

    //绘制各种UI********************************************************************************************

}
