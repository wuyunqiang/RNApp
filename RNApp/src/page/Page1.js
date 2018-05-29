import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Linking,
    View,
    Dimensions,
    Animated,
    Easing,
    ScrollView,
    PanResponder,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Platform,
    NativeModules,
    ImageBackground,
    InteractionManager,
    TouchableHighlight,
} from 'react-native';
let n = 10;
var a = 20;
import {PullScroll} from '../component/pull'
import BaseComponent from '../base/BasePage'
import Register from "./Page4";
export default class Page1 extends BaseComponent {
    static Navigation_routers;
    static navigationOptions = {
        header:({navigation}) =>{
            let {state:{routes}} = navigation;
            Page1.Navigation_routers = routes;
            return null;
        }
    };
    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({login:this.goToLogin})
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.debug('didBlur', payload);
                console.log('Page1.Navigation_routers',  Page1.Navigation_routers)
            }
        );
    }

    componentWillUnMount() {
        super.componentWillUnMount()
        this.timer&&clearTimeout(this.timer);
    }

    // getBase64= async()=>{
    //     console.log("this.timer",this.timer);
    //    let data = await NativeModules.NativeUtil.VerifyImage("1as4")
    //    console.log("data",data);
    //     this.setState({
    //         url:"data:image/png;base64,"+data.base64
    //     })
    // };

    test=()=>{
        console.log('a',a);
         //箭头函数内部指向class
        console.log('test this',this);
        let obj={
            f1:function () {
                console.log('obj f1 this',this);
                function f() {
                    console.log('obj f this',this);
                }
                f();   //函数的嵌套不存在this的继承 内部test和外部foo 相互独立 因此内部test全局对象 外部foo指向obj对象
                this.f2(); //方法的嵌套是可以继承this的 即内部的方法可以继承外部方法的this
            },
           f2:function () {
                console.log("obj f2 this",this)
            }
        }
        obj.f1();
    };

    test2(){
        //不是箭头函数 指向调用它的对象这里为touch组件
        this.a = 'test'
        console.log('page1 this',this);
        f3();//内嵌的函数不存在this的继承关系 因此调用Hi3的是全局对象
        // this.countdown();//报错
    }


    countdown(){
         this.timer&&clearTimeout(this.timer);
         this.timer = setTimeout(()=>{
            console.log('count:',n--);
             console.log('this.timer:',this.timer);
            if(n<=0){
               this.timer&&clearTimeout(this.timer);
            }else{
                this.countdown();
            }
        },1000)
    }

    Hi(){
        console.log('Hi this',this);
        this.Hi2();
        function Hi3() {
            console.log('Hi3 this',this);
        }
        Hi3();
    }

    Hi2(){
        console.log('Hi2 this',this);
    }


    goToPage = ()=>{
        this.props.navigation.navigate('Page3');
    }

    onPullRelease = async(resolve)=>{
        try {
            setTimeout(()=>{
                resolve&&resolve();
            },4000)

        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };

    renderPage(){
        return (
            <PullScroll
                Key={'PullScroll'}
                Android_Native={true}
                onPullRelease={this.onPullRelease}
                contentContainerStyle={{alignItems: 'center',}}
                style={{flex: 1,}}>
                <TouchableOpacity style={styles.touchstyle} activeOpacity={0.7} onPress={this.goToPage}>
                    <View style={styles.viewstyle}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>这是第一页</Text>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>跳转到Page2</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchstyle} activeOpacity={0.7}>
                    <View style={styles.viewstyle}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>获取base64</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchstyle} activeOpacity={0.7} onPress={this.test}>
                    <View style={styles.viewstyle}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>test</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchstyle} activeOpacity={0.7} onPress={this.test2}>
                    <View style={styles.viewstyle}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>test2 this指向touch组件</Text>
                    </View>
                </TouchableOpacity>

                <View style={{marginTop:SCALE(20),width:WIDTH,height:SCALE(300),backgroundColor:Color.C777777}}/>
                <View style={{marginTop:SCALE(20),width:WIDTH,height:SCALE(300),backgroundColor:Color.C777777}}/>
                <View style={{marginTop:SCALE(20),width:WIDTH,height:SCALE(300),backgroundColor:Color.C777777}}/>
                <View style={{marginTop:SCALE(20),width:WIDTH,height:SCALE(300),backgroundColor:Color.C777777}}/>

                <View style={{marginTop:SCALE(20),width:WIDTH,height:SCALE(300),backgroundColor:Color.C777777}}/>

            </PullScroll>
        )
    }
}
function f3() {
    console.log('f3 this',this);//全局对象
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            width: 257,
            height: 255,
            marginTop: SCALE(50)
        },
        touchstyle: {
            width: WIDTH - SCALE(40) - SCALE(40),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: SCALE(40),
            marginRight: SCALE(40),
            marginTop: SCALE(100),
        },
        viewstyle: {
            width: WIDTH - SCALE(40) - SCALE(40),
            borderRadius: 24,
            height: SCALE(96),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0094ff'
        }
    }
);


