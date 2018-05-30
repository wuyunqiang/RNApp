/*
* 图片资源
* */

const Header ={
    get pulling() {return require('../assets/header/pulling.gif')},
    get pullrelease() {return require('../assets/header/pullrelease.gif')},
    get pullok() {return require('../assets/header/pullok.png')},
}

const common = {
    get back() {return require('../assets/common/leftarrow.png')},
    get bid() {return require('../assets/common/bid.png')},
    get bid_active() {return require('../assets/common/bid_active.png')},
    get home() {return require('../assets/common/home.png')},
    get home_active() {return require('../assets/common/home_active.png')},
    get person() {return require('../assets/common/person.png')},
    get person_active() {return require('../assets/common/person_active.png')},
    get nodata() {return require('../assets/common/noData.png')},
    get rightArrow() {return require('../assets/common/rightArrow.png')},
    get yes() {return require('../assets/common/yes.png')},
    get downArrow() {return require('../assets/common/xx.png')},
    get close() {return require('../assets/common/close.png')},
};




const AppImages = {
    get Header(){
        return Header
    },
    get Common() {
        return common;
    },
};
export default AppImages;
global.AppImages = AppImages;