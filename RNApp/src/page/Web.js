import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    WebView,
    Image

} from 'react-native';
import BasePage from '../base/BasePage'
import Header from '../component/Header'
export default class Web extends BasePage {
    static navigationOptions = (nav)=>{
        return {
            header:({navigation}) =>{
                let {state:{routes}} = navigation;
                console.log('BasePage.routes',routes);
                let goBack = routes[routes.length-1].params&&routes[routes.length-1].params.goBack;
                let title = routes[routes.length-1].params&&routes[routes.length-1].params.title;
                return <Header
                    navigation = {navigation}
                    renderLeftView={() => {
                        return (<View style={{flexDirection:'row',alignItems:'center',height:SCALE(0.767 *75 )}}>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                goBack&&goBack();
                            }}>
                                <Image style={{width: SCALE(22), height: SCALE(42), marginLeft: SCALE(20),marginRight:SCALE(10)}}
                                       source={AppImages.Common.back}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginLeft:SCALE(20)}}activeOpacity={1} onPress={() => {
                                navigation.goBack(null);
                            }}>
                                <Image style={{width: SCALE(38), height: SCALE(38), marginLeft: SCALE(20)}}
                                       source={AppImages.Common.close}/>
                            </TouchableOpacity>
                        </View>)
                    }}
                    centerTxt = {title}/>;
            },
        }
    };

    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
            flag: true,
            title: '',
            destinationUrl:null,
        }
        this.webviewParams = {};
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({goBack:this.goBack,title:'Web'});
    }

    //header 返回
    goBack = ()=>{
        if(this.webviewParams.canGoBack){
            this.web&&this.web.goBack();
            return;
        }
        this.props.navigation.goBack(null);
    };
    //android物理返回键
    onBackAndroid = (params) => {
        if (this.state.visible) {
            this.setState({
                visible: false,
            });
            return true;
        }
        Log("testhahahahahahahhaf");
        if(this.webviewParams.canGoBack){
            Log("this.webviewParams",this.webviewParams);
            this.web&&this.web.goBack();
            return true;
        }
        this.props.navigation.goBack(null);
        return true;
    }


    onNavigationStateChange =(e)=> {
        this.webviewParams = e;
        this.props.navigation.setParams({goBack:this.goBack,title: e.title});
    }


    //ios 刷新页面
    refresh = ()=>{
        this.setState({
            flag:!this.state.flag,
        })
    };

    onLoadStart = (navState)=>{
        Log('WebView navState 相等：',navState.nativeEvent.url)
    };

    onError = (e)=>{
        Log('WebView onError 页面加载出错 ：',e.nativeEvent)
    };

    //接收来自H5的消息
    onMessage = (e)=>{
        Log('WebView onMessage 收到H5参数：',e.nativeEvent.data);
        let params = e.nativeEvent.data;
        alert(params)
        params = JSON.parse(params);
        if(params.code==1){
            this.setState({
                destinationUrl:params.url,
            })
        }

        Log('WebView onMessage 收到H5参数 json后：',params);
    };

    onLoadEnd =(e)=>{
        Log('WebView onLoadEnd e：',e.nativeEvent);
        let data = {
            source:'from rn',
        };
        // this.web&&this.web.postMessage(JSON.stringify(data));
    };

    renderPage(){
        return (<View style={{flex: 1, backgroundColor: 'white'}}>
                <WebView
                    nativeConfig={
                        {
                            props: {
                                backgroundColor: '#ffffff',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        }
                    }
                    userAgent='MyApp'
                    ref={(webview) => {
                        this.web = webview
                    }}
                    style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                    source={this.state.destinationUrl?{uri: this.state.destinationUrl}:require('../data/testwebview.html')}
                    onLoadStart={this.onLoadStart}
                    // domStorageEnabled={true}
                    // mixedContentMode={'always'}//指定混合内容模式。即WebView是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,never,always,compatibility
                    onLoadEnd={this.onLoadEnd}//加载成功或者失败都会回调
                    onError={this.onError}
                    onMessage={this.onMessage}
                    // injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
                    // scalesPageToFit = {false}
                    javaScriptEnabled={true}//指定WebView中是否启用JavaScript
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={true} //强制WebView在第一次加载时先显示loading视图
                    // bounces={true}//指定滑动到边缘后是否有回弹效果。
                    // scrollEnabled={true}//是否启用滚动
                    // renderLoading={this.renderLoad}//返回一个加载指示器
                    renderError={(e) => {
                        Log("WebView renderError e", e);
                        if (e == "NSURLErrorDomain") {
                            Log("e NSURLErrorDomain", e);
                            return <View
                                style={{width: "100%", height: "100%", justifyContent: 'center', alignItems: "center"}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.refresh}>
                                    <Text style={{fontSize: 16, color: "#333333",}}>无法连接 {this.state.destinationUrl}</Text>
                                </TouchableOpacity>
                            </View>
                        } else if (e == "WebKitErrorDomain") {
                            Log("e WebKitErrorDomain", e);
                            return null;
                        }
                        return <View/>;
                    }}
                />
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width:257,
        height:255,
        marginTop:SCALE(50)
    }
});


