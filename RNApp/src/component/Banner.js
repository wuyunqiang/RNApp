/**
 * Created by wuyunqiang on 2017/7/25.
 */
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
    PanResponder,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Carousel,{Pagination} from 'react-native-snap-carousel';
export default class Banner extends React.Component {

    static defaultProps = {
        itemWidth:WIDTH ,
        itemHeight:WIDTH/2,
    };

    constructor(props){
        super(props);
        this.state={
            activeSlide:0,

        };
        this.index = 0;
    }


    pagination =(length)=> {
        return (
            <Pagination
              //  dotsLength={this.props.pagination_length?this.props.pagination_length:this.arr.length}
                dotsLength={length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                }}
                dotStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: SCALE(10),
                    height: SCALE(10),
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
            />
        );
    };

    render(){
        return (
            <View style={{width:this.props.itemWidth, height:this.props.itemHeight}}>
                <Carousel
                    inactiveSlideScale={1}
                    sliderWidth={this.props.itemWidth}
                    sliderHeight={ this.props.sliderHeight}
                    itemWidth={this.props.itemWidth}
                    itemHeight={ this.props.itemHeight}
                    onSnapToItem={(index) => {
                        this.index = index;
                        Log('TabChange onSnapToItem', this.index);
                        this.setState({ activeSlide: index })} }
                    {...this.props}
                />
                {this.pagination(0)}
            </View>)
    };

}
