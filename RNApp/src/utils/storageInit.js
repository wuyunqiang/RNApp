import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
const Key = 'wuyunqiang'
const storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期， 则会调用相应的sync方法，无缝返回最新数据。 sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法 或是写到另一个文件里，这里require引入 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});

global.storage = storage;

// 读取缓存
let readCache = (id,res,error)=>{
    storage.load({
        key: Key,
        id:id,
        autoSync: true,
        syncInBackground: true
    }).then(ret => {
        res(ret);
    }).catch(err => {
        error(err)
    });
};

global.READ_CACHE = readCache;

// 写入缓存
let writeCache = (id,data,expires)=>{

    storage.save({
        key: Key,  //注意:请不要在key中使用_下划线符号!
        id:id,
        data: data,

        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期  1000 * 3600
        expires: expires
    });
};

global.WRITE_CACHE = writeCache;

// 删除单个数据
let remove=(id)=>{
    storage.remove({
        key: Key,
        id: id
    });
};
global.REMOVE_ITEM = remove;


//清空所有缓存!! 清空map，移除所有"key-id"数据（但会保留只有key的数据）所以并非严格意义的clear_all
let clearAll = ()=>{
    storage.clearMap();
};

global.CLEAR_All = clearAll;