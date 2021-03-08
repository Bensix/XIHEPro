<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='安装'>
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24 mg0">
                                <el-col :span="12">
                                    <el-form-item label="商机名称">
                                        <el-input size='small' v-model="form.FProjectName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目经理">
                                        <el-input size='small' v-model="form.Fprojectmanager" :disabled="true"></el-input>
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
                                    <el-form-item label="已下单数量">
                                        <el-input size='small' v-model="form.FOrderNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已发货数量">
                                        <el-input size='small' v-model="form.FShippedNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已具备安装面">
                                        <el-input size='small' v-model="form.FSMounting" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已收货数量">
                                        <el-input size='small' v-model="form.FSReceivedNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已安装数量">
                                        <el-input size='small' v-model="form.FSInstall" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待整改数量">
                                        <el-input size='small' v-model="form.FSRectification" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="12">
                                    <el-form-item label="安装日期">
                                        <el-date-picker size='small' type="date" placeholder="" v-model="today" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="ly_house_con pd24">
                            <div class="flex-row ly_state_con">
                               <div class="flex-row">
                                    <div class="ly_left ly_color_1"></div>
                                    <font class="ly_right">已具备安装面</font>
                                </div>
                                <div class="flex-row">
                                    <div class="ly_left ly_color_2"></div>
                                    <font class="ly_right">产品到货完成</font>
                                </div>
                                <div class="flex-row">
                                    <div class="ly_left ly_color_3"></div>
                                    <font class="ly_right">产品安装完成</font>
                                </div>
                                <div class="flex-row">
                                    <div class="ly_left ly_color_4"></div>
                                    <font class="ly_right">需整改</font>
                                </div>
                                <div class="flex-row">
                                    <div class="ly_left ly_color_7"></div>
                                    <font class="ly_right">已验收</font>
                                </div>
                                <div class="flex-row">
                                    <div class="ly_left ly_color_5"></div>
                                    <font class="ly_right">未到货</font>
                                </div>
                            </div>
                            <div class="ly_detail_con flex-row">
                                <div class="flex-row pt20" style="flex-wrap:wrap;align-items: center;width:96%;">
                                    <div @click="openPopup(item)" v-for="(item,index) in typeNameRoom" :key="index" class="flex-colulmn pt10 cursor_pointer">
                                        <div v-if="item.FStatus == '3'" class="ly_right_con ly_color_1"></div>
                                        <div v-if="item.FStatus == '2'" class="ly_right_con ly_color_2"></div>
                                        <div v-if="item.FStatus == '5' || item.FStatus == '6'" class="ly_right_con ly_color_3"></div>
                                        <div v-if="item.FStatus == '4'" class="ly_right_con ly_color_4"></div>
                                        <div v-if="item.FStatus == '7'" class="ly_right_con ly_color_7"></div>
                                        <div v-if="item.FStatus == '1' || item.FStatus == null" class="ly_right_con ly_color_5"></div>
                                        <font class="ft_1">{{item.FYB}}</font>
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
                            <img class="icon_complete mb8" :src="imgUrl_1" alt="">
                            <font class="ft_2">已到货</font>
                        </div>
                        <div class="flex-column flex-center">
                            <div v-if="FStatus < 3"  @click="changeCheck('FMounting')" class="ly_checkbox flex-center">
                                <i v-if="FStatusFirst == '3' || FStatusFirst == '4' || FStatusFirst == '5'" class="el-icon-check"></i>
                            </div>
                            <img v-if="FStatus >= 3" class="icon_complete mb8" src="../img/complete.png" alt="">
                            <font :class="[FStatus == '7' ? 'ft_2' : 'ft_4']">安装面已具备</font>
                        </div>
                        <div class="flex-column flex-center">
                            <div v-if="FStatus != '7' && FStatus != '4' && !FRecRemark" @click="changeCheck('Finstall')" class="ly_checkbox flex-center">
                                <i v-if="FStatusFirst == '5' || FStatusFirst == '6'" class="el-icon-check"></i>
                            </div>
                            <img v-if="FStatus == '7' && !FRecRemark" class="icon_complete mb8" src="../img/complete.png" alt="">
                            <img v-if="FStatus == '4' || FRecRemark" class="icon_ban mb8" src="../img/ban.png" alt="">
                            <font :class="[FStatus == '7' && !FRecRemark ? 'ft_2' : 'ft_4']">已安装</font>
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
                <el-input placeholder="请输入备注信息" v-model="FRecRemark1"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button size='small' @click="innerVisible = false">取 消</el-button>
                    <el-button size='small' type="primary" @click="changeRemark">确 定</el-button>
                </span>
            </el-dialog>
            <el-row>
                <el-col :span="24">
                    <div v-if="FRecRemark" class="ly_input_con flex-row">
                        <div class="flex-center-ali">
                            <div class="ly_status_1 flex-center">待整改</div>
                            <font @click="addRemark('CChange')" class="ft_6 cursor_pointer">{{FRecRemark}}</font>
                        </div>
                        <i v-if="!FRecRemarkFirst" @click="deleteRemark" class="icon_remove cursor_pointer el-icon-remove"></i>
                        <el-button v-if="FRecRemarkFirst" @click="submit('CChange')" size='small' type="success" round>完成整改</el-button>
                    </div> 
                    <div v-if="item.FFinishDate" v-for='(item,index) in changeHistory' :key="index" class="ly_input_con flex-row">
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
                <el-button v-if="FStatus != '4' && FStatus != '7' && FStatus != '6'" size='small' type="primary" @click="submit()">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data () {
        var imgUrl_1 = require('../img/complete.png');
        var imgUrl_2 = require('../img/ban.png');
        return {
            form: {},
            dialogVisible: false,
            innerVisible: false,
            // FOrderNo: '121011300014',
            // FProjectId: '34491',
            FOrderNo: '',
            FProjectId: '',
            today: new Date(),
            FRoomNumber: '',
            typeNameRoom: [],
            popupTitle: '',

            imgUrl_1: imgUrl_1,
            imgUrl_2: imgUrl_2,
            FRecRemark: '',
            FRecRemarkFirst: '',
            FRecRemark1: '',
            FStatus: '',
            FStatusFirst: '',
            id: '',
            changeHistory: [],
            fileList: []
        }
    },
    created() {
        if (this.$route.query.FProjectId) {
            // this.FOrderNo = this.$route.query.FOrderNo;
            this.FProjectId = this.$route.query.FProjectId;
        }
        // this.getDetail();
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
        getMessData() {
            let params = {
                "FProjectId": this.FProjectId    
            }
            this.requestApi('VO_ModelBOInfo',params).then(res => {
                if (res.data.records) {
                    // this.form.FProjectName = res.data.records[0].FProjectName;
                    // this.form.FProvince = res.data.records[0].FProvince;
                    // this.form.FCity = res.data.records[0].FCity;
                    // this.form.Fprojectmanager = res.data.records[0].Fprojectmanager;
                    // console.log(this.form);
                    this.$forceUpdate();
                }
            })
        },
        getDetail() {
            let params = {
                "FProjectId": this.FProjectId    
            }
            this.requestApi('VO_ModelPayList',params).then(res => {
                if (res.data.records) {
                    this.form = res.data.records[0];
                    // console.log(this.form);
                    
                }
            })
        },
        getFloorRoomInfo() {
            let params = {
                "FProjectId": this.FProjectId    
            }
            this.requestApi('VO_ModelPay_Install',params).then(res => {
                if (res.data.records) {
                    this.typeNameRoom = res.data.records;
                    // console.log(this.typeNameRoom);
                    this.form = res.data.records[0];
                    // this.getMessData();
                }
            })
        },
        openPopup(item) {
            // console.log(item);
            if (item.FStatus != '1' && item.FStatus != null) {
                this.popupTitle = item.FYB;
                this.FStatus = item.FStatus;
                this.FStatusFirst = item.FStatus;
                this.FRecRemark = item.FRecRemark;
                this.FRecRemarkFirst = item.FRecRemark;
                this.id = item.FMeasureId;
                this.getRemark();
                if (item.FInstallEnclosure) {
                    this.fileList = this._loop1(item.FInstallEnclosure);
                }
                this.dialogVisible = true;
            } else {
                this.$message({
                    message: '未到货！',
                    type: 'warning'
                }); 
            }
        },
        getRemark() {
            let params = {
                "FMeasureId": this.id,   
            }
            this.requestApi('VO_ModelRectifyRecord',params).then(res => {
                this.changeHistory = res.data.records;
                // console.log(this.changeHistory);
            })  
        },
        addRemark(flag) {
            if (flag == 'CChange') {
                this.innerVisible = true;
                return
            }
            if (this.FRecRemark) {
                this.$message({
                    message: '完成整改后才能添加新的整改内容',
                    type: 'warning'
                });
                return
            }
            if (this.FStatusFirst == '3' || this.FStatusFirst == '5' || this.FStatusFirst == '7') {
                this.FRecRemark1 = this.FRecRemark;
                this.innerVisible = true;
            }
            else {
                this.$message({
                    message: '请先勾选安装面已具备',
                    type: 'warning'
                });
                return
            }
        },
        changeRemark() {
            this.FRecRemark = this.FRecRemark1;
            if (this.FRecRemark) {
                this.FStatusFirst = '4';
            }
            this.innerVisible = false;
        },
        changeCheck(flag) {
            if (flag == 'FMounting') {
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
        deleteRemark() {
            this.FRecRemark = '';
            this.FStatusFirst = this.FStatus;
        },
        submit(flag) {
            if (flag == 'CChange') {
                this.FStatusFirst = '5';
            }
            let arr = this.fileList,arr2 = [];
            for(let i = 0; i < arr.length; i++){
                let str = JSON.stringify(arr[i]);
                arr2.push(str)
            };
            let params = {
               'FInstalledTime': this.$moment(this.today).format("YYYY-MM-DD"),
               'FStatus': this.FStatusFirst,
               'FRecRemark': this.FRecRemark,
               'FOrderNo': this.FOrderNo,
               "FMeasureId": this.id,
               "FProjectId": this.FProjectId,
               "FInstallEnclosure": arr2.join('|'), 
            }
            this.submitApi('VO_ModelPay_Install_M',params).then(res => {
                // debugger
                if (res.data.result == 1) {
                    this.$message.success('提交成功!');     
                    this.dialogVisible = false;
                    // this.getDetail();
                    this.getFloorRoomInfo();
                } else {
                   this.$message.error(res.data.message); 
                }
            })
        }
    }
}
</script>