//正则验证 输入信息
export default class CheckUtil {

    static checkPhone(params){
        if(!params||params.length<1){
            HttpUtil.showToast('您尚未输入手机号');
            return false;
        }
        let  patt = /^1[0-9]{10}$/;
        let result =  patt.test(params);
        if (!result){
            HttpUtil.showToast('请输入正确的手机号');
            return false;
        }
        return true;
    }

    static checkLoginPwd(pwd,confirm){
        if(confirm&&pwd!=confirm){
            HttpUtil.showToast('两次密码输入不一致');
            return false;
        }
        let pattPwd;
        let resultPwd;
        if (pwd === ''){
            let message = '请输入登录密码';
            HttpUtil.showToast(message);
            return false;
        }
        if(pwd.length<6){
            HttpUtil.showToast('密码 至少需要6位的长度')
            return false;
        }
        if(pwd.length>20){
            HttpUtil.showToast('密码 不能超过20位的长度');
            return false;
        }
        pattPwd =  /^[0-9a-zA-Z]*$/g;
        resultPwd =  pattPwd.test(pwd);
        if(!resultPwd){
            HttpUtil.showToast('密码 只允许为字符和数字');
            return false;
        }
        return true;
    }

    static checkTradePwd(pwd,confirm){
        if(confirm&&pwd!=confirm){
            HttpUtil.showToast('两次密码输入不一致');
            return false;
        }
        let pattPwd;
        let resultPwd;
        if (pwd === ''){
            let message = '请输入交易密码';
            HttpUtil.showToast(message);
            return false;
        }
        if(pwd.length!=6){
            HttpUtil.showToast('6位数字 不允许有空格');
            return false;
        }
        pattPwd =  /^[0-9]*$/g;
        resultPwd =  pattPwd.test(pwd);
        if(!resultPwd){
            HttpUtil.showToast('6位数字 不允许有空格');
            return false;
        }
        return true;
    }

    static checkBankNum(params){
        if(!params||params.length<1){
            HttpUtil.showToast('您尚未输入银行卡号');
            return false;
        }
        let  patt = /^[0-9]*$/;
        let result =  patt.test(params);
        if (!result){
            params = '';
        }
        if(!params||params.length<15||params.length>19){
            HttpUtil.showToast('请输入15-19位银行卡号');
            return false;
        }
        return true;
    }


    static checkMoney(amount,text1,text2){
        if(amount==''){
            HttpUtil.showToast('请输入充值金额');
            return false;
        }
        let arr = amount.split('.');
        if(arr.length>2){
            HttpUtil.showToast('充值金额只能为数字');
            return false;
        }
        for(let i=0;i<arr.length;i++){
            let  patt = /^[0-9]*$/;
            let result =  patt.test(arr[i]);
            if (!result){
                HttpUtil.showToast('充值金额只能为数字');
                return false;
            }
        }
        return true;
    };


    //正则校验验证码
    static checkSmsCode(smsCode){
        let message = '';
        if (smsCode === '') {
            message = '请输入验证码';
            HttpUtil.showToast(message);
            return false;
        }
        let patt = /^\d{6}$/;
        let result = patt.test(smsCode);
        if (!result) {
            message = '请输入正确的验证码';
            HttpUtil.showToast(message);
            return false;
        }
        return true;
    }


    //输出的用户输入的code 后台获取的generateCode
    static checkVerifyImage(code,generateCode){
        if(code.length<=0){
            HttpUtil.showToast('请输入图形验证码');
            return false;
        }
        if(code!=generateCode){
            HttpUtil.showToast('输入的图形验证码有误');
            return false;
        }
        return true;
    }




}