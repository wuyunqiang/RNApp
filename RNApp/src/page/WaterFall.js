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
import Waterfall from '../component/WaterFall';
import FastImage from 'react-native-fast-image'
// import Masonry from 'react-native-masonry';
import {PullScroll} from '../component/pull'
import BasePage from '../base/BasePage'
export default class WaterFall extends BasePage {
    constructor(props){
        super(props);
        this.imgs = [
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-60cf7ef85296ceb9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800' },
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-62c5a07cc392adf8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800' },
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-0e7433779b02a171.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800' },
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-49596650818ae5cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800' },
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-f6e35151bf2083ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600' },
            { uri: 'http://upload-images.jianshu.io/upload_images/3353755-f621b90453e1a9a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' },
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-ba17c262187af2b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-da0c58c167708c6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400'},

        ]
        this.state = {
            ...this.BaseState,
            imgs:this.imgs,
            layoutWidth: (WIDTH - 45) / 2,
            list: []
        };
    }

    componentDidMount(){
        super.componentDidMount();
        this.props.navigation.setParams({title:'WaterFall'});
        this.pullImg = [{ uri:'http://upload-images.jianshu.io/upload_images/3353755-fdf49385776ee4e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-5c80ae22b6917f25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-e3f1a7c13ac43abe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-938ed475e18db6af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-938ed475e18db6af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-46178cdeb2237279.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-b2809cbb05e19652.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-a9885bb0976daaf5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-6bcdd303dadbc9ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-7b7eb3555b043324.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-4c23c245cf5d9b8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-1e351da78efa00e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'}
        ]
        this.addImage = [
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-e4f5d1ad32d1ca72.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-9b998a898ab7e1c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-556775a7c87ade9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600'},
            { uri:'http://upload-images.jianshu.io/upload_images/3353755-aa73740bad5b39bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'},
        ]
        this.refs.waterfall&&this.refs.waterfall.addItems(this.pullImg);
        // this.getData();

    }

    componentWillUnMount() {
        super.componentWillUnMount()
    }


    // getData = async()=>{
    //     let query = "https://api.groupon.com/v2/deals?offset=" + this.cache.offset +
    //         "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
    //         "&client_version_id=" + "16.2" +
    //         "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
    //         "&lat=" + this.cache.lat +
    //         "&limit=" + this.cache.limit +
    //         "&lng=" + this.cache.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";
    //
    //     let data = await HttpUtil.GET(query);
    //     if(data){
    //     }
    //     console.log('data',data);
    // };


    onPullRelease = async(resolve)=>{
        try {
            setTimeout(()=>{
                this.setState({
                    imgs:this.pullImg
                });
                resolve&&resolve();
            },2000)

        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };

    onEndReached = ()=>{
        Log('render onEndReached');
        try {
            setTimeout(()=>{
                this.setState({
                    imgs:this.state.imgs.concat(this.addImage)
                });
            },2000)

        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };

    infiniting=(done)=> {
        setTimeout(() => {
            this.refs.addItems(this.state.imgs);
            done();
        }, 1000);
    }

    refreshing=(done)=> {
        setTimeout(() => {
            done();
        }, 1000);
    }


    renderItem=(item)=> {
        console.log('item',item);
        return (
            <View>
                <Image
                    style={{width: this.state.layoutWidth, height: this.state.layoutWidth / item.img_width * item.img_height}}
                    resizeMode="cover"
                    source={{uri: item.uri}}/>
                {/*<Text>{item.name.slice(0, 10)}</Text>*/}
            </View>
        )
    }


    renderLoadMore=(loading)=> {
        if (loading) {
            return (
                <Text>加载中...</Text>
            )
        } else {
            return (
                <Text>加载更多</Text>
            )
        }
    }

    renderPage(){
        return (<Waterfall
            space={15}
            ref="waterfall"
            columns={2}
            refreshing={this.refreshing}
            infiniting={this.infiniting}
            infinite={false}
            renderItem={item => this.renderItem(item)}
            renderInfinite={loading => this.renderLoadMore(loading)}
        />)
    }


    // renderPage(){
    //     return (
    //         <ScrollView style={{flex:1,flexGrow: 10, padding: 10}}>
    //             <Masonry
    //                 // sorted // optional - Default: false
    //                 // columns={4} // optional - Default: 2
    //                 bricks={this.state.imgs}
    //                 onEndReached={this.onEndReached}
    //                 onEndReachedThreshold={10}/>
    //         </ScrollView>
    //     )
    // }
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


