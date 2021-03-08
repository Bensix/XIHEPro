<template>
    <div class="mg10 bussiness">
        <el-row>
            <el-col :span="24">
                <my-card :isShowHead='false'>
                    <slot>
                        <div class="flex-center-ali mb20">
                            <img class="icon_title" src="../img/title_icon.png" alt="">
                            <div class="ft_title">{{infoData.FName}}</div>
                        </div>
                        <el-row class="m0">
                            <el-col class="mb16" :span="8">
                                <label>报备单位：{{infoData.FCreateArea1}}</label>
                            </el-col>
                            <el-col class="mb16" :span="8">
                                <label>完成报备日期：{{infoData.FReportDate}}</label>
                            </el-col>
                            <el-col class="mb16" :span="8">
                                <label>商机负责人：{{infoData.FBOManager}}</label>
                            </el-col>
                            <el-col class="mb16" :span="8">
                                <label>商机状态：{{infoData.FState}}</label>
                            </el-col>
                            <el-col v-if="type == '1'" class="mb16" :span="8">
                                <label>九牧业务经理：{{infoData.FJMManager}}</label>
                            </el-col>
                            <el-col class="mb16" :span="8">
                                <label>商机进度：{{FSchedule[infoData.FSchedule - 1]}}</label>
                            </el-col>
                            <el-col :span="8">
                                <label>所属业务单位：{{infoData.FOrgName}}</label>
                            </el-col>
                        </el-row>
                    </slot>
                </my-card>
            </el-col>
        </el-row>
        <div class="ly_card" style="width:100%;margin-bottom:16px;">
            <div class="ly_card_body" style="0px;">
                <my-step :stepData='stepData' :currentStep='currentStep'></my-step>
            </div>
        </div>
        <el-row :gutter="20">
            <el-col :span="15">
                <my-card paddingStyle='0px' title="商机进度">
                    <slot>
                        <div class="ly_card_body_height">

                            <el-row v-if="type == '1' &&  (index < infoData.FSchedule || currentStatus == '3')" v-for="(item,index) in messList" :key="index" class="m0">
                                <el-col :span="24">
                                    <el-row class="mt16">
                                        <el-col :span="12">
                                            <div class="flex-center-ali">
                                                <img class="icon_title" src="../img/left_label.png" alt="">
                                                <div class="ft_secondtitle">{{item.step}}</div>
                                            </div>
                                        </el-col>
                                        <el-col class="text-right" :span="12">
                                            <img @click='leftOpenNewPopup(index + 1,item.step,stepData[index].status)' class="icon_edit cursor_pointer" src="../img/right_edit.png" alt="">
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb8" v-for="(sitem,sindex) in item.secondList" :key="sindex">
                                        <el-col :span='24'>
                                            <label>{{sitem.name}}：{{sitem.value}}</label>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('20')" v-if="sitem.label =='FOpponentAnalysis'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('21')" v-if="sitem.label =='FXQCOFL'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('23')" v-if="sitem.label =='FXQYDFJ'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('24')" v-if="sitem.label =='FProjectedDemand'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('25')" v-if="sitem.label =='FProductQuotation'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('22')" v-if="sitem.label =='FLoseBidAnalysis'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('27')" v-if="sitem.label =='FKHLXR'" type="text">点击查看详情</el-button>
                                            <!-- <label v-if="sitem.label == 'FKHLXR'" v-for="(titem,tindex) in customerMess" :key="tindex">{{titem.Maker}}({{titem.FPost}}) {{titem.FPhone}}</label>   -->
                                        </el-col>
                                        <el-col v-if="sitem.label =='FPurchasingUnit'" class="mt8" :span='24'>
                                            <el-image 
                                                v-for='(titem,tindex) in tableData_3' :key="tindex"
                                                @click="downLoadImg(titem.thumbnail)" class="cursor_pointer"
                                                style="width:100px;height:100px;margin-right:20px;"
                                                :src="url_front + titem.thumbnail"
                                                >
                                            </el-image>
                                        </el-col>
                                        <el-col v-if="sitem.label =='FScenePhotos'" class="mt8" :span='24'>
                                            <el-image 
                                                v-for='(titem,tindex) in tableData_4' :key="tindex"
                                                @click="downLoadImg(titem.thumbnail)" class="cursor_pointer"
                                                style="width:100px;height:100px;margin-right:20px;"
                                                :src="url_front + titem.thumbnail"
                                                >
                                            </el-image>
                                        </el-col>
                                        <el-col class="mt8" v-if="sitem.label =='FTenderWitness'" :span='24'>
                                            <el-table
                                                :data="tableData_1"
                                                border>
                                                <el-table-column
                                                    v-for="(item,index) in tableArray"  :key="index"
                                                    :prop="item.value"
                                                    :label="item.label"
                                                    >
                                                </el-table-column>
                                                <el-table-column
                                                    fixed="right"
                                                    label="操作"
                                                    width="100">
                                                    <template slot-scope="scope">
                                                        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>

                            <el-row v-if="type == '2'" v-for="(item,index) in messList_1" :key="index" class="m0">
                                <el-col :span="24">
                                    <el-row class="mt16">
                                        <el-col :span="12">
                                            <div class="flex-center-ali">
                                                <img class="icon_title" src="../img/left_label.png" alt="">
                                                <div class="ft_secondtitle">{{item.step}}</div>
                                            </div>
                                        </el-col>
                                        <el-col class="text-right" :span="12">
                                            <img @click='leftOpenNewPopup(index + 1,item.step,stepData[index].status)' class="icon_edit cursor_pointer" src="../img/right_edit.png" alt="">
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb8" v-for="(sitem,sindex) in item.secondList" :key="sindex">
                                        <el-col :span='24'>
                                            <label>{{sitem.name}}：{{sitem.value}}</label>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('20')" v-if="sitem.label =='FOpponentAnalysis'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('22')" v-if="sitem.label =='FLoseBidAnalysis'" type="text">点击查看详情</el-button>
                                            <el-button style="padding:0;" @click="leftOpenDetailPopup('27')" v-if="sitem.label =='FKHLXR'" type="text">点击查看详情</el-button>
                                            <!-- <label v-if="sitem.label == 'FKHLXR'" v-for="(titem,tindex) in customerMess" :key="tindex">{{titem.Maker}}({{titem.FPost}}) {{titem.FPhone}}</label>   -->
                                        </el-col>
                                        <el-col class="mt8" v-if="sitem.label =='FTenderWitness'" :span='24'>
                                            <el-table
                                                :data="tableData_1"
                                                border>
                                                <el-table-column
                                                    v-for="(item,index) in tableArray"  :key="index"
                                                    :prop="item.value"
                                                    :label="item.label"
                                                    >
                                                </el-table-column>
                                                <el-table-column
                                                    fixed="right"
                                                    label="操作"
                                                    width="100">
                                                    <template slot-scope="scope">
                                                        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                        <el-col class="mt8" v-if="sitem.label =='FbidingDoc'" :span='24'>
                                            <el-table
                                                :data="tableData_2"
                                                border>
                                                <el-table-column
                                                    v-for="(item,index) in tableArray"  :key="index"
                                                    :prop="item.value"
                                                    :label="item.label"
                                                    >
                                                </el-table-column>
                                                <el-table-column
                                                    fixed="right"
                                                    label="操作"
                                                    width="100">
                                                    <template slot-scope="scope">
                                                        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                        <el-col class="mt8" v-if="sitem.label =='FContractFile'" :span='24'>
                                            <el-table
                                                :data="tableData_5"
                                                border>
                                                <el-table-column
                                                    v-for="(item,index) in tableArray"  :key="index"
                                                    :prop="item.value"
                                                    :label="item.label"
                                                    >
                                                </el-table-column>
                                                <el-table-column
                                                    fixed="right"
                                                    label="操作"
                                                    width="100">
                                                    <template slot-scope="scope">
                                                        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                        <el-col class="mt8" v-if="sitem.label =='FProductQuotation2'" :span='24'>
                                            <el-table
                                                :data="tableData_6"
                                                border>
                                                <el-table-column
                                                    v-for="(item,index) in tableArray"  :key="index"
                                                    :prop="item.value"
                                                    :label="item.label"
                                                    >
                                                </el-table-column>
                                                <el-table-column
                                                    fixed="right"
                                                    label="操作"
                                                    width="100">
                                                    <template slot-scope="scope">
                                                        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </slot>
                </my-card>
            </el-col>
            <el-col :span="9">
                <my-card paddingStyle='0px' title="商机待办">
                    <slot>
                        <div class="ly_card_body_height">
                            <el-row>
                                <el-col :span="24">
                                    <el-collapse v-model="activeName" accordion>
                                        <el-collapse-item v-if="type == '1'" name="1">
                                            <template slot="title">
                                                <img class="icon_collapse" src="../img/collapse_icon.png" alt="">流程待办
                                            </template>
                                            <el-row>
                                                <el-col :span="24">
                                                    <div v-if="flowPathData.FTitle" @click="toFlowPage" class="label_txt">{{flowPathData.FTitle}} {{flowPathData.FStartDate}}</div>
                                                </el-col>
                                            </el-row>
                                        </el-collapse-item>
                                        <el-collapse-item v-if="type == '1'" name="2">
                                            <template slot="title">
                                                <img class="icon_collapse" src="../img/collapse_icon.png" alt="">进度反馈提醒
                                            </template>
                                            <div role="alert" class="el-alert el-alert--warning is-light">
                                                <div class="el-alert__content">
                                                    <div class="flex-row">
                                                        <i class="el-alert__icon el-icon-warning" style="margin-right: 10px;"></i>
                                                        <span v-if="todays && todays >= 30 && todays < 55" class="el-alert__title">此阶段已超过30天未更新，请及时进行进度反馈</span>
                                                        <span v-if="todays && todays >= 55" class="el-alert__title">此阶段已超过55天未更新，请及时进行进度反馈</span>
                                                    </div>
                                                    <el-button @click="rightOpenNewWindow('1','102')" size="small" type="primary">进度反馈</el-button>
                                                </div>  
                                            </div>
                                        </el-collapse-item>
                                        <div v-if="type == '1'" @click='rightOpenNewWindow(index + 1,item.step)' v-for="(item,index) in needDealList_1" class="el-collapse-item">
                                            <div role="button" class="el-collapse-item__header hover-class">
                                                <img class="icon_collapse" src="../img/collapse_icon.png" alt="">{{item.name}} 
                                                <i v-if="item.step" class="el-collapse-item__arrow el-icon-arrow-right"></i>
                                            </div>
                                        </div>
                                        <div v-if="type == '2'" @click='rightOpenNewWindow(index + 1,item.step)' v-for="(item,index) in needDealList_2" class="el-collapse-item">
                                            <div role="button" class="el-collapse-item__header hover-class">
                                                <img class="icon_collapse" src="../img/collapse_icon.png" alt="">{{item.name}} 
                                                <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
                                            </div>
                                        </div>
                                    </el-collapse>
                                </el-col>
                            </el-row>
                        </div>
                    </slot>
                </my-card>
            </el-col>
        </el-row>
        <el-dialog
            :close-on-click-modal='false'
            :visible.sync="dialogVisible"
            width="800px"
            >
            <iframe id="siframe" name="siframe" :src="url" style="width:100%;height: 700px;" frameborder="0"></iframe>
        </el-dialog>

    </div>
