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
import { createStackNavigator,createBottomTabNavigator,NavigationActions } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import Tab from './component/Tab'
import Page1 from './page/Page1'
import PageList from './page/PageList'
import Page3 from './page/Page3'
import Page4 from './page/Page4'
import Web from "./page/Web";
import WebAndroid from './component/WebViewAndroid'
import HomePage from './Tab/HomePage'
import ProjectPage from "./Tab/ProjectPage";
import MinePage from './Tab/MinePage'
import InputPage from './page/InputPage'
import WaterFall from "./page/WaterFall";


//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    };
};

const StackOptions = ({navigation}) => {
    const gesturesEnabled = false;
    const header = null
    return {gesturesEnabled,header}
};

const tabbaroption = {
    activeTintColor: Color.C0094ff,
    inactiveTintColor: Color.C888888,
    showIcon: true,
};

const TabContainer = createBottomTabNavigator(
    {
        HomePage: {
            screen: HomePage
        },
        ProjectPage: {screen: ProjectPage,},
        MinePage: {screen: MinePage,},
    },
    {
        lazy: true,
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        configureTransition:TransitionConfiguration,
        tabBarComponent:props => <Tab {...props}/>,
        tabBarOptions: tabbaroption,
    });

const Routes = {
    TabContainer:{screen: TabContainer},
    Page1:{screen:Page1},
    PageList:{screen:PageList},
    Page3:{screen:Page3},
    Page4:{screen:Page4},
    Web:{screen:Web},
    WebAndroid:{screen:WebAndroid},
    InputPage:{screen:InputPage},
    WaterFall:{screen:WaterFall},
};


const AppNavigator = (initialRoute = "Index")=>{//通过参数动态配置初始化路由
    return createStackNavigator(
        {
            ...Routes,
            Index: {
                screen: TabContainer,
            },
        },
        {
            initialRouteName: initialRoute,
            headerMode: 'screen',
            gesturesEnabled:'false',
            mode: 'card',
            transitionConfig: TransitionConfiguration,
            navigationOptions: ({navigation}) => StackOptions({navigation}),
        }
    );
}



const defaultStateAction = AppNavigator().router.getStateForAction;

AppNavigator().router.getStateForAction = (action, state) => {
    if (state && action.key && action.type === 'Navigation/BACK') {
        const desiredRoute = state.routes.find((route) => route.routeName === action.key)
        if (desiredRoute) {
            const index = state.routes.indexOf(desiredRoute);
            const finalState = {
                ...state,
                routes: state.routes.slice(0, index + 1),
                index: index,
            };
            return finalState
        } else {
            if (state.routes.length > action.key) {
                const stacksLength = state.routes.length - action.key
                const stacks = state.routes.slice(0, stacksLength)
                const finalState = {
                    ...state,
                    routes: stacks,
                    index: stacksLength - 1,
                };
                return finalState
            }
        }
    }
    return defaultStateAction(action, state)
}

export default class Root extends Component{

    constructor(){
        super();
        // this.readFile();
    }

    componentDidMount() {
    }


    //清除缓存
    clearData(){
        CLEAR_All();
    }

    readFile(){//读取缓存

    }

    render(){
        let Navigator= AppNavigator('Index');
        return <View style={{flex:1}}>

            <Navigator/>
        </View>

    }

}
