// /**
//  * Created by wuyunqiang on 2017/10/18.
//  */
// import React, { Component } from 'react';
// import {
//     AppRegistry,
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     NativeModules,
//     ImageBackground,
//     DeviceEventEmitter
// } from 'react-native';
//
// export default class Tab extends Component {
//     renderItem = (route, index) => {
//         const {
//             navigation,
//             jumpTo,
//         } = this.props;
//
//         const focused = index === navigation.state.index;
//         const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
//         let TabScene = {
//             focused:focused,
//             route:route,
//             tintColor:color
//         };
//
//         if(index==1){
//             return (<View
//                     key={route.key}
//                     style={[styles.tabItem,{backgroundColor:'transparent'}]}>
//                 </View>
//             );
//         }
//
//         return (
//             <TouchableOpacity
//                 key={route.key}
//                 style={styles.tabItem}
//                 onPress={() => jumpTo(route.key)}
//             >
//                 <View
//                     style={styles.tabItem}>
//                     {this.props.renderIcon(TabScene)}
//                     <Text style={{ ...styles.tabText,marginTop:SCALE(10),color }}>{this.props.getLabelText(TabScene)}</Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     };
//     render(){
//         const {navigation,jumpTo} = this.props;
//         const {routes,} = navigation.state;
//         const focused = 1 === navigation.state.index;
//         const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
//         let TabScene = {
//             focused:focused,
//             route:routes[1],
//             tintColor:color
//         };
//         return (<View
//             pointerEvents = {"box-none"}//此组件不接收点击事件 子组件可以点击
//             style={{width:WIDTH}}>
//             <View style={styles.tab}>
//                 {routes && routes.map((route,index) => this.renderItem(route, index))}
//             </View>
//             <TouchableOpacity
//                 key={"centerView"}
//                 style={[styles.tabItem,{position:'absolute',bottom:0,left:(WIDTH-SCALE(100))/2,right:WIDTH-SCALE(100),height:SCALE(120)}]}
//                 onPress={() => jumpTo(routes[1].key)}>
//                 <View
//                     style={{width:SCALE(100),height:SCALE(100),marginBottom:SCALE(10),borderRadius:50,backgroundColor:'green',justifyContent:'center',alignItems:'center'}}>
//                     {this.props.renderIcon(TabScene)}
//                 </View>
//             </TouchableOpacity>
//         </View>);
//     }
// }
// const styles = {
//     tab:{
//         width:WIDTH,
//         backgroundColor:'transparent',
//         flexDirection:'row',
//         justifyContent:'space-around',
//         alignItems:'flex-end'
//     },
//     tabItem:{
//         height:SCALE(80),
//         width:SCALE(100),
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     tabText:{
//         marginTop:SCALE(13),
//         fontSize:FONT(10),
//         color:Color.C7b7b7b
//     },
//     tabTextChoose:{
//         color:Color.f3474b
//     },
//     tabImage:{
//         width:SCALE(42),
//         height:SCALE(42),
//     },
// }




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
           return <View style={{width:WIDTH/count}}/>
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


