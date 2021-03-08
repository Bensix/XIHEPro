//表格和附件数据处理
export function _loop1 (str) {
    let obj = [];
    let arrs = new Array();
    arrs = str.split('|');
    for (let i = 0; i < arrs.length; i ++ ) {
        if (arrs[i]) {
            obj.push(JSON.parse(arrs[i]))
        }
    }
    return obj
}

//工程房型类型数据处理
export function _loop2(data) {
    let res = [];
    while (data.length !== 0) {
        let list = data.shift();
        let arr = [list];
        for(let i = 0; i < data.length; i ++ ) {
            if (data[i].FUnit === list.FUnit) {
                arr = arr.concat(data.splice(i,1))
                i--;
            }
        }
        res.push(arr);
    }
    let rdata = new Object;
    for(let j = 0; j < res.length; j++) {
        if ( rdata[j] == undefined) {
            rdata[j] = {}
        }
        rdata[j].typeIndex = 0;
        rdata[j].label = res[j][0].FUnit
        rdata[j].typeList = res[j];
    }
    return rdata;
}

//工程楼层类型数据处理
export function _loop3(data) {
    let res = [];
    while (data.length !== 0) {
        let list = data.shift();
        let arr = [list];
        for(let i = 0; i < data.length; i ++ ) {
            if (data[i].Ffloor === list.Ffloor) {
                arr = arr.concat(data.splice(i,1))
                i--;
            }
        }
        res.push(arr);
    }
    let rdata = [];
    for(let j = 0; j < res.length; j++) {
        if ( rdata[j] == undefined) {
            rdata[j] = {}
        }
         
        rdata[j].typeList = res[j];
        rdata[j].Ffloor = parseInt(rdata[j].typeList[0].Ffloor);
    }
    var compare = function (obj1, obj2) {
        var val1 = obj1.Ffloor;
        var val2 = obj2.Ffloor;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
    rdata = rdata.sort(compare);
    return rdata;
}

// 工程房间从小到大排序
export function _loop4(list) {
    var compare = function (obj1, obj2) {
        var val1 = obj1.FRoomNum;
        var val2 = obj2.FRoomNum;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    }
    for (let i = 0; i < list.length; i ++ ) {
        for(let j = 0; j < list[i].typeList.length; j++) {
            let str = list[i].typeList[j].FRoom;
            str = str.slice(0,2);
            list[i].typeList[j].FRoomNum = str;
        } 
        list[i].typeList = list[i].typeList.sort(compare);
    }
    return list;
}

//数组去重
export function _loop5(list) {
    return Array.from(new Set(list))
}
