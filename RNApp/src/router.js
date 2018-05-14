/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    View,
    I18nManager,
    TouchableOpacity,
    Easing,
    StatusBar,
    Animated,
    DeviceEventEmitter,
    Image,
} from 'react-native';
import { StackNavigator,TabNavigator,NavigationActions } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import Page1 from './page/Page1'
import Page2 from './page/Page2'
import Page3 from './page/Page3'
import Page4 from './page/Page4'

const Routes = {
    Page1:{screen:Page1},
    Page2:{screen:Page2},
    Page3:{screen:Page3},
    Page4:{screen:Page4},
};

//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        // screenInterpolator:freeStyle,
    };
};

const StackOptions = ({navigation}) => {
    const gesturesEnabled = true;
    const headerStyle= {
        flexDirection: 'row',
        justifyContent:'space-between',
//        alignItems:'flex-end',//官方bug
        height:60,
        borderWidth: 0,
        borderBottomWidth: 0,
    };
    const headerTitleStyle = {
        backgroundColor:'transparent',
        fontSize: FONT(17),
        color: 'white',
    };
    const headerTintColor= 'white';
    const headerLeft = (
        <TouchableOpacity activeOpacity={1} onPress={()=>{
            console.log('配置里面的navigation goback');
            navigation.goBack(null)
        }}>
        </TouchableOpacity>
    );
    const headerRight=(<View style={{paddingRight:SCALE(30),width:SCALE(20),height:SCALE(37),backgroundColor:'red'}}>
    </View>);
    return {headerLeft,headerRight,headerStyle,gesturesEnabled,headerTitleStyle,headerTintColor,}
};

const AppNavigator = StackNavigator(
    {
        ...Routes,

    },
    {
        headerMode: 'screen',
        mode: 'card',
        transitionConfig: TransitionConfiguration,
       // navigationOptions: ({navigation}) => StackOptions({navigation}),
    }
);

export default AppNavigator;
