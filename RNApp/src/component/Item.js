import React,{PureComponent,Component}from 'react';
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
import TextInput from '../component/TextInput'

export default class Item extends Component{
    /*
    * 一个图片 leftUrl
    * 一个textinput
    * 底部有下划线
    * 一个点击按钮图片RightUrl（非必须）
    *
    * */
    renderEnd = ()=>{//可能会没有
        if(this.props.RightView){
            return this.props.RightView();
        }
        if(this.props.RightUrl){
            return (
                <TouchableOpacity onPress={this.props.ClickRightImage}>
                    <Image style={{width:this.props.RightImageWidth,height:this.props.RightImageHeight, marginRight:SCALE(5)}}
                           source={this.props.RightUrl}/>
                </TouchableOpacity>);
        }
        return null;
    };

    getRef =()=>{
        Log('获取实例this.text Item',this.text)
        return this.text&&this.text.getRef();
    };

    //textinput 失去焦点
    blur = ()=>{
        this.text&&this.text.blur();
    }

    clear =()=>{
        Log('this.item 执行了这里清除text');
        this.text&&this.text.clear();
    };


    render() {
        let RightImageWidth = this.props.RightImageWidth ? this.props.RightImageWidth : 0;
        let LeftImageWidth = this.props.LeftImageWidth ? this.props.LeftImageWidth : null;
        let LeftImageHeight = this.props.LeftImageHeight ? this.props.LeftImageHeight : null;
        let s  = {...styles.text,...this.props.textStyle}
        return (<View style={[styles.itemlayout,this.props.itemsStyle]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image  source={this.props.leftUrl}/>
                <TextInput
                    ref = {(text)=>{this.text = text}}
                    numberOfLines={1}
                    {...this.props}
                    style={s}
                />
            </View>
            {this.renderEnd()}
        </View>);
    }
}
const styles = {
    itemlayout: {
        width: WIDTH,
        paddingLeft: SCALE(30),
        paddingRight: SCALE(30),
        height: SCALE(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e8ecf0',
        backgroundColor: 'white',
    },
    text: {
        minWidth:SCALE(400),
        maxWidth: SCALE(530),
        marginLeft: SCALE(26),
        marginRight: SCALE(10),
        fontSize: FONT(16),
        color: Color.fontColor,
    }
}