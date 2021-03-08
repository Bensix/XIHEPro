<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card paddingStyle='0px' :isShowHead='false'>
                    <slot>
                        <my-step :stepData='stepData' :currentStep='currentStep'></my-step>
                    </slot>
                </my-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <my-card title="基本信息">
                    <slot>
                        <el-row>
                            <el-col :span="24"><h3>{{infoData.FName}}</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col class="mb8" :span='12'>
                               项目经理：{{infoData.FProManager}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               联系方式：{{infoData.FTel}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               项目所在地：{{infoData.FProvince}}{{infoData.FCity}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               项目地址：{{infoData.FAddress}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               项目创建时间：{{infoData.FCreateDate}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               项目交期：{{infoData.FExpectedEndDate}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               产品数量：{{infoData.FProductNum}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               合同金额：{{infoData.FContractPrice}}
                            </el-col>
                            <el-col class="mb8" :span='12'>
                               项目阶段：{{infoData.currentStepName}}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <my-table :tableData="tableData_1" :tableArray="tableArray_1"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>安装计划</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <my-table :tableData="tableData_2" :tableArray="tableArray_2"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>整改记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <my-table :tableData="tableData_7" :tableArray="tableArray_7"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>验收记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col v-for="(item,index) in detailData_3" :key="index">
                                <span>{{item.FCheckDate}}：</span>
                                <span v-if="item.Fstyle == '1'">首件检验</span>
                                <span v-if="item.Fstyle == '2'">过程检验</span>
                                <span v-if="item.Fstyle == '3'">批量检验</span>
                                ，验收结果：<span v-if="item.Fresult == '0'">NG</span><span v-if="item.Fresult == '1'">OK</span>
                                ，验收内容：{{item.FCheckContect}}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>销项记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <my-table :tableData="tableData_7" :tableArray="tableArray_8"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>回款记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <my-table :tableData="tableData_4" :tableArray="tableArray_4"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"> 
                                <span v-if="infoData.FContractPrice">合同金额：{{infoData.FContractPrice}},</span>
                                <span v-if="infoData.FBillPrice">已开票金额：{{infoData.FBillPrice}}，</span>
                                <span v-if="infoData.FNotBillPrice">未开票金额：{{infoData.FNotBillPrice}}，</span>
                                <span v-if="infoData.FPayPrice"> 已回款金额：{{infoData.FPayPrice}}，</span>
                                <span v-if="infoData.FNotPayPrice"> 未回款金额：{{infoData.FNotPayPrice}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>变更记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col v-for="(item,index) in detailData_5" :key="index" :span="24">
                                {{item.FApplyDate}}：{{item.FSJChangeContent}}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>异常记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col v-for="(item,index) in detailData_6" :key="index" :span="24">
                                {{item.FApplyDate}}：异常数量：{{item.FabnormalNum}}，异常说明：{{item.FWhyabnormal}}
                            </el-col>
                        </el-row>
                    </slot>
                </my-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 0,
            stepData: [{}],
            infoData: [],

            tableData_1: [],
            tableArray_1: [
                {
                    value: "fbuild",
                    label: '楼栋'
                },
                {
                    value: "fsumnum",
                    label: "数量"
                },
                {
                    value: "ycl",
                    label: "已测量数量"
                },
                {
                    value: "yxd",
                    label: "已下单数量"
                },
                {
                    value: "ylk",
                    label: "已入库数量"
                },
                {
                    value: "yaz",
                    label: "已安装数量"
                },
            ],
            detailData_1: [],
            tableData_2: [],
            tableArray_2: [
                {
                    value: "FBatchs",
                    label: '批次号'
                },
                {
                    value: "FBuild",
                    label: '楼栋'
                },
                {
                    value: "FNum",
                    label: '数量'
                },
                {
                    value: "FDate",
                    label: '供应交期'
                },
                {
                    value: "FSupplier",
                    label: "安装供应商"
                },
                {
                    value: "FChargeUser",
                    label: "负责人"
                },
                {
                    value: "FPhone",
                    label: "联系方式"
                },
                {
                    value: "FAZPeopleNum",
                    label: "安装人数"
                },
                {
                    value: "FInstallNum",
                    label: "已安装数量"
                },
                {
                    value: "FInstallDate",
                    label: "计划完成时间"
                },
            ],
            detailData_3: [],
            tableData_4: [],
            tableArray_4: [
                {
                    value: "FKDAT",
                    label: '开票日期'
                },
                {
                    value: "KZWI1",
                    label: '发票金额'
                },
                {
                    value: "FPaymentPrice",
                    label: '回款金额'
                },
                {
                    value: "FPaymentDate",
                    label: '回款日期'
                },
            ],
            detailData_5: [],
            detailData_6: [],
            tableData_7: [],
            tableArray_7: [
                {
                    value: 'FBuild',
                    label: '楼栋'
                },
                {
                    value: 'Ffloor',
                    label: '楼层'
                },
                {
                    value: 'FUnit',
                    label: '单元'
                },
                {
                    value: 'FHouse',
                    label: '户型'
                },
                {
                    value: 'FRoom',
                    label: '房号'
                },
                {
                    value: 'FChangeAZ',
                    label: '整改'
                },
                {
                    value: 'FChangeRemark',
                    label: '整改备注'
                },
                {
                    value: 'FCreateDate',
                    label: '创建日期'
                },
                {
                    value: 'FFinishDate',
                    label: '完成日期'
                }
            ],
            tableData_8: [],
            tableArray_8: [
                {
                    value: 'FBuild',
                    label: '楼栋'
                },
                {
                    value: 'Ffloor',
                    label: '楼层'
                },
                {
                    value: 'FUnit',
                    label: '单元'
                },
                {
                    value: 'FHouse',
                    label: '户型'
                },
                {
                    value: 'FRoom',
                    label: '房号'
                },
                {
                    value: 'FChangeXX',
                    label: '销项'
                },
                {
                    value: 'FChangeRemarkXX',
                    label: '销项备注'
                },
                {
                    value: 'FCreateDate',
                    label: '创建日期'
                },
                {
                    value: 'FFinishDate',
                    label: '完成日期'
                }
            ],
            PMainID: ''

        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
        }

        this.initStep();

        this.getDetail_1();
        this.getDetail_2();
        this.getDetail_3();
        this.getDetail_4();
        this.getDetail_5();
        this.getDetail_6();
        this.getDetail_7();
    },
    methods: {
        initData() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_myProjectXQ_VO',params).then(res => {
                // debugger
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.infoData = res.data.records[0];
                    let index = parseInt(this.infoData.FStatus) - 1;
                    this.infoData.currentStepName = this.stepData[index].title;
                    this.$forceUpdate();
                }
            })    
        },

        initStep() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('VO_PjSchedule',params).then(res => {
                if (res.data.records) {
                    this.stepData = res.data.records;
                    this.stepData = this._contrastStepName(this.stepData,this.PMainID);
                    this.initData();
                }
            })
        },

        getDetail_1() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience1_VO',params).then(res => {
                if (res.data.records) {
                    this.tableData_1 = res.data.records;
                    // console.table(this.tableData_1)
                    // console.log(res.data.metaData.colInfo);
                }
            })
        },
        getDetail_2() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience2_VO',params).then(res => {
                if (res.data.records) {
                    this.tableData_2 = res.data.records;
                }
            })
        },
        getDetail_3() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience3_VO',params).then(res => {
                if (res.data.records) {
                    this.detailData_3 = res.data.records;
                }
            })
        },
        getDetail_4() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience4_VO',params).then(res => {
                if (res.data.records) {
                    this.tableData_4 = res.data.records;
                }
            })
        },
        getDetail_5() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience5_VO',params).then(res => {
                if (res.data.records) {
                    this.detailData_5 = res.data.records;
                }
            })
        },
        getDetail_6() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience6_VO',params).then(res => {
                if (res.data.records) {
                    this.detailData_6 = res.data.records;
                }
            })
        },
        getDetail_7() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Rectify_VO',params).then(res => {
                if (res.data.records) {
                    this.tableData_7 = res.data.records;
                }
            })
        }
        
    }
}
</script>