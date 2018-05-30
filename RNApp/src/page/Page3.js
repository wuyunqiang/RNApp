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
export default class Page3 extends BasePage {
    // static navigationOptions = {
    //     header:({navigation}) =>{
    //         return null;
    //     }
    // };
    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({title:'Page3'})
    }


    goToPage = ()=>{
        this.props.navigation.navigate('Page4');
    }
    renderPage(){
        return (
            <ScrollView
                contentContainerStyle={{alignItems: 'center',}}
                style={{flex: 1,}}>
                <TouchableOpacity style={{
                    width:WIDTH-SCALE(40)-SCALE(40),
                    alignItems: 'center',
                    justifyContent:'center',
                    marginLeft:SCALE(40),
                    marginRight:SCALE(40),
                    marginTop:SCALE(100),}} activeOpacity={0.7} onPress={this.goToPage}>
                    <View style={{
                        width:WIDTH-SCALE(40)-SCALE(40),
                        borderRadius:24,
                        height:SCALE(96),
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#0094ff'
                    }}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>这是第三页</Text>

                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>跳转到Page4</Text>
                    </View>
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
    }
});