</template>

<script>

export default { 
    data () {
        return {
            popupTitle: '',
            currentStep: 3,
            stepData: [{}],
            activeName: '0',
            messList: [],
            messList_1: [],
            needDealList_1: [],
            needDealList_2: [],

            infoData: [],
            FStatus: ['暂存','线索','报备中','完成报备','驳回','暂停','关闭','已认领','已复盘'],
            currentStatus: '',
            FSchedule: [
                '了解项目','验证机会','确认机会','方案制定','方案提交和谈判',
                '合同谈判','合同签订','履约','终止跟进','','信息采集','商机判定',
                '产品设计','方案报价','样板交付','合同签订','终止跟进'
            ],
            FPJtype: ['新建','扩建','改造'],
            FRepurchase: ['是','否'],
            FStrategic: ['是','否'],
            FProSchedule: ['构思立项','方案设计','主体施工','主体施工过半','封顶','幕墙','室内装修'],
            FBrand: ['九牧','小牧优品','睿欧'],
            FCrossArea: ['未跨区','跨小区','跨大区'],
            FOpportunityPoint: ['地产精装','长租公寓','政采信息化','厕所革命','美丽乡村','军民融合','节能环保','新基建','其他'],
            FUsers: ['百强地产','区域地产','酒管连锁','建设集团','装饰连锁','政企','央企','医疗机构','教育科研机构','其他'],
            FModelMake: ['需样板间制作','无需样板间制作'],
            FCurrency: ['','人民币','美元'],
            FOnly: ['是','否'],
            FOpponentAnalysis: ['产品描述','产品编码','对手品牌','对手型号','对手价格','材料费对比','安装费对比','操作'],
            FWinBid: ['未中标','已中标'],
            FSupplierSort: ['集团直供','商用直供','工程供货','西河直供'],
            FAreaType: ['全国性项目','单一项目','区域性项目'],
            FCompeting: ['','恒洁','箭牌','中宇','惠达','英皇','和成','安华','法恩莎','摩恩','浪鲸','航标','乐家','高仪','美标','TOTO','科勒','其它'],
            FModelBrand: ['九牧','恒洁','箭牌','中宇','惠达','英皇','和成','安华','法恩莎','摩恩','浪鲸','航标','乐家','高仪','美标','TOTO','科勒','其它'],
            FBiddRate: ['招标','答疑投标','开标','评标','中标','公示'],
            FSupplyStaus: ['未供货','供货中','供货完成'],
            tableData_1: [],
            tableData_2: [],
            tableData_3: [],
            tableData_4: [],
            tableData_5: [],
            tableData_6: [],
            tableArray: [
                {
                    value: 'name',
                    label: '文件名'
                },
                {
                    value: 'uploader',
                    label: '创建人'
                },
                {
                    value: 'upTime',
                    label: '创建时间'
                },
                {
                    value: 'size',
                    label: '大小'
                }
            ],
            infoBussinessData: [],
            id: '',
            type: '',
            dialogVisible: false,
            url: '',
            url_front: process.env.API_URL,
            timer: '',
            customerMess: [],
            customerS5Mess: [],
            flowPathData: [],
            popupFlag: false,
            todays: ''
        }
    },
    created() {
        this.loadData();
        if (this.$route.query.id) {
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
        }
        if (this.type == '2') {
            this.initStep();
            // this.getInputDataInfo();
        } else {
            this.initStep_1();
        }
        
        this.initData();
        this.initBussinessData();
        this.getCustomerMess();
        this.getFlowPath();
    },
    mounted() {
        clearInterval(this.timer);
    },
    watch: {
        dialogVisible(oldVal,newVal) {
            if (newVal) {
                this.url = '';
                clearInterval(this.timer);
                this.initData();
                this.initBussinessData();
                this.getCustomerMess(); 
                this.getFlowPath();
                if (this.type == '2') {
                    this.initStep();
                } else {
                    this.initStep_1();
                }
            }
        }
    },
    methods: {
        // getInputDataInfo() {
        //     let params = {"FBoID": this.id};
        //     this.requestApi('CP_InPutDataInfo_MInput',params).then(res => {
        //         debugger
        //     })
        // },
        toFlowPage() {
            let url = this.url_front + '/' + this.flowPathData.FUrl + '&stepId=11';
            // console.log(url);
            window.open(url,'_blank')
        },
        async loadData() {
            this.messList = await this.$jsonApi.json('messList');
            this.messList_1 = await this.$jsonApi.json('messList_1');
            this.needDealList_1 = await this.$jsonApi.json('needDealList_1');
            this.needDealList_2 = await this.$jsonApi.json('needDealList_2');  
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        initStep() {
            let params = {"ID": this.id};
            this.requestApi('VO_XHSJSchedule_V',params).then(res => {
                if (res.data.records) {
                    this.stepData = this.loop_2(res.data.records);
                    for (let i = 0; i < this.stepData.length; i ++) {
                        this.stepData[i].bussinessId = this.id;
                        this.stepData[i].type = this.type;
                    }
                    // console.log(this.stepData);
                }
            })
        },
        initStep_1() {
            let params = {"ID": this.id};
            this.requestApi('VO_SJSchedule_V',params).then(res => {
                // debugger
                if (res.data.records) {
                    this.stepData = this.loop_2(res.data.records);
                    for (let i = 0; i < this.stepData.length; i ++) {
                        this.stepData[i].bussinessId = this.id;
                        this.stepData[i].type = this.type;
                    }
                    if (this.type == '1' && this.stepData[0].Status == null && !this.popupFlag) {
                        this.popupFlag = true;
                        this.leftOpenNewPopup('1');
                    }
                }
            })
        },
        initData() {
            let params = {
                "id": this.id
            }
            this.requestApi("VO_SJSechedule_V",params).then(res => {
                if (res.data.records) {
                    this.infoData = res.data.records[0];
                    let index = this.infoData.FState;
                    this.currentStatus = index;
                    this.infoData.FState = this.FStatus[index];
                    this.todays = this.infoData.todays ? parseInt(this.infoData.todays) : null;
                    this.$forceUpdate();
                }
            })
        },

        getCustomerMess() {
            let params = {
                "FSO": this.id
            }
            this.requestApi("App_CRM_MakerList_V",params).then(res => {
                if (res.data.records) {
                    this.customerMess = res.data.records;
                }  
            })
        },

        getS5Data() {
            let params = {
                "FProjectId": this.id
            }
            this.requestApi("VO_PCModelPay_Install",params).then(res => {
                // debugger
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    let customerS5Mess = res.data.records[0];
                    // console.log(this.messList_1[4])
                    this.messList_1[4].secondList[0].value = customerS5Mess.FOrderNum;
                    this.messList_1[4].secondList[1].value = customerS5Mess.FShippedNum;
                    this.messList_1[4].secondList[2].value = customerS5Mess.FSReceivedNum;
                    this.messList_1[4].secondList[3].value = customerS5Mess.FSInstall;
                    this.messList_1[4].secondList[4].value = customerS5Mess.FCheckNum;
                    this.$forceUpdate();
                }  
            }) 
        },

        getFlowPath() {
            let params = {
                "FProjectId": this.id
            }
            this.requestApi("VO_CrmBoToDoWork",params).then(res => {
                if (res.data.records) {
                    this.flowPathData = res.data.records[0];
                    // console.log(this.flowPathData);
                }  
            }) 
        },

        initBussinessData() {
            let params = {
                "id": this.id
            }
            this.requestApi("VO_SJSecheduleInfo",params).then(res => {
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.infoBussinessData = res.data.records[0];
                    if (this.type == '1') {
                        this.messList = this.loop_1(this.infoBussinessData,'1');
                        // console.log(res.data.records[0]);
                    } else if (this.type == '2') {
                        this.messList_1 = this.loop_1(this.infoBussinessData,'2');
                        this.getS5Data();
                    }
                }  
            })
        },

        leftOpenNewPopup(index,step,status) {
            let url = '';
            let FSchedule = '';
            if(this.type == '2') {
                FSchedule = this.infoData.FSchedule - 10; 
            } 
            if (this.type == '1' &&  this.currentStatus != '3' && index > this.infoData.FSchedule) {
                this.$message({
                    message: '暂未完成报备！',
                    type: 'warning'
                });
                return 
            }
            if (this.type == '1' && this.currentStatus == '2') {
                this.$message({
                    message: '审核中不能编辑！',
                    type: 'warning'
                });
                return 
            }
            if (this.type == '2' && this.currentStatus != '3' && index > FSchedule && index !='1' && index != '2') {
                this.$message({
                    message: '暂未完成报备！',
                    type: 'warning'
                });
                return 
            }
            if (this.type == '1') {
                if(index == '5') {
                    index = '4-2';
                }
                if (index > 5) {
                    index = index - 1;
                }
                url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_EditSJS' + index +'&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                if(index == '8') {
                    url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_End&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true'
                }
            } else if (this.type == '2') {
                url =  this.url_front + '/OperateProcessor?operate=CRM_BOInfo_EditS' + index + '&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                if (index == '7') {
                    url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_End&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true'
                } 
            }
            console.log(url);
            this.url = url;
            this.dialogVisible = true;
            // if (this.type == '2' && index == '2' ){ 
            //     setTimeout( ()=> {
            //         this.timer = setInterval(this.getMsgDiv,1000);
            //     },2000)
            //     return 
            // }
            // setTimeout( ()=> {
            //     this.timer = setInterval(this.getBodyDiv,1000);
            // },2000)

            // this.url = 'http://localhost:8080/#/test';
            let _that = this;
            setTimeout( ()=> {
                const siframe = document.querySelector('#siframe')
                siframe.onload = function () {
                    _that.isPageLoaded('2');
                    console.log('iframe已加载完毕')
                }
            }) 
            
        },
        isPageLoaded(flag) {
            if (flag == '1') {
                this.timer = setInterval(this.getBodyDiv,1000);
            } else if (flag == '2') {
                this.timer = setInterval(this.getMsgDiv,1000);
            }
        },
        getBodyDiv() {
            let iframe = document.getElementById('siframe').contentWindow.document;
            if (iframe.querySelector('#bodyDiv') == null) {
                this.dialogVisible = false;
                this.$router.go(0);
            } 
        },
        getMsgDiv() {
            // let iframe = document.getElementById('siframe').contentWindow.document;
            // let node = iframe.getElementById('msg-div');
            // if (node.hasChildNodes()) {
            //     if (!iframe.querySelector('.err-list')) {
            //         this.dialogVisible = false;
            //         this.$router.go(0);
            //     }
            // } 

            let iframe = document.getElementById('siframe').contentWindow.document;
            let node = iframe.getElementById('msg-div');
            if (node == null) {
                return
            }
            if (node.hasChildNodes()) {
                var obj = node.getElementsByTagName('td');
                for (var i = 0, j = obj.length; i < j; i++) {
                    if (obj[i].innerText != '') {
                        var str = obj[i].innerText;
                        if (str.indexOf("成功") != -1) {
                            setTimeout( ()=> {
                                this.dialogVisible = false;
                                this.$router.go(0);
                            },500)
                        }
                    } 
                }
            }
        },
        rightOpenNewWindow(id,step) {
            if (this.currentStatus != '3' && step == '102') {
                this.$message({
                    message: '暂未完成报备！',
                    type: 'warning'
                });
                return 
            }
            let url = '';
            if (!step) {
                return
            } else if (step < 100){
                url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_M' + step + '&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                window.open(url,'_blank');
            } else if (step == '101') {
                url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_Close&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                this.url = url;
                this.dialogVisible = true;
            } else if (step == '100') {
                url = url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_Allot&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                this.url = url;
                this.dialogVisible = true;
                // let _that = this;
                // setTimeout( ()=> {
                //     const siframe = document.querySelector('#siframe')
                //     siframe.onload = function () {
                //         _that.isPageLoaded('1');
                //     }
                // })
            } else if (step == '102') {
                url = url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_FeedBack&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
                this.url = url;
                this.dialogVisible = true;
            }
            console.log(url);
        },
        leftOpenDetailPopup(step) {
            let url = '';
            url = this.url_front + '/OperateProcessor?operate=CRM_BOInfo_M' + step + '&Table=CRM_BOInfo&ID=' + this.id + '&WindowType=1&extWindow=true&PopupWin=true';
            this.url = url;
            this.dialogVisible = true;
        },

        downLoad (row) {
            window.open(this.url_front + row.thumbnail,'_blank');
        },
        downLoadImg(thumbnail) {
            window.open(this.url_front + thumbnail,'_blank');
        },
        loop_1(list,type) {
            let flagList = [];
            if (type == '1') {
                flagList = this.messList;
            } else if (type == '2') {
                flagList = this.messList_1;
            }
            for (let i = 0; i < flagList.length; i++) {
                for (let j = 0; j < flagList[i].secondList.length; j++) {
                    for (let key in list) {
                        if (key == flagList[i].secondList[j].label && list[key] != null) {
                            let index = list[key];
                            if (key == 'FPJtype') {
                                flagList[i].secondList[j].value = this.FPJtype[index];
                            } else if (key == 'FRepurchase') {
                                flagList[i].secondList[j].value = this.FRepurchase[index];
                            } else if ( (key == 'FStrategic' || key == 'FDeliveryLoading' || key == 'FBidding' || key == 'FOlnyBidd')) {
                                flagList[i].secondList[j].value = this.FStrategic[index];
                            } else if (key == 'FProSchedule') {
                                flagList[i].secondList[j].value = this.FProSchedule[index];
                            } else if (key == 'FBrand') {
                                let str = index;
                                str = this.loop_5(str);
                                flagList[i].secondList[j].value = str;
                            } else if (key == 'FCrossArea') {
                                flagList[i].secondList[j].value = this.FCrossArea[index];
                            } else if (key == 'FOpportunityPoint') {
                                flagList[i].secondList[j].value = this.FOpportunityPoint[index];
                            } else if (key == 'FUsers') {
                                flagList[i].secondList[j].value = this.FUsers[index];
                            } else if (key == 'FModelMake') {
                                flagList[i].secondList[j].value = this.FModelMake[index];
                            } else if (key == 'FCurrency') {
                                flagList[i].secondList[j].value = this.FCurrency[index];
                            } else if (key == 'FOnly') {
                                flagList[i].secondList[j].value = this.FOnly[index];
                            } else if (key == 'FOpponentAnalysis') {
                                flagList[i].secondList[j].value = this.FOpponentAnalysis[index];
                            } else if (key == 'FWinBid') {
                                flagList[i].secondList[j].value = this.FWinBid[index];
                            } else if (key == 'FSupplierSort') {
                                flagList[i].secondList[j].value = this.FSupplierSort[index];
                            } else if (key == 'FAreaType') {
                                flagList[i].secondList[j].value = this.FAreaType[index];
                            } else if (key == 'FCompeting') {
                                let str = index;
                                str = this.loop_4(str);
                                flagList[i].secondList[j].value = str; 
                            } else if (key == 'FModelBrand') {
                               flagList[i].secondList[j].value = this.FModelBrand[index]; 
                            } else if (key == 'FBiddRate') {
                               flagList[i].secondList[j].value = this.FBiddRate[index]; 
                            } else if (key == 'FSupplyStaus') {
                               flagList[i].secondList[j].value = this.FSupplyStaus[index]; 
                            } else if (key == 'FTenderWitness' ) {
                                this.tableData_1 = this._loop1(list[key]);
                            } else if (key == 'FbidingDoc' ) {
                                this.tableData_2 = this._loop1(list[key]);
                            } else if (key == 'FPurchasingUnit' ) {
                                this.tableData_3 = this._loop1(list[key]);
                            } else if (key == 'FScenePhotos' ) {
                                this.tableData_4 = this._loop1(list[key]);
                            } else if (key == 'FContractFile' ) {
                                this.tableData_5 = this._loop1(list[key]);
                            } else if (key == 'FProductQuotation2' ) {
                                this.tableData_6 = this._loop1(list[key]);
                            } else if (key == 'FCreateDate' || key == 'FModelPutDate' || key == 'FbidingDate'
                               || key == 'FFirstDate' || key == 'FSignDate' || key == 'FContractDate' || key == 'FWinBidDate')
                            {
                                flagList[i].secondList[j].value = list[key].substring(0,10); 
                            }
                            else {
                                flagList[i].secondList[j].value = list[key];
                            }
                        }
                    }
                }
            }
            return flagList;
        },

        loop_2 (list) {
            for (let i = 0; i < list.length; i++ ) {
                list[i].description = list[i].FSJDate;
                list[i].status = list[i].Status;
            }
            return list;
        },
        loop_4 (str) {
            let obj = [];
            obj = str.split(";");
            str = '';
            for (let i = 0; i < obj.length; i ++ ) {
                let index = obj[i];
                str = str + ' ' + this.FCompeting[index];
            }
            // console.log(str);
            return str;
        },
        loop_5 (str) {
            let obj = [];
            obj = str.split(";");
            str = '';
            for (let i = 0; i < obj.length; i ++ ) {
                let index = obj[i];
                str = str + ' ' + this.FBrand[index];
            }
            return str;
        },
        
    }
}
</script>