<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title="测量进度表单">
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="项目名称">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="项目地址">
                                        <el-input size='small' v-model="form.FAddress" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="产品数量">
                                        <el-input size='small' v-model="form.FProductNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="省份">
                                        <el-input size='small' v-model="form.FProvince" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="城市">
                                        <el-input size='small' v-model="form.FCity" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="测量数量">
                                        <el-input size='small' v-model="tungData.Fnum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已测量数量">
                                        <el-input size='small' v-model="tungData.FMeasureNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待测量数量">
                                        <el-input size='small' v-model="tungData.FNotMeasureNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="楼栋">
                                        <el-input size='small' v-model="PBuild" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <div v-if="PUnitList.length != 0" class="ly_type_con flex-row">
                            <div class="flex-center" :class="[PUnitListIndex == '-1' ? 'ly_type_item_act':'ly_type_item']"
                                @click="changeTypeTab('-1','')">
                                全部
                            </div>
                            <div v-for="(sitem,sindex) in PUnitList" :key="sindex"
                                class="flex-center" :class="[PUnitListIndex == sindex ? 'ly_type_item_act':'ly_type_item']"
                                @click="changeTypeTab(sindex,sitem)">
                                {{sitem}}
                            </div>
                        </div>
                        <div v-if="PUnitList.length == 0" class="ly_type_con flex-row">
                            <div class="flex-center ly_type_item_act">
                                其他
                            </div>
                        </div>

                        <div class="pd24 ly_house_con">
                            <div class="flex-row ly_state_con">
                                <div @click="queryData('0')" class="flex-row cursor_pointer">
                                    <font :class="[statusType == '0' ? 'ly_right_act' : 'ly_right']">全部</font>
                                </div>
                                <div @click="queryData('1')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_green"></div>
                                    <font :class="[statusType == '1' ? 'ly_right_act' : 'ly_right']">测量完成</font>
                                </div>
                                <div @click="queryData('2')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_red"></div>
                                    <font :class="[statusType == '2' ? 'ly_right_act' : 'ly_right']">测量未完成</font>
                                </div>
                            </div>
                            <div v-for="(item,index) in typeNameRoom" :key="index" class="ly_detail_con flex-row">
                                <div class="ly_num_con flex-center">{{item.Ffloor}}<br/>层</div>
                                <div class="flex-row pt20" style="flex-wrap:wrap;align-items: center;width:96%;">
                                    <div @click="openPopup(sitem)" v-for="(sitem,sindex) in item.typeList" :key="sindex" class="flex-colulmn pt10 cursor_pointer">
                                        <div v-if="sitem.FMeasureStatus == 1" class="ly_right_con ly_color_red"></div>
                                        <div v-if="sitem.FMeasureStatus == 2" class="ly_right_con ly_color_green"></div>
                                        <font class="ft_1">{{sitem.Ffloor}}{{sitem.FRoom}}</font>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slot>
                </my-card>
            </el-col>
        </el-row>
        
        <el-dialog
            :title="popupTitle"
            :visible.sync="dialogVisible"
            width="600px"
            >
            <el-form v-if="dialogVisible" ref="form" :rules="form_rules" :model="form_value" label-width="80px" class="demo-ruleForm">
                <el-row class="mg0">
                    <el-col :span="20">
                        <el-form-item prop="FMeasureType" label="测量类型">
                            <el-radio v-model="FMeasureType" label="1">实测</el-radio>
                            <el-radio v-model="FMeasureType" label="2">约尺</el-radio>
                        </el-form-item>
                        <el-form-item v-if="form_label.FRoomFX != 0" prop="FRoomFX" label="房体方向">
                            <el-select size='small' style="width:100%;" v-model="form_value.FRoomFX" placeholder="请选择">
                                <el-option
                                    v-for="item in roomOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="form_label.FDoorFX != 0" prop="FDoorFX" label="开门方向">
                            <el-select size='small' style="width:100%;" v-model="form_value.FDoorFX" placeholder="请选择">
                                <el-option
                                    v-for="item in doorOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="form_label.FP != 0" prop="FP" label="P">
                            <el-input type="number" size='small' v-model="form_value.FP"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FLength != 0" prop="FLength" label="L">
                            <el-input type="number" size='small' v-model="form_value.FLength"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FWidth != 0" prop="FWidth" label="W">
                            <el-input type="number" size='small' v-model="form_value.FWidth"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FLength2 != 0" prop="FLength2" label="L1">
                            <el-input type="number" size='small' v-model="form_value.FLength2"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FWidth1 != 0" prop="FWidth1" label="W1">
                            <el-input type="number" size='small' v-model="form_value.FWidth1"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FWidth2 != 0" prop="FWidth2" label="W2">
                            <el-input type="number" size='small' v-model="form_value.FWidth2"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FHeight != 0" prop="FHeight" label="H">
                            <el-input type="number" size='small' v-model="form_value.FHeight"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FAngle != 0" prop="FAngle" label="∠1(角度)">
                            <el-input type="number" size='small' v-model="form_value.FAngle"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FAngle2 != 0" prop="FAngle2" label="∠2(角度)">
                            <el-input type="number" size='small' v-model="form_value.FAngle2"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FOuter != 0" prop="FOuter" label="外弧长">
                            <el-input type="number" size='small' v-model="form_value.FOuter"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FOuterR != 0" prop="FOuterR" label="外R">
                            <el-input type="number" size='small' v-model="form_value.FOuterR"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FSideA != 0" prop="FSideA" label="A边">
                            <el-input size='small' v-model="form_value.FSideA"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FSideB != 0" prop="FSideB" label="B边">
                            <el-input size='small' v-model="form_value.FSideB"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FSideC != 0" prop="FSideC" label="C边">
                            <el-input size='small' v-model="form_value.FSideC"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.FStoneBase != 0" prop="FStoneBase" label="石基">
                            <el-select size='small' style="width:100%;" v-model="form_value.FStoneBase" placeholder="请选择">
                                <el-option
                                    v-for="item in stoneOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测量日期">
                            <el-date-picker size='small' type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择时间" v-model="FMeasureDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="form_label.FRemark != 0" prop="FRemark" label="备注">
                            <el-input size='small' v-model="form_value.FRemark"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form_label.PEnclosureCL != 0" label="附件">
                            <el-upload
                                class="upload-demo"
                                action="#"
                                :http-request="handlePreview"
                                multiple
                                :before-upload="beforeAvatarUpload"
                                :show-file-list="false"
                                >
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                            <div class="upload-list-wrap">
                                <div class="upload-item" v-for="(item,index) in fileList" :key="index">
                                    <div @click="viewFile(item.thumbnail)" class="upload-title">{{item.name}}</div>
                                    <div class="upload-icon" @click="delteImg(item.id)">
                                        <i class="el-icon-close"></i>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="submit('form')" size='small'>提 交</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
var checkNumber = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('不能为空'));
    }
    setTimeout(() => {
        if (value < 0) {
            callback(new Error('不能为负数'));
        } else if (value >= 10000) {
            callback(new Error('不超过4位数'));
        } else {
            callback();
        }
    }, 1000);
};
var checkAngle = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('不能为空'));
    }
    setTimeout(() => {
        if (value < 0) {
            callback(new Error('不能为负数'));
        } else if (value > 180) {
            callback(new Error('角度不超过180'));
        } else {
            callback();
        }
    }, 1000);
};
var checkNumberNo = (rule, value, callback) => {
    setTimeout(() => {
        if (value < 0) {
            callback(new Error('不能为负数'));
        } else if (value >= 10000) {
            callback(new Error('不超过4位数'));
        } else {
            callback();
        }
    }, 1000);
};
var checkAngleNo = (rule, value, callback) => {
    setTimeout(() => {
        if (value < 0) {
            callback(new Error('不能为负数'));
        } else if (value > 180) {
            callback(new Error('角度不超过180'));
        } else {
            callback();
        }
    }, 1000);
};
export default {
    data() {
        return {
            currentDate: new Date(),
            form: {},
            form_1: {},
            form_value: {},
            form_label: {},
            activeName: '1',
            popupTitle: '',

            PMainID: '',
            PBuild: '',
            PUnit: '',
            PHouse: '',
            typeNameData: [],
            typeNameRoom: [],
            dialogVisible: false,
            shapeType: [],
            doorOptions: [
                {
                    value: '1',
                    label: '左开' 
                },
                {
                    value: '2',
                    label: '右开'
                },
                {
                    value: '3',
                    label: '对称'
                }
            ],
            roomOptions: [
                {
                    value: '1',
                    label: '左房' 
                },
                {
                    value: '2',
                    label: '右房' 
                },
                {
                    value: '3',
                    label: '对称' 
                }
            ],
            stoneOptions: [
                {
                    value: '1',
                    label: '石基宽度' 
                },
                {
                    value: '2',
                    label: '石基开槽'
                },
                {
                    value: '3',
                    label: '无石基'
                },
                {
                    value: '4',
                    label: '下沉地面'
                }
            ],
            form_rules: {
                FMeasureType: [],
                FRoomFX: [],
                FDoorFX: [],
                FLength: [],
                FLength2: [],
                FWidth: [],
                FWidth2: [],
                FHeight: [],
                FAngle: [],
                FAngle2: [],
                FOuter: [],
                FSideA: [],
                FSideB: [],
                FSideC: [],
                FStoneBase: [],
                FRemark: [],
            },

            popupInfo: {},
            FMeasureType: '',
            FShape: '',
            fileList:[],
            statusType: '0',
            tungData: [],
            FMeasureDate: new Date(),
            PUnitListIndex: -1,
            PUnitList: []
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
            this.PBuild = this.$route.query.PBuild;
        } 
        this.getFloorRoomInfo();
        this.initTungData();
        this.getDetail();
    },
    watch:{
        dialogVisible(val){
            if(val == false){
                this.fileList = []
            }
        }
    },
    methods: {
        changeTypeTab(index,name) {
            this.PUnitListIndex = index;
            this.PUnit = name;
            this.queryData();
        },
        queryFloorDYHX() {
            let params = {
                "PMainID": this.PMainID,
                "PBuild": this.PBuild
            }
            this.requestApi('CP_FloorInfoDYHX_VO',params).then(res => {
                let data = res.data.records;
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].FUnit) {
                            this.PUnitList.push(data[i].FUnit)
                        }
                    }
                    this.PUnitList = this._loop5(this.PUnitList);
                }
            })
        },
        viewFile(url) {
            window.open(process.env.API_URL + url,'_blank')
        },
        queryData(type) {
            if (type) {
                this.statusType = type;
            }
            this.typeNameRoom = [];
            let params = {
                "PMainID": this.PMainID,
                "PBuild": this.PBuild,
                "PUnit": this.PUnit,
                "PHouse": '',
                "FType": this.statusType,
            }
            this.requestApi('CP_FloorInfoFJ_VO',params).then(res => {
                if (res.data.records) {
                    this.typeNameRoom = this._loop3(res.data.records);
                    this.typeNameRoom = this._loop4(this.typeNameRoom);
                }                
            })  
        },
        initTungData() {
            let params = {
                "PMainID": this.PMainID,
            }
            this.requestApi('CP_BuildSumTJ_VO',params).then(res => {
                let data = res.data.records;
                if (res.data.records) {
                    for (let i = 0; i < data.length; i ++) {
                        if (data[i].FBuild == this.PBuild) {
                            this.tungData = data[i];
                        }
                    }
                }                
            })    
        },

        getFloorRoomInfo() {
            let params = {
                "PMainID": this.PMainID,
                "PBuild": this.PBuild,
                "PUnit": '',
                "PHouse": ''
            };
            this.requestApi('CP_FloorInfoFJ_VO',params).then(res => {
                if (res.data.records) {
                    this.typeNameRoom = this._loop3(res.data.records);
                    this.typeNameRoom = this._loop4(this.typeNameRoom);
                    this.queryFloorDYHX();
                }
            })
        },

        getShapeType(item) {
            let params = {
                "FShape": item.FShape
            };
            this.requestApi('CP_Shape_VO',params).then(res => {
                // debugger
                //  console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.form_label = this.loop_2(res.data.records[0],item,'1');
                    this.form_value = this.loop_2(res.data.records[0],item,'2');
                    this.form_rules = this.loop_4(res.data.records[0],this.form_rules);
                    this.FMeasureType = item.FMeasureType == null ? '1' : item.FMeasureType;
                    this.FMeasureDate = item.FMeasureDate ? item.FMeasureDate : new Date();
                    this.popupTitle = item.Ffloor + item.FRoom + '(' + res.data.records[0].FShape + ')';
                    this.dialogVisible = true;
                    this.$forceUpdate();
                    console.log(this.form_label);
                    // console.log(this.FMeasureType);
                }
            })
        },

        getDetail() {
            let params = {
                "PMainID": this.PMainID    
            }
            this.requestApi('CP_MeasureXQ_VO',params).then(res => {
                if (res.data.records) {
                    this.form = res.data.records[0];
                    // console.log(this.form);
                }
            })
        },

        openPopup(item) {
            console.log(item);
            // this.popupTitle = item.Ffloor + item.FRoom + '(' + this.FShapeList[item.FShape - 1] + ')';
            this.popupInfo['submitID'] = item.ID;
            this.getShapeType(item);
            
            if (item.PEnclosureCL) {
                this.fileList = this._loop1(item.PEnclosureCL);
                // console.log(this.fileList);
            }
        },

        submit(formname) {
            let arr = this.fileList,arr2 = [];
            // console.log(arr);
            for(let i = 0; i < arr.length; i++){
                let str = JSON.stringify(arr[i]);
                arr2.push(str)
            };
            let params = this.form_value;
            let id = this.popupInfo['submitID'];
            params['FMeasureStatus'] = '2';
            params['FMeasureType'] = this.FMeasureType;
            params['FMeasureDate'] = this.$moment(params['FMeasureDate']).format("YYYY-MM-DD HH:mm");
            params['FType'] = '1';
            params['PEnclosure'] = arr2.join('|');
            this.$refs[formname].validate((valid) => {
                if (valid) {
                    this.submitApi('CP_FloorInfo_MUPDATE',params,id).then(res => {
                        if (res.data.result == '1') {
                            this.$message.success('提交成功');
                            // this.getFloorRoomInfo();
                            this.queryData();
                            this.getDetail();
                            this.initTungData();
                            this.dialogVisible = false;
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },

        handlePreview(params){
            this.uploadApi(params.file).then(res => {
                if(res.data.sucess == true){
                    let fileList = JSON.parse(res.data.url);
                    this.fileList.push(fileList);
                    // console.log(this.fileList);
                    return this.$message.success('上传成功');
                }else{
                    return this.$message.error('上传失败,请重新上传');
                }
            })    
        },
        delteImg(id){
            let index = this.fileList.findIndex(item =>{
            if(item.id == id){
                return true
            }
            })
            this.fileList.splice(index,1)
        },
        beforeAvatarUpload(file){  
            let types = [ 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'application/rtf', 'application/vnd.ms-excel application/x-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/pdf', 'text/plain', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmg'];
            // console.log(file.type);
            const isType = types.includes(file.type);
            const isLtSize = file.size / 1024 / 1024 < 5;
            if (!isType) {
                this.$message.error('只能上传文档和图片!');
                return false;
            }
            if (!isLtSize) {
                this.$message.error('上传文件大小不能超过 5MB!');
                return false;
            }
            return true;
        },


        loop_2(list1,list2,flag) {
            let obj = {};
            if (flag == '1') {
                for (let key in list1) {
                    obj[key] = {};
                    obj[key] = list1[key];
                }
            } else if (flag == '2') {
                for (let key1 in list1) {
                    obj[key1] = {};
                    for (let key2 in list2) {
                        if (key1 == key2) {
                            obj[key1] = list2[key2];
                        }
                    }
                } 
            }
            return obj;
        },
       
        loop_4(list1,list2) {
            for(let key2 in list2) {
                for (let key1 in list1) {
                    if (key1 == key2 && list1[key1] == '1') {
                        if (key1 == 'FLength' || key1 == 'FLength2' ||  
                            key1 == 'FWidth' || key1 == 'FWidth2' || 
                            key1 == 'FOuter' || key1 == 'FHeight'
                        ) {
                            list2[key1][0] = { required: false,validator:checkNumberNo,trigger: 'blur' }
                        } else if (key1 == 'FAngle' || key1 == 'FAngle2') {
                            list2[key1][0] = { required: false,validator:checkAngleNo,trigger: 'blur' }
                        } else {
                            list2[key1][0] = {}
                        }
                    } else if (key1 == key2 && list1[key1] == '2') {
                        if (key1 == 'FLength' || key1 == 'FLength2' ||  
                            key1 == 'FWidth' || key1 == 'FWidth2' || 
                            key1 == 'FOuter' || key1 == 'FHeight'
                        ) {
                            list2[key1][0] = { required: true,validator:checkNumber,trigger: 'blur' }
                        } else if (key1 == 'FAngle' || key1 == 'FAngle2') {
                            list2[key1][0] = { required: true,validator:checkAngle,trigger: 'blur' }
                        } else {
                            list2[key1][0] = { required:true,message:'不能为空',trigger: 'blur'}
                        }
                    }
                }
            } 
            return list2;
        },
        
    }
    
}
</script>