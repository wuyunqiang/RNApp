/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    NetInfo

} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count?this.props.count:60,
            clickstate: false,
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout);
    }

     timer = ()=> {
        let count = this.state.count - 1;
        this.setState({count: count});
        if (count > 0) {
            setTimeout(this.timer, 1000);
        } else {
            this.setState({clickstate: false,count:60});
            this.timeout && clearTimeout(this.timeout);
        }
    };

    countdown =()=>{
        this.timeout = setTimeout(this.timer, 1000);
    };

    click = async() => {
        Log('CountDown',this.props)
        if(!this.props.clickable){
            return;
        }
        if (this.state.clickstate) {
            return;
        }
        if(this.props.checkVerify&&this.props.checkVerify()){
            this.props.OnClick&&this.props.OnClick();
            this.setState({
                clickstate: true,
            });
            this.countdown();
        }


    };

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.click}>
                <View style={{
                    width: SCALE(150),
                    height: SCALE(45),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: this.props.clickable?'#0094ff':'#b7b9c5'
                }}>
                    {this.state.clickstate?
                        <Text style={{color:'#0094ff', fontSize: FONT(0.32 * 75 / 2)}}>
                            {this.state.count}
                            <Text style={{color:'#b7b9c5', fontSize: FONT(0.32 * 75 / 2)}}>
                                重新获取
                            </Text>
                    </Text>:
                        <Text style={{color: this.props.clickable?'#0094ff':'#b7b9c5', fontSize: FONT(0.32 * 75 / 2)}}>
                            获取验证码
                    </Text>}

                </View>
            </TouchableOpacity>)
    }
}
