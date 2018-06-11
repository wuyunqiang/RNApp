/**
 * Created by wuyunqiang on.
 */
import React,{Component}from 'react';
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
import AppImages from "../assets";
import ifIphoneX from "../utils/iphoneX";

let HeaderMarginLeftAndRight = SCALE(20);//header 距离左右的间距

export default class Header extends Component {

    renderLeftView = ()=>{
        return <TouchableOpacity activeOpacity={1} onPress={() => {
            this.props.navigation.goBack(null);
        }}>
            <Image style={{width:SCALE(22),height:SCALE(42),marginLeft:HeaderMarginLeftAndRight}}
                   source={AppImages.Common.back}/>
        </TouchableOpacity>
    };

    renderCenterView = () => {
        if (this.props.centerTxt) {
            return (<Text
                numberOfLines={1}
                style={{fontSize: FONT(20), color: Color.fontColor}}>{this.props.centerTxt}</Text>)
        }
        return null;
    }

    renderRightView = ()=>{
        if(this.props.rightTxt){
            return (<TouchableOpacity activeOpacity={1}
                                      onPress={() => {this.props.rightClick&&this.props.rightClick();}}>
                <View style={{
                    width: Platform.OS === 'ios' ? 55 / 2 : SCALE(55),
                    height: Platform.OS === 'ios' ? 55 / 2 : SCALE(55),
                    justifyContent: 'center',
                    marginRight: HeaderMarginLeftAndRight
                }}>
                    <Text style={{fontSize: FONT(30 / 2), color: '#0094ff'}}>{this.props.rightTxt}</Text>
                </View>
            </TouchableOpacity>)
        }
        return null;

    };
    render() {
        return (<View style={{
            ...header
        }}>
            <View style={{width:WIDTH/3,}}>
                {this.props.renderLeftView?this.props.renderLeftView():this.renderLeftView()}
            </View>

            <View style={{minWidth:WIDTH/3,maxWidth:WIDTH/2,justifyContent:'center',alignItems:'center',}}>
                {this.props.renderCenterView?this.props.renderCenterView():this.renderCenterView()}
            </View>
            <View style={{width:WIDTH/3,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}>
                {this.props.renderRightView?this.props.renderRightView():this.renderRightView()}
            </View>
        </View>)
    }
}

const header = {
    ...ifIphoneX({
        paddingTop: 44,
        height: 88
    }, {
        paddingTop: Platform.OS === "ios" ? 20 :20,
        height:Platform.OS === 'ios' ? 64 : 64,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9E9E9E'
}