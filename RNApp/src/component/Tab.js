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
            jumpTo,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };

        if(index==Math.floor(count/2)){
           return <View key={""+index} style={{width:WIDTH/count}}/>//占位使用
        }

        Log('Tab route',route);
        return (
            <TouchableOpacity
                key={route.key}
                onPress={() => {
                    // DeviceEventEmitter.emit('TabChange', index);
                    jumpTo(route.key);
                }}
                style={{width:WIDTH/count,flexDirection:'row', justifyContent:'space-around',}}
            >
                <View style={styles.tabItem}>
                    <View style={{flex:1}}/>
                    {this.props.renderIcon(TabScene)}
                    <View style={{flex:1}}/>
                    <Text style={{...styles.tabText,color:color}}>{this.props.getLabelText(TabScene)}</Text>
                    <View style={{flex:1}}/>
                </View>
            </TouchableOpacity>
        );
    };


    renderCenter = (route, index, count) => {
        const {
            navigation,
            jumpTo,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableOpacity
                key={"centerView"}
                style={{position:'absolute', bottom: SCALE(30),left:(WIDTH-SCALE(100))/2,right:WIDTH-SCALE(100),backgroundColor:'transparent', width:SCALE(100),height:SCALE(100), alignItems:'center', justifyContent:'center',}} onPress={() => {jumpTo(route.key);}}>
                <View style={{
                    width: SCALE(100),
                    height:SCALE(100),
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.f97578,
                }}>
                    {this.props.renderIcon(TabScene)}
                </View>
            </TouchableOpacity>
    )
    };

    render(){
        const {navigation,} = this.props;
        const {routes,} = navigation.state;
        Log('Tab',this.props);
        let arr = [];
        let center;
        for(let i=0;i<routes.length;i++){
            arr.push(this.renderItem(routes[i], i,routes.length))//其他正常item
            if(i==Math.floor(routes.length/2)){//中间凸起的item
                center =  this.renderCenter(routes[i], i,routes.length)
            }
        }

        return (
            <View pointerEvents = {"box-none"}//此组件不接收点击事件 子组件可以点击
                 style={{width:WIDTH}} //添加其他style会失效！！！
            >
            {/**其他正常View**/}
                <View style={{width:WIDTH, backgroundColor:'white', position:'absolute', bottom:0,flexDirection:'row',}}>
                    {arr}
                </View>
                {/**中间凸起的view**/}
                {center}

             </View>
        );
    }
}
// {/*{routes && routes.map((route,index) => this.renderItem(route, index,routes.length))}*/}
const styles = {
    tabItem:{
        height:SCALE(100),
        width:SCALE(98),
        alignItems:'center',
        justifyContent:'center',
    },
    tabText:{
        fontSize:FONT(12),
        color:Color.C888888
    },
};


