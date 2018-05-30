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
export default class Page4 extends BasePage {
    constructor(props){
        super(props);
        this.state = {
            ...this.BaseState,
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({title:'Page4'})
    }


    goback = ()=>{
        this.props.navigation.popToTop();
        // this.props.navigation.navigate('Page1');//可以代替goback返回到指定页面
        console.log('Page4 this.props.navigation',this.props.navigation)
        // super.goBackPage("Page1",BasePage.Navigation_routers)
    }



    renderPage(){
        return (
            <ScrollView
                contentContainerStyle={{alignItems: 'center',}}
                style={{flex: 1,}}>
                <TouchableOpacity  style={styles.itemStyle} onPress={this.goback}>
                    <View style={styles.itemStyle}>
                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>这是第四页</Text>

                        <Text style={{fontSize:FONT(39/2),backgroundColor:'transparent',textAlign:'center'}}>跳回到第一页</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.itemStyle} activeOpacity={0.7} onPress={()=>{super.navigate("PageList")}}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.textStyle}>这是第四页</Text>
                        <Text style={styles.textStyle}>跳转列表页</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            width: 257,
            height: 255,
            marginTop: SCALE(50)
        },
        touchstyle: {
            width: WIDTH - SCALE(40) - SCALE(40),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: SCALE(40),
            marginRight: SCALE(40),
            marginBottom: SCALE(100),
        },
        viewstyle: {
            width: WIDTH - SCALE(40) - SCALE(40),
            borderRadius: 24,
            height: SCALE(96),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0094ff'
        },
        textStyle: {
            fontSize: FONT(18),
            backgroundColor: 'transparent',
            textAlign: 'center'
        },
        itemStyle: {
            marginBottom: SCALE(20),
            width: WIDTH, height: SCALE(300),
            backgroundColor: Color.C777777,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
);


