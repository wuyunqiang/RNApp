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


    renderPage(){
        return (
            <ScrollView
                contentContainerStyle={{alignItems: 'center',justifyContent:'center'}}
                style={{flex: 1,}}>
                <Text style={[Style.textStyle,{width:WIDTH,backgroundColor:'blue',lineHeight:SCALE(80)}]}>{this.state.text}</Text>
                <Input
                    placeholder={'输入数据'}
                    style={{width:WIDTH-SCALE(200),backgroundColor:'red',marginTop:SCALE(100)}}
                    onEndEditing={this.getText}/>
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


