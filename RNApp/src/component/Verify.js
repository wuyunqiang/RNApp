/**
 * Created by wuyunqiang on 2017/9/22.
 */
import React, {Component,PureComponent} from 'react';
import {
    Image,
    Platform,
    Keyboard,
    TouchableOpacity,
    TextInput,
    Animated,
    UIManager,
    NetInfo,
    Text,
    LayoutAnimation
} from 'react-native';

let CustomLayoutAnimation = {
    duration: 800,//动画持续时间
    create: {//创建本页面时使用的动画
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY,
    },
    update: {//更新本页面时开启的动画
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    // delete: {//删除上一个页面时使用的动画
    //     type:LayoutAnimation.Types.easeIn,
    //     // springDamping: 0.6,
    //     property: LayoutAnimation.Properties.scaleXY,
    // },
};
export default class Verify extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            flag :true,
        };
    };

    componentDidMount() {
        LayoutAnimation.configureNext(CustomLayoutAnimation);
    }

    update = ()=>{
        this.setState({
            flag:!this.state.flag
        })
    };
    render(){
        Log('获取验证码');
        let ver = URL.baseURI+URL.verify + "&"+Date.now();
        return (<Item style={[styles.item,{marginTop:SCALE(53/2),paddingBottom:0,borderBottomWidth:0,justifyContent:'space-between'}]}>
            <Item style={{height:SCALE(90), paddingBottom:SCALE(30),width:SCALE(300),flexDirection:'row',alignItems:'flex-end'}}>
                <Image
                    style={{width:SCALE(40),height:SCALE(42),marginRight:SCALE(30)}}
                    source={AppImages.Login.verify}/>
                <TextInput
                    maxLength={5}
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    autoFocus={false}
                    placeholder="图片验证码"
                    style={{padding:0,width:SCALE(200)}}
                    onChangeText={(verify) => this.props.getVerify(verify)}/>
            </Item>
            <TouchableOpacity activeOpacity={1} style={{alignItems:'center'}} onPress={this.update}>
                <Image style={{marginBottom:SCALE(16/2),width:SCALE(150),height:SCALE(40)}} source={{uri:ver,cache: 'reload'}}/>
            </TouchableOpacity>
        </Item>);
    }
}



const styles = {
    item:{
        height:SCALE(90),
        paddingBottom:SCALE(30),

        width:Platform.OS==="ios"?SCALE(536):SCALE(550),

    },
};