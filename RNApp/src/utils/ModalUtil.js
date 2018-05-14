/**
 * Created by wuyunqiang on 2017/8/2.
 */
import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    Modal,
    TextInput,
    NativeModules,
    InteractionManager,
    AppState
} from 'react-native';
import ModalAndroid from '../component/ModalAndroid'

export default class ModalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:false,
            visible: this.props.visible };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (AppState)=>{
        Log('AppState',AppState);
        Log('AppState _handleAppStateChange',this.state.visible);
        this.setState({
            update:!this.state.update,
            visible: this.state.visible });
    };

    close = ()=>{
        Log("执行了这里");
        requestAnimationFrame(() => {
            if (this.props.close) {
                // Log("close","执行了父组件的close方法")
                this.props.close();
            } else {
                // Log("close","执行本组件方法")
                this.setState({ visible: false });
            }
        });
    };

    renderContent=() => (this.props.contentView());

    render() {
        Log("ModalUtil visible",this.state.visible);
        // if(Platform.OS==="ios"){
            return (
                <Modal
                    animationType={this.props.animation ? this.props.animation : 'slide'}// 进场动画 fade
                    onRequestClose={() => this.close()}
                    visible={this.state.visible}// 是否可见
                    transparent
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={()=>{}}
                    >
                        <View style={[styles.container, this.props.customerlayout]}>
                            {this.renderContent()}
                        </View>
                    </TouchableOpacity>
                </Modal>
            );
        // }
        return (
            <ModalAndroid
                style={{width:0,height:0}}//避免显示空白
                ref = {(modalAndroid)=>{this.modalAndroid = modalAndroid}}
                visible = {[this.state.visible,this.state.update]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>{}}>
                    <View style={[styles.container, this.props.customerlayout]}>
                        {this.renderContent()}
                    </View>
                </TouchableOpacity>
            </ModalAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
});