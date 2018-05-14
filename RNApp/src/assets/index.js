/*
* 图片资源
* */

const Header ={
    get pulling() {return require('../assets/header/pulling.gif')},
    get pullrelease() {return require('../assets/header/pullrelease.gif')},
    get pullok() {return require('../assets/header/pullok.png')},
}




const AppImages = {

    get Header(){
        return Header
    }
};
export default AppImages;
global.AppImages = AppImages;