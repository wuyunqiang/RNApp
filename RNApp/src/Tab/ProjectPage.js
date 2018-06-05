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

import Icon from 'react-native-vector-icons/Ionicons';
import BasePage from '../base/BasePage'
import {PullScroll} from '../component/pull'

export default class ProjectPage extends BasePage {
    static navigationOptions = (nav)=>{
        let state =  nav.navigation.state;
        let tabBarVisible = state.params&&state.params.tabBarVisible;
        return {
            tabBarLabel: '项目',
            tabBarIcon: ({tintColor,focused}) => (
                <Icon name="logo-buffer" size={30} color={tintColor} />
            ),
            tabBarVisible:tabBarVisible,
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
                Key={'ProjectPage'}
                Android_Native={true}
                onPullRelease={this.onPullRelease}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center',}}
                style={{flex: 1,backgroundColor:'white'}}>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>super.navigate('InputPage')}>
                    <Text style={styles.textStyle}>{'测试textinput'}</Text>
                </TouchableOpacity>
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


