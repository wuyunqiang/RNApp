import React,{Component}from 'react';
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
import {PullList} from '../component/pull'
import BasePage from '../base/BasePage'
const headerHeight = SCALE(200);
export default class PageList extends BasePage {
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
        this.props.navigation.setParams({title:'PageList'})
    }




    onPullRelease = (resolve)=>{
        try {
            setTimeout(()=>{
                this.pullList&&this.pullList.setData(['1','2','3','4','5','6','7','8','9','10']);
                resolve&&resolve();
            },2000);

        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };

    loadMore = (page)=>{
        try {
            setTimeout(()=>{
                this.pullList&&this.pullList.addData(['11','12','13','14','15','16','17','18','19','20']);
            },2000);
        } catch (err) {
            Log(err);
        }
    };


    renderTopIndicator = (pulling, pullok, pullrelease,gesturePosition)=>{
        if (pulling) {
            this.txtPulling && this.txtPulling.setNativeProps({style:styles.show});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullok) {

            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullrelease) {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
        }
        return (
            <View ref={(c) => {this.PullAll = c;}} style={styles.header}>
                <View ref={(c) => {this.txtPulling = c;}} style={styles.hide}>
                    <Image style={{width:SCALE(200),height:headerHeight}} source={AppImages.Header.pulling}/>
                </View>
                <View ref={(c) => {this.txtPullok = c;}} style={styles.hide}>
                    <Image style={{width:SCALE(200),height:headerHeight}} source={AppImages.Header.pulling}/>
                </View>
                <View ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>
                    <Image style={{width:SCALE(62),height:SCALE(46)}} source={AppImages.Header.pullrelease}/>
                </View>
            </View>
        )
    }


    renderRowView = ({item, index, separators})=>{
        return (<Item key = {''+index} data = {item} OnClick = {this.OnClick}/>)};


    renderPage(){
        return (
            <PullList
                Android_Native={true}
                Key={'list'}
                ref={(list) => this.pullList = list}
                topIndicatorRender={this.renderTopIndicator}
                topIndicatorHeight={headerHeight}
                onEndReachedThreshold={20}
                onPullRelease={this.onPullRelease}
                onEndReached={this.loadMore}
                renderItem={this.renderRowView}
                getItemLayout={(data, index) => ({length: SCALE(390), offset: SCALE(390) * index, index})}
                numColumns={1}
                ItemSeparatorComponent={() => {
                    return null;
                }}
                initialNumToRender={5}
                renderLoading = {()=>{return null;}}
            />
        )
    }
}

class Item extends Component{
   render(){
       return (<View style={{width:WIDTH,height:SCALE(390),justifyContent:'center',alignItems:'center'}}>
           <View style={{marginTop:SCALE(20),width:WIDTH,flex:1,backgroundColor:Color.C0094ff,justifyContent:'center',alignItems:'center'}}>
               <Text>{this.props.data}</Text>
           </View>
       </View>)
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
    header:{
        height: headerHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hide: {
        position: 'absolute',
        left: 10000
    },
    show:{
        position: 'relative',
        left: 0,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


