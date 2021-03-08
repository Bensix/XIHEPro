<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='验收管理'>
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24 mg0">
                                <el-col :span="12">
                                    <el-form-item label="项目名称">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目经理">
                                        <el-input size='small' v-model="form.FProManager" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
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
                                    <el-form-item label="下单数量">
                                        <el-input size='small' v-model="tungData.FOrderNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已发货数量">
                                        <el-input size='small' v-model="tungData.FArrivalNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="12">
                                    <el-form-item label="已收货数量">
                                        <el-input size='small' v-model="form.FBulkNumSH" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="12">
                                    <el-form-item label="已安装数量">
                                        <el-input size='small' v-model="tungData.FInstallNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已验收项量">
                                        <el-input size='small' v-model="tungData.FWriteoffNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待销项项量">
                                        <el-input size='small' v-model="tungData.FWaitChangeXXNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="楼栋">
                                        <el-input size='small' v-model="PBuild" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="12">
                                    <el-form-item label="验收日期">
                                        <el-date-picker size='small' type="date" placeholder="" v-model="currentDate" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="12">
                                    <el-form-item >
                                        <el-checkbox @change="batchDo" v-model="isBatch">全选验收</el-checkbox>
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
                        <div v-if="PUnitList .length == 0" class="ly_type_con flex-row">
                            <div class="flex-center ly_type_item_act">
                                其他
                            </div>
                        </div>

                        <div class="ly_house_con pd24">
                            <div class="flex-row ly_state_con">
                                <div @click="queryData('0')" class="flex-row cursor_pointer">
                                    <font :class="[statusType == '0' ? 'ly_right_act' : 'ly_right']">全选</font>
                                </div>
                                <div @click="queryData('6')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_3"></div>
                                    <font :class="[statusType == '6' ? 'ly_right_act' : 'ly_right']">已安装</font>
                                </div>
                                <div @click="queryData('8')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_1"></div>
                                    <font :class="[statusType == '8' ? 'ly_right_act' : 'ly_right']">已验收</font>
                                </div>
                                <div @click="queryData('7')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_6"></div>
                                    <font :class="[statusType == '7' ? 'ly_right_act' : 'ly_right']">未安装</font>
                                </div>
                                <div @click="queryData('10')" class="flex-row cursor_pointer">
                                    <div class="ly_left ly_color_4"></div>
                                    <font :class="[statusType == '10' ? 'ly_right_act' : 'ly_right']">需销项</font>
                                </div>
                            </div>
                            <div v-for="(item,index) in typeNameRoom" :key="index" class="ly_detail_con flex-row">
                                <div class="ly_num_con flex-center">{{item.Ffloor}}<br/>层</div>
                                <div class="flex-row pt20" style="flex-wrap:wrap;align-items: center;width:96%;">
                                    <div @click="openPopup(sitem)" v-for="(sitem,sindex) in item.typeList" :key="sindex" class="flex-colulmn pt10 cursor_pointer">
                                        <div v-if="sitem.FStatus == '5'" class="ly_right_con ly_color_3"></div>
                                        <div v-if="sitem.FStatus == '7'" class="ly_right_con ly_color_1"></div>
                                        <div v-if="sitem.FStatus < '5'" class="ly_right_con ly_color_6"></div>
                                        <div v-if="sitem.FStatus == '6'" class="ly_right_con ly_color_4"></div>
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
                    <div class="ly_pstep_con1 flex-row" style="justify-content:flex-start;">
                        <div class="flex-column flex-center">
                            <img class="icon_complete mb8" src="../img/complete.png" alt="">
                            <font class="ft_2">已安装</font>
                        </div>
                        <div class="flex-column flex-center" style="margin-left: 40%;">
                            <div v-if="FStatus < '6' && !FChangeRemarkXX" @click="changeCheck()" class="ly_checkbox flex-center">
                                <i v-if="FStatusFirst == '7'" class="el-icon-check"></i>
                            </div>
                            <img v-if="FStatus == '7' && !FChangeRemarkXX" class="icon_complete mb8" src="../img/complete.png" alt="">
                            <img v-if="FStatus == '6' || FChangeRemarkXX" class="icon_ban mb8" src="../img/ban.png" alt="">
                            <font :class="[FStatus == '7' && !FChangeRemarkXX ? 'ft_2' : 'ft_4']">已验收</font>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="ly_remark_con flex-row">
                        <div @click="addRemark" class="flex-row cursor_pointer">
                            <i class="icon_add el-icon-circle-plus-outline"></i>
                            <font class="ft_5">添加销项</font>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-dialog 
                width="30%"
                title="添加销项"
                :visible.sync="innerVisible"
                append-to-body>
                <el-input placeholder="请输入备注信息" v-model="FChangeRemarkXX1"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button size='small' @click="innerVisible = false">取 消</el-button>
                    <el-button size='small' type="primary" @click="changeRemark">确 定</el-button>
                </span>
            </el-dialog>
            <el-row>
                <el-col :span="24">
                    <div v-if="FChangeRemarkXX" class="ly_input_con flex-row">
                        <div class="flex-center-ali">
                            <div class="ly_status_1 flex-center">待销项</div>
                            <font @click="addRemark('CChange')" class="ft_6 cursor_pointer">{{FChangeRemarkXX}}</font>
                        </div>
                        <i v-if="!FChangeRemarkXXFirst" @click="deleteRemark" class="icon_remove cursor_pointer el-icon-remove"></i>
                        <el-button v-if="FChangeRemarkXXFirst" @click="submit('CChange')" size='small' type="success" round>完成销项</el-button>
                    </div>
                    <div v-if="item.FChangeXX == '1'" v-for='(item,index) in changeHistory' :key="index" class="ly_input_con flex-row">
                        <div class="flex-center-ali">
                            <div class="ly_status_2 flex-center">已销项</div>
                            <font class="ft_7">{{item.FChangeRemarkXX}}</font>
                        </div>
                        <font class="ft_8">{{item.FFinishDate}}</font>
                    </div>
                </el-col>
            </el-row>
            <my-upload :fileList='fileList'></my-upload>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button size='small' @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="FStatus != '6'" size='small' type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '1',
            isBatch: false,
            form: {},
            tabName: [],
            PMainID: '',
            PBuild: '',
            tungData: [],
            currentDate: new Date(),
            typeNameRoom: [],
            popupTitle: '',
            dialogVisible: false,
            innerVisible: false,
            FStatus: '',
            FStatusFirst: '',
            FChangeRemarkXX: '',
            FChangeRemarkXX1: '',
            FChangeRemarkXXFirst: '',
            popupInfo: {},
            changeHistory: [],
            fileList: [],
            statusType: '0',
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
                    // console.log(this.PUnitList);
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
                    // console.log(this.tungData);
                }
            })    
        },
        getDetail() {
            let params = {
                "PMainID": this.PMainID    
            }
            this.requestApi('CP_BulkYS_XQ_VO',params).then(res => {
                let data = res.data.records;
                if (res.data.records) {
                    this.form = data[0];
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
            // console.log(params);
            this.requestApi('CP_FloorInfoFJ_VO',params).then(res => {
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.typeNameRoom = this._loop3(res.data.records);
                    this.typeNameRoom = this._loop4(this.typeNameRoom);
                    this.queryFloorDYHX();
                    // console.log(this.typeNameRoom);
                }
            })
        },
        openPopup(item) {
            if (item.FStatus >= 5 ) {
                this.popupTitle = item.Ffloor + item.FRoom;
                this.FStatus = item.FStatus;
                this.FStatusFirst = item.FStatus;
                this.FChangeRemarkXX = item.FChangeRemarkXX;
                this.FChangeRemarkXXFirst = item.FChangeRemarkXX;
                this.popupInfo['submitID'] = item.ID;
                this.popupInfo['FfloorID'] = item.ID;
                this.getRemark();
                if (item.PEnclosureYS) {
                    this.fileList = this._loop1(item.PEnclosureYS);
                    // console.log(this.fileList);
                }
                this.dialogVisible = true;
                // console.log(this.FStatus);
            } else {
                this.$message({
                    message: '未安装！',
                    type: 'warning'
                }); 
            } 
        },
        getRemark() {
            let params = {
                "FfloorID": this.popupInfo['FfloorID'],
                "FType": '3'    
            }
            this.requestApi('CP_RectifyRoom_VO',params).then(res => {
                this.changeHistory = res.data.records;
                // console.log(this.changeHistory);
            })  
        },
        addRemark(flag) {
            if (flag == 'CChange') {
                this.innerVisible = true;
                return
            }
            if (this.FChangeRemarkXX) {
                this.$message({
                    message: '完成销项后才能添加新的销项内容',
                    type: 'warning'
                });
                return
            } 
            this.innerVisible = true;
        },
        deleteRemark() {
            this.FChangeRemark = '';
        },
        changeRemark() {
            this.FChangeRemarkXX = this.FChangeRemarkXX1;
            if (this.FChangeRemarkXX) {
                this.FStatusFirst = '6';
            }
            this.innerVisible = false;
        },
        changeCheck() {
            if (this.FStatusFirst < 7) {
                this.FStatusFirst = '7';
            } else {
                this.FStatusFirst = this.FStatus;
            }
        },
        batchDo() {
            if (this.isBatch) {
                this.$confirm(this.PBuild + '栋的房间全选已验收？')
                .then(_ => {
                    let id = this.popupInfo['submitID'];
                    let params = {
                        'POtype': '3',
                        'PMainID': this.PMainID,
                        'PBuild': this.PBuild
                    }
                    this.submitApi('CP_FloorInfoFJ_VO_Mbatch',params).then(res => {
                        if (res.data.result == 1) {  
                            this.$message.success('修改成功');
                            this.isBatch = false;
                            this.getDetail();
                            this.getFloorRoomInfo();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                })
                .catch(_ => {
                    this.isBatch = false;
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
                    'FStatus': '7',
                    "FType": '3',
                    'FChangeRemarkXX': this.FChangeRemarkXX, 
                    'PEnclosure': arr2.join('|'),
                    // 'FYHDate': this.$moment(this.currentDate).format("YYYY-MM-DD") 
                } 
            } else {
                params = {
                    'FStatus': this.FStatusFirst ? this.FStatusFirst : this.FStatus,
                    "FType": '3',
                    'FChangeRemarkXX': this.FChangeRemarkXX,
                    'PEnclosure': arr2.join('|'),
                    // 'FYHDate': this.$moment(this.currentDate).format("YYYY-MM-DD") 
                } 
            }
            this.submitApi('CP_FloorInfo_MUPDATE',params,id).then(res => {
                // debugger
                if (res.data.result == 1) {  
                    this.$message.success('提交成功');   
                    this.dialogVisible = false;
                    this.queryData();
                    this.getDetail();
                    this.initTungData();
                    // this.getFloorRoomInfo();
                }
            })
        }
    }
}
</script>