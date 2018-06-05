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
import resolveAssetSource from 'resolveAssetSource';
import BasePage from '../base/BasePage'
import Input from '../component/TextInput'
import * as Style from "../style";
export default class InputPage extends BasePage {
    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
            text:'',
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({title:'InputPage'})
    }

    getText=(text)=>{
        this.setState({
            text:text,
        })
    }

    changeImage = ()=>{
        //通过setNativeProps 也可以改变图片
        let imgsrc = AppImages.Common.nodata;
        Log('执行了这里',imgsrc,resolveAssetSource(imgsrc));
        let s = Platform.OS =="android"?"src":"source";
        Log('执行了这里',s);
        this.image.setNativeProps({
            [s]: [resolveAssetSource(imgsrc)],
            style:{
                width:WIDTH,
                height:WIDTH,
            }
        });
    }


    renderPage(){
        return (
            <ScrollView
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                style={{flex: 1,}}>
                <Text style={[Style.textStyle, {
                    width: WIDTH,
                    backgroundColor: 'blue',
                    lineHeight: SCALE(80)
                }]}>{this.state.text}</Text>
                <Input
                    placeholder={'输入数据'}
                    style={{width: WIDTH - SCALE(200), backgroundColor: 'red', marginTop: SCALE(100)}}
                    onEndEditing={this.getText}/>
                <TouchableOpacity activeOpacity={0.5} onPress={this.changeImage}>
                    <Image ref={(component) => this.image = component}
                           style={{width: WIDTH / 2, height: WIDTH / 2}}
                           source={AppImages.Common.close}/>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width:257,
        height:255,
        marginTop:SCALE(50)
    },
    textStyle:{
        fontSize:FONT(16),
        color:Color.fontColor,
    }
});


