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
                    <my-card :title="title">
                        <slot>
                            <el-row>
                                <el-col :span="12">
                                    <h4>{{infoData.FName}}</h4>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="mb8" :span='12'>
                                    <label>项目经理: {{infoData.FProManager}}</label>
                                </el-col>
                                <el-col class="mb8" :span='12'>
                                    <label>联系方式: {{infoData.FTel}}</label>
                                </el-col>
                                <el-col class="mb8" :span='12'>
                                    <label>项目所在地: {{infoData.FProvince}}{{infoData.FCity}}</label>
                                </el-col>
                                <el-col class="mb8" :span='12'>
                                    <label>项目地址: {{infoData.FAddress}}</label>
                                </el-col>
                                <el-col class="mb8" :span='12'>
                                    <label>项目交期: {{infoData.FExpectedEndDate}}</label>
                                </el-col>
                                <el-col class="mb8" :span='12'>
                                    <label>产品数量: {{infoData.FProductNum}}</label>
                                </el-col>
                            </el-row>
                            <my-table :tableData="tableData" :tableArray="tableArray"></my-table>
                        </slot>
                    </my-card>
                </el-col>
            </el-row>

        
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentStep: 2,
            stepData: [
                {}
            ],
            tableData: [],
            tableArray: [
                {
                    value: 'FBuilding',
                    label: '楼栋'
                },
                {
                    value: 'FNeedDate',
                    label: '需求日期'
                },
                {
                    value: 'FOrderDate',
                    label: '下单时间'
                },
                {
                    value: 'FOrderNum',
                    label: '下单数量'
                }
            ],
            title: '基本信息',
            secondTitle: '项目名称',
            infoData: [],

            PMainID: ''
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
        }

        this.initData();
        this.initStep();
        this.initTable();
    },
    methods: {
        initStep() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('VO_PjSchedule',params).then(res => {
                if (res.data.records) {
                    this.stepData = res.data.records;
                    this.stepData = this._contrastStepName(this.stepData,this.PMainID);
                }
            })
        },
        initData() {
            let params = {
                "PMainID": this.PMainID
            }
            this.requestApi('CP_myProjectXQ_VO',params).then(res => {
                if (res.data.records) {
                    this.infoData = res.data.records[0];
                }
            })    
        },
        initTable() {
            let params = {
                "PMainID": this.PMainID
            }
            this.requestApi('CP_XDDetail_VO',params).then(res => {
                // console.log(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.tableData = res.data.records;
                    // console.log(res.data.records)
                }
            })    
        },
    }
}
</script>