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
export default class MinePage extends BasePage {
    static navigationOptions = (nav)=>{
        let state =  nav.navigation.state;
        let tabBarVisible = state.params&&state.params.tabBarVisible;
        return {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor,focused}) => (
                <Icon name="user" size={30} color={tintColor} />
            ),
            tabBarVisible:tabBarVisible,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
            test1:1,
            test2:1,
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.setState({
            test1:this.state.test1+1,
        },()=> {
            Log('MinePage this.state',this.state)
        })
        this.setState({
            test1:this.state.test1+1,
            test2:this.state.test2+1,
        },()=> {
            Log('MinePage this.state',this.state)
        })

        this.setState((state,props)=>{
            Log('MinePage state',state);
            Log('MinePage props',props);
            return {
                test2:state.test2+10,
            }
        },()=>{
            Log('MinePage state this.state',this.state)
        })
        Log('MinePage this.state',this.state);

        Log('hahahahhahaha');
        Log('gagagagaga');
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
                showsVerticalScrollIndicator={false}
                Key={'MinePage'}
                method={1}
                Android_Native={true}
                onPullRelease={this.onPullRelease}
                contentContainerStyle={{alignItems: 'center',}}
                style={{flex: 1,backgroundColor:'white'}}>

                <View style={styles.itemStyle}/>
                <View style={styles.itemStyle}/>
                <View style={styles.itemStyle}/>
                <View style={styles.itemStyle}/>
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


