//数据匹配
export function _contrastArray(data1,data2) {
    for(let i = 0; i < data1.length; i++) {
        data1[i].isShow = false;
        for(let j = 0; j < data2.length; j++) {
            if (data2[j] == data1[i].name) {
                data1[i].isShow = true;
            } 
        } 
    }
    return data1;
}
//筛选出项目名称
export function _selectName(data) {
    let name = '';
    for(let i = 0; i < data.length; i++) {
        if (data[i].name == "FName") {
            name = data[i].label;
        }
    }
    return name;
}

// 页面步骤跳转匹配
export function _contrastStepName(list,id) {
    const stepName = [
        'Forecast',
        'AZDispatch',
        'CL',
        'XD',
        'AZPlan',
        'SH',
        'FirAZ',
        'AZ',
        'YS'
    ]
    for (let i = 0; i < list.length; i ++ ) {
        list[i].PMainID = id;
        if (i < 3) {
            list[i].stepName = stepName[i];
        } else if (i > 3) {
            list[i].stepName = stepName[i - 1];
        }
    }
    return list;
}