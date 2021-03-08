<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='大货安装'>
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24 mg0">
                                <el-col :span="12">
                                    <el-form-item label="项目名称">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目地址">
                                        <el-input size='small' v-model="form.FAddress" :disabled="true"></el-input>
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
                                    <el-form-item label="项目经理">
                                        <el-input size='small' v-model="form.FProManager" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="产品数量">
                                        <el-input size='small' v-model="form.FProductNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="12">
                                    <el-form-item label="已收货数量">
                                        <el-input size='small' v-model="form.FBulkNumSH" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="12">
                                    <el-form-item label="已下单数量">
                                        <el-input size='small' v-model="tungData.FOrderNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已发货数量">
                                        <el-input size='small' v-model="tungData.FArrivalNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已具备安装面">
                                        <el-input size='small' v-model="tungData.FFaceNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已安装数量">
                                        <el-input size='small' v-model="tungData.FInstallNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待整改数量">
                                        <el-input size='small' v-model="tungData.FWaitChangeNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="12">
                                    <el-form-item label="安装日期">
                                        <el-date-picker size='small' type="date" placeholder="" v-model="currentDate" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="12">
                                    <el-form-item label="楼栋">
                                        <el-input size='small' v-model="PBuild" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item >
                                        <el-checkbox @change="batchDo('1')" v-model="isBatchReady">全选具备安装面</el-checkbox>
                                        <el-checkbox @change="batchDo('2')" v-model="isBatchDone">全选安装完成</el-checkbox>
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

                        <div class="ly_house_con pd24">
                            <div class="flex-row ly_state_con">
                                <div @click="queryData('0')" class="flex-row cursor_pointer">
                                    <font :class="[statusType == '0' ? 'ly_right_act' : 'ly_right']">全选</font>
                                </div>
                                <div @click="queryData('5')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_1"></div>
                                    <font :class="[statusType == '5' ? 'ly_right_act' : 'ly_right']">已具备安装面</font>
                                </div>
                                <div @click="queryData('4')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_2 cursor_pointer"></div>
                                    <font :class="[statusType == '4' ? 'ly_right_act' : 'ly_right']">产品到货完成</font>
                                </div>
                                <div @click="queryData('6')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_3"></div>
                                    <font :class="[statusType == '6' ? 'ly_right_act' : 'ly_right']">产品安装完成</font>
                                </div>
                                <div @click="queryData('9')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_4"></div>
                                    <font :class="[statusType == '9' ? 'ly_right_act' : 'ly_right']">需整改</font>
                                </div>
                                <div @click="queryData('8')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_7 "></div>
                                    <font :class="[statusType == '8' ? 'ly_right_act' : 'ly_right']">已验收</font>
                                </div>
                                <div @click="queryData('3')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_5"></div>
                                    <font :class="[statusType == '3' ? 'ly_right_act' : 'ly_right']">未到货</font>
                                </div>
                            </div>
                            <div v-for="(item,index) in typeNameRoom" :key="index" class="ly_detail_con flex-row">
                                <div class="ly_num_con flex-center">{{item.Ffloor}}<br/>层</div>
                                <div class="flex-row pt20" style="flex-wrap:wrap;align-items: center;width:96%;">
                                    <div @click="openPopup(sitem)" v-for="(sitem,sindex) in item.typeList" :key="sindex" class="flex-colulmn pt10 cursor_pointer">
                                        <div v-if="sitem.FStatus == '3'" class="ly_right_con ly_color_1"></div>
                                        <div v-if="sitem.FStatus == '2'" class="ly_right_con ly_color_2"></div>
                                        <div v-if="sitem.FStatus == '5' || sitem.FStatus == '6'" class="ly_right_con ly_color_3"></div>
                                        <div v-if="sitem.FStatus == '4'" class="ly_right_con ly_color_4"></div>
                                        <div v-if="sitem.FStatus == '7'" class="ly_right_con ly_color_7"></div>
                                        <div v-if="sitem.FStatus == '1' || sitem.FStatus == null || sitem.FStatus == '0'" class="ly_right_con ly_color_5"></div>
                                        <!-- <div v-if="sitem.FStatus == '1'" class="ly_right_con ly_color_5"></div> -->
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
            width="50%"
            >
            <el-row type="flex" justify="center">
                <el-col class="mb20" :span="20">
                    <div class="ly_pstep_con flex-row">
                        <div class="flex-column flex-center">
                            <img class="icon_complete mb8" src="../img/complete.png" alt="">
                            <font class="ft_2">已到货</font>
                        </div>
                        <div class="flex-column flex-center">
                            <div v-if="FStatus < 3"  @click="changeCheck('FFace')" class="ly_checkbox flex-center">
                                <i v-if="FStatusFirst == '3' || FStatusFirst == '4'  || FStatusFirst == '5'" class="el-icon-check"></i>
                            </div>
                            <img v-if="FStatus >= 3" class="icon_complete mb8" src="../img/complete.png" alt="">
                            <font :class="[FStatus == '7' ? 'ft_2' : 'ft_4']">安装面已具备</font>
                        </div>
                        <div class="flex-column flex-center">
                            <div v-if="FStatus != '7' && FStatus != '4' && !FChangeRemark" @click="changeCheck('Finstall')" class="ly_checkbox flex-center">
                                <i v-if="FStatusFirst == '5' || FStatusFirst == '6'" class="el-icon-check"></i>
                            </div>
                            <img v-if="FStatus == '7' && !FChangeRemark" class="icon_complete mb8" src="../img/complete.png" alt="">
                            <img v-if="FStatus == '4' || FChangeRemark" class="icon_ban mb8" src="../img/ban.png" alt="">
                            <font :class="[FStatus == '7' && !FChangeRemark ? 'ft_2' : 'ft_4']">已安装</font>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="FStatus != '7' && FStatus != '6'">
                <el-col :span="24">
                    <div class="ly_remark_con flex-row">
                        <div @click="addRemark" class="flex-row cursor_pointer">
                            <i class="icon_add el-icon-circle-plus-outline"></i>
                            <font class="ft_5">添加整改</font>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-dialog 
                width="30%"
                title="添加整改"
                :visible.sync="innerVisible"
                append-to-body>
                <el-input placeholder="请输入备注信息" v-model="FChangeRemark1"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button size='small' @click="innerVisible = false">取 消</el-button>
                    <el-button size='small' type="primary" @click="changeRemark">确 定</el-button>
                </span>
            </el-dialog>
            <el-row>
                <el-col :span="24">
                    <div v-if="FChangeRemark" class="ly_input_con flex-row">
                        <div class="flex-center-ali">
                            <div class="ly_status_1 flex-center">待整改</div>
                            <font @click="addRemark('CChange')" class="ft_6 cursor_pointer">{{FChangeRemark}}</font>
                        </div>
                        <i v-if="!FChangeRemarkFirst" @click="deleteRemark" class="icon_remove cursor_pointer el-icon-remove"></i>
                        <el-button v-if="FChangeRemarkFirst" @click="submit('CChange')" size='small' type="success" round>完成整改</el-button>
                    </div>
                    <div v-if="item.FChangeAZ == '1'" v-for='(item,index) in changeHistory' :key="index" class="ly_input_con flex-row">
                        <div class="flex-center-ali">
                            <div class="ly_status_2 flex-center">已整改</div>
                            <font class="ft_7">{{item.FChangeRemark}}</font>
                        </div>
                        <font class="ft_8">{{item.FFinishDate}}</font>
                    </div>
                </el-col>
            </el-row>
            <my-upload v-if="FStatus != '7' && FStatus != '6'" :fileList='fileList'></my-upload>
            <span slot="footer" class="dialog-footer">
                <el-button size='small' @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="FStatus != '4' && FStatus != '7' && FStatus != '6'" size='small' type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            PBuild: '',
            radio: '',
            activeName: '1',
            form: {},
            PMainID: '',
            typeNameData: [],
            typeNameRoom: [],
            form_1: {},
            dialogVisible: false,
            innerVisible: false,
            popupTitle: '',
            FFace: false,
            FArrival: false,
            Finstall: false,
            FChangeAZ: false,
            FChangeRemark: '',
            FChangeRemark1: '', 
            FChangeRemarkFirst: '',
            popupInfo: {},
            FFaceFirst: false,
            FinstallFirst: false,

            changeHistory: [],

            FStatus: '',
            FStatusFirst: '',
            fileList:[],
            statusType: '0',
            isBatchReady: false,
            isBatchDone: false,
            tungData: [],
            PUnitListIndex: -1,
            PUnitList: []
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
            this.PBuild = this.$route.query.PBuild;
        } 
        this.getDetail();
        this.initTungData();
        this.getFloorRoomInfo();
    },
    watch:{
        dialogVisible(val){
            if(val == false){
                this.fileList = []
                this.changeHistory = []
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
                // debugger
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
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    for (let i = 0; i < data.length; i ++) {
                        if (data[i].FBuild == this.PBuild) {
                            this.tungData = data[i];
                        }
                    }
                    // console.log(this.tungData);
                }                
            })    
        },
        getFloorRoomInfo() {
            let params = {
                "PMainID": this.PMainID,
                "PBuild": this.PBuild,
                // "PUnit": this.PUnit,
                // "PHouse": this.PHouse
            };
            this.requestApi('CP_FloorInfoFJ_VO',params).then(res => {
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.typeNameRoom = this._loop3(res.data.records);
                    this.typeNameRoom = this._loop4(this.typeNameRoom);
                    this.queryFloorDYHX();
                    // console.table(this.typeNameRoom);
                }
            })
        },

        getDetail() {
            let params = {
                "PMainID": this.PMainID    
            }
            this.requestApi('CP_BulkAZ_XQ_VO',params).then(res => {
                if (res.data.records) {
                    this.form = res.data.records[0];
                }
            })
        },

        getRemark() {
            let params = {
                "FfloorID": this.popupInfo['FfloorID'], 
                "FType": '2'   
            }
            this.requestApi('CP_RectifyRoom_VO',params).then(res => {
                // debugger
                this.changeHistory = res.data.records;
                // console.log(this.changeHistory);
            })  
        },
        addRemark(flag) {
            if (flag == 'CChange') {
                this.innerVisible = true;
                return
            }
            if (this.FChangeRemark) {
                this.$message({
                    message: '完成整改后才能添加新的整改内容',
                    type: 'warning'
                });
                return
            }
            if (this.FStatusFirst == '3' || this.FStatusFirst == '5' || this.FStatusFirst == '7' ) {
                this.FChangeRemark1 = this.FChangeRemark;
                this.innerVisible = true;
            } else {
                this.$message({
                    message: '请先勾选安装面已具备',
                    type: 'warning'
                });
                return
            }
        },
        changeRemark() {
            this.FChangeRemark = this.FChangeRemark1;
            if (this.FChangeRemark) {
                this.FStatusFirst = '4';
            }
            this.innerVisible = false;
        },
        deleteRemark() {
            this.FChangeRemark = '';
            this.FStatusFirst = this.FStatus;
        },

        openPopup(item) {
            // console.log('zhuangtai' + item.FStatus);
            if (item.FStatus != 1 && item.FStatus != null) {
                this.popupTitle = item.Ffloor + item.FRoom;
                this.FStatus = item.FStatus;
                this.FStatusFirst = item.FStatus;
                this.FChangeRemark = item.FChangeRemark;
                this.FChangeRemarkFirst = item.FChangeRemark;
                this.popupInfo['submitID'] = item.ID;
                this.popupInfo['FfloorID'] = item.ID;
                this.getRemark();
                // debugger
                if (item.PEnclosureAZ) {
                    this.fileList = this._loop1(item.PEnclosureAZ);
                    // console.log(this.fileList);
                }
                this.dialogVisible = true;
            } else {
                this.$message({
                    message: '未到货！',
                    type: 'warning'
                });
            }
        },

        changeCheck(flag) {
            if (flag == 'FFace') {
                if (this.FStatusFirst != '3') {
                    if (this.FStatusFirst == '5') {
                        this.FStatusFirst = '2';
                    }
                    this.FStatusFirst = '3';
                    
                } else {
                    this.FStatusFirst = this.FStatus;
                }
            } else if (flag == 'Finstall') {
                if (this.FStatusFirst != '5') {
                    if (this.FStatusFirst == '6') {
                        this.FStatusFirst = '3';
                    } 
                    this.FStatusFirst = '5';  
                } 
                
                else {
                    this.FStatusFirst = '3';
                }
            } 
        },
        batchDo(type) {
            if (this.isBatchReady && type == '1') {
                this.$confirm(this.PBuild + '栋的房间全选已具备安装面？')
                .then(_ => {
                    let params = {
                        'POtype': type,
                        'PMainID': this.PMainID,
                        'PBuild': this.PBuild
                    }
                    this.submitApi('CP_FloorInfoFJ_VO_Mbatch',params).then(res => {
                        if (res.data.result == 1) {  
                            this.$message.success('修改成功');
                            this.isBatchReady = false;
                            this.getDetail();
                            this.getFloorRoomInfo();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                })
                .catch(_ => {
                    this.isBatchReady = false;
                });
            } else if (this.isBatchDone && type == '2') {
                this.$confirm(this.PBuild + '栋的房间全选已安装？')
                .then(_ => {
                    let params = {
                        'POtype': type,
                        'PMainID': this.PMainID,
                        'PBuild': this.PBuild
                    }
                    this.submitApi('CP_FloorInfoFJ_VO_Mbatch',params).then(res => {
                        // debugger
                        if (res.data.result == 1) {  
                            this.$message.success('修改成功');
                            this.isBatchDone = false;
                            this.getDetail();
                            this.getFloorRoomInfo();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                })
                .catch(_ => {
                    this.isBatchDone = false;
                });
            }
        },
        submit(flag) {
            let id = this.popupInfo['submitID'];
            let params = {};
            let arr = this.fileList,arr2 = [];
            for(let i = 0; i < arr.length; i++){
                let str = JSON.stringify(arr[i]);
                arr2.push(str)
            };
            if (flag == 'CChange') {
                params = {
                    'FStatus': '5',
                    "FType": '2',
                    'FChangeRemark': this.FChangeRemark,
                    'PEnclosure': arr2.join('|'),   
                } 
            } else {
                params = {
                    'FStatus': this.FStatusFirst ? this.FStatusFirst : this.FStatus,
                    "FType": '2',
                    'FChangeRemark': this.FChangeRemark,
                    'PEnclosure': arr2.join('|'),
                    // 'FAZDate': this.$moment(this.currentDate).format("YYYY-MM-DD")  
                } 
            }
            // console.log(params);
            this.submitApi('CP_FloorInfo_MUPDATE',params,id).then(res => {
                // debugger
                if (res.data.result == 1) {   
                    this.$message.success('提交成功'); 
                    this.initTungData(); 
                    this.dialogVisible = false;
                    this.queryData();
                    this.getDetail();
                    // this.getFloorRoomInfo();
                } else {
                    this.$message.error(res.data.message);
                }
            })
        }
    }
}
</script>