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
import {PullScroll} from '../component/pull'
import Icon from 'react-native-vector-icons/FontAwesome';
import BasePage from '../base/BasePage'
export default class HomePage extends BasePage {

    static navigationOptions = (nav)=>{
        let state =  nav.navigation.state;
        let tabBarVisible = state.params&&state.params.tabBarVisible;

        return {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor,focused}) => (
                <Icon name="home" size={30} color={tintColor} />
            ),
            tabBarVisible:tabBarVisible,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
            bFlag:true,
            sNum:"",
            oPerson:{},
        }
    }

    componentDidMount(){
        super.componentDidMount();
        var s = "Th,e ra,in i,n Sp,ain fa,lls mai,nly in the pla,in.";
        // 在每个空格字符处进行分解。
        ss = s.split(" ");
        var arr = [];
        console.log(ss);
        for(let i=0;i<ss.length;i++){
            let temp = ss[i].split(",");
            arr.push(...temp);
        }
        console.log('arr',arr)
    }


    type(obj) {
        let class2type = {};
        // 生成class2type映射
        "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
            class2type["[object " + item + "]"] = item.toLowerCase();
        })

        // 一箭双雕 undefined null 值相等 类型不等
        if (obj == null) {
            return obj + "";
        }

        // 优先ES6方法判断数组类型
        if(Array.isArray(obj)){
            return "array"
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }





    goToPage = ()=>{
        this.props.navigation.navigate('Page3');
    };

    onPullRelease = async(resolve)=>{
        try {
            setTimeout(()=>{
                resolve&&resolve();
            },2000)

        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };


    renderPage(){
        return (
            <PullScroll
                Key={'HomePage'}
                Android_Native={true}
                onPullRelease={this.onPullRelease}
                contentContainerStyle={{alignItems: 'center',}}
                showsVerticalScrollIndicator={false}
                style={{flex: 1,backgroundColor:'transparent'}}>

                <TouchableOpacity style={[styles.itemStyle]} onPress={this.goToPage}>
                    <Text style={styles.textStyle}>这是HomePage</Text>
                    <Text style={styles.textStyle}>跳转到Page2</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} activeOpacity={0.7} onPress={()=>super.navigate('Web')}>
                    <Text style={styles.textStyle}>gotoWebview</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity style={[styles.itemStyle]} activeOpacity={0.7} onPress={()=>super.navigate('WaterFall')}>*/}
                    {/*<Text style={styles.textStyle}>瀑布流</Text>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity style={styles.itemStyle} activeOpacity={0.7} onPress={()=>Platform.OS==='android'? super.navigate('WebAndroid'):null}>
                    <Text style={styles.textStyle}>原生webview WebAndroid</Text>
                </TouchableOpacity>


                <View style={styles.itemStyle}/>
                <View style={styles.itemStyle}/>
                <View style={styles.itemStyle}/>
            </PullScroll>
        )
    }
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
            marginBottom: SCALE(100),
        },
        viewstyle: {
            width: WIDTH - SCALE(40) - SCALE(40),
            borderRadius: 24,
            height: SCALE(96),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0094ff'
        },
        textStyle: {
            fontSize: FONT(18),
            backgroundColor: 'transparent',
            textAlign: 'center'
        },
        itemStyle: {
            marginBottom: SCALE(20),
            width: WIDTH, height: SCALE(300),
            backgroundColor: Color.C777777,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
);


