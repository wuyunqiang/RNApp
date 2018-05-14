/**
 * Created by wuyunqiang on 2017/10/18.
 */
import React, {Component} from "react";
import {
    Platform,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    DeviceEventEmitter,
    Text,
} from "react-native";
export default class Tab extends Component {
    static defaultProps = {
    };
    renderItem = (route, index,count) => {
        const {
            navigation,
            jumpToIndex,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };
        return (
            this.props.TopTabBar ?
                <TouchableOpacity
                    key={route.key}
                    onPress={() => {
                        jumpToIndex(index);
                    }}
                    style={{width:WIDTH/count,flexDirection:'row', justifyContent:'space-around',}}
                    activeOpacity={1}
                >
                    <View
                        style={styles.tabItem}>
                        <View style={{flex:1}}/>
                        <Text style={{ fontSize:FONT(0.42 * 75 / 2),color:focused ? this.props.color : '#5F616C' }}>{this.props.getLabel(TabScene)}</Text>
                        <View style={{flex:1}}/>
                        {focused ? <View style={{height:2,backgroundColor:this.props.color,width:50}}/> : <View style={{height:2,width:50}}/>}
                    </View>
                </TouchableOpacity>
                :
            <TouchableOpacity
                key={route.key}
                onPress={() => {
                    Log('tab index',index);
                    DeviceEventEmitter.emit('TabChange', index);
                    jumpToIndex(index);
                }}
                style={{width:WIDTH/count,flexDirection:'row', justifyContent:'space-around',}}
                activeOpacity={1}
            >
                <View
                    style={styles.tabItem}>
                    <View style={{flex:1}}/>
                    {this.props.renderIcon(TabScene)}
                    <View style={{flex:1}}/>
                    <Text style={{ ...styles.tabText }}>{this.props.getLabel(TabScene)}</Text>
                    <View style={{flex:1}}/>
                </View>
            </TouchableOpacity>
        );
    };

    render(){
        const {navigation,} = this.props;
        const {routes,} = navigation.state;
        return (
            <View style={this.props.TopTabBar ? styles.TopTabBar : styles.tab }>
                {routes && routes.map((route,index) => this.renderItem(route, index,routes.length))}
            </View>
        );
    }
}
const styles = {
    tab:{
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:Color.dddddd,
        width:WIDTH,
        height: Platform.OS==='ios'?49:50,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    TopTabBar:{
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor: Color.dddddd,
        width:WIDTH,
        height: Platform.OS==='ios'?49:50,
        backgroundColor:'#f9f9f9',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    tabItem:{
        height:Platform.OS==='ios'?49:50,
        width:SCALE(98),
        alignItems:'center',
    },
    tabText:{
        fontSize:Platform.OS==='ios'?10:10,
        color:Color.C888888
    },
    MessageTabText:{
        fontSize:FONT(0.26 * 75),
    },
    tabTextChoose:{
        color:Color.f3474b
    },
};