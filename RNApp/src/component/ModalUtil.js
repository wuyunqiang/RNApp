/**
 * Created by zhangzuohua on 2018/3/13.
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
    StatusBar
} from 'react-native';
export default class ModalUtil extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: this.props.visible };
    }
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible });
    }
    close=() => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ visible: false });
        });
    };
    componentWillMount() {}
    renderContent = () => (this.props.contentView());
    render() {
        return (
            <Modal
                animationType='none'// 进场动画 fade
                onRequestClose={() => this.close()}
                visible={this.state.visible}// 是否可见
                transparent
            >
                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={1}
                    onPress={this.close}
                >
                    <View style={[styles.container, this.props.customerlayout]}>
                        {this.renderContent()}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});