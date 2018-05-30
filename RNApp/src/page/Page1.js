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
import BasePage from '../base/BasePage'
export default class Page1 extends BasePage {


    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({title:'Page1'})
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.debug('didBlur', payload);
                console.log('Page1.Navigation_routers',  BasePage.Navigation_routers)
            }
        );
    }

    componentWillUnMount() {
        super.componentWillUnMount()
        this.timer&&clearTimeout(this.timer);
    }


    goToPage = ()=>{
        this.props.navigation.navigate('Page3');
    };

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
                style={{flex: 1,backgroundColor:'white'}}>

                <TouchableOpacity style={styles.itemStyle} onPress={this.goToPage}>
                    <Text style={styles.textStyle}>这是第一页</Text>
                    <Text style={styles.textStyle}>跳转到Page2</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} activeOpacity={0.7} onPress={()=>super.navigate('Web')}>
                    <Text style={styles.textStyle}>gotoWebview</Text>
                </TouchableOpacity>
                <View style={styles.itemStyle}/>
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


