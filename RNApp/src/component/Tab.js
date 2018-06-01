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
        return <View key={route.key}
                     style={{width: WIDTH / count,height:SCALE(100), justifyContent: 'center', alignItems: 'center',
                         transform: [{translateY:SCALE(30)}],
                         position: 'relative',
                         zIndex: -1,
                         bottom:SCALE(30)}}>
            <TouchableOpacity onPress={() => {jumpTo(route.key);}}>
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'green'}}>
                <View style={{
                    height: SCALE(100),
                    width: SCALE(98),
                    marginBottom:SCALE(10),
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.f97578,
                   }}>
                    {this.props.renderIcon(TabScene)}
                </View>
                <Text style={{...styles.tabText,color:color}}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </TouchableOpacity>

        </View>
    };
    
    render(){
        const {navigation,} = this.props;
        const {routes,} = navigation.state;
        Log('Tab',this.props);
        let arr = [];
        for(let i=0;i<routes.length;i++){
            arr.push(this.renderItem(routes[i], i,routes.length))
            // if(i==Math.floor(routes.length/2)){
            //     arr.push(this.renderCenter(routes[i], i,routes.length))
            // }else{
            //     Log('Tab 执行了这里',this.renderItem(routes[i], i,routes.length));
            //     arr.push(this.renderItem(routes[i], i,routes.length))
            // }
        }
       
        return (
            <View style={styles.tab}>
                {arr}
                {/*{routes && routes.map((route,index) => this.renderItem(route, index,routes.length))}*/}
            </View>
        );
    }
}
const styles = {
    tab:{
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:Color.dddddd,
        width:WIDTH,
        height:SCALE(100),
        backgroundColor:Color.background,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    TopTabBar:{
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor: Color.dddddd,
        width:WIDTH,
        height:SCALE(100),
        backgroundColor:Color.background,
        flexDirection:'row',
        justifyContent:'space-around',
    },
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