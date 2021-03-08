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

        <!-- <div id="testDiv">{{testInn}}</div> -->
        <!-- <div id="bodyDiv">{{testInn}}</div> -->

        <!-- <el-button @click="close">关闭</el-button> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            testInn: 'test',
            currentStep: 0,
            stepData: [
                {}
            ],
            tableData: [
                
            ],
            tableArray: [
                {
                    value: 'Fmodel',
                    label: '产品型号'
                },
                {
                    value: "FYear",
                    label: '预测年份'
                },
                {
                    value: "FMonth",
                    label: '预测月份'
                },
                {
                    value: "FForecastNum",
                    label: '预测数量'
                }
            ],
            infoData: [
               
            ],

            PMainID: '',
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
        }

        this.initStep()
        this.initData();
        this.initTable();
    },
    methods: {
        close () {
            this.testInn = 'text';
        },
        initData() {
            let params = {
                "PMainID": this.PMainID
            }
            // CP_ForecastXQ_VO
            this.requestApi('CP_myProjectXQ_VO',params).then(res => {
                if (res.data.records) {
                    this.infoData = res.data.records[0];
                    console.log(res.data.records)
                }
            })    
        },
        initTable() {
            let params = {
                "PMainID": this.PMainID
            }
            this.requestApi('CP_ForecastDetail_VO',params).then(res => {
                if (res.data.records) {
                    this.tableData = res.data.records;
                    // console.log(this.tableData)
                }
                // console.log(res.data.metaData.colInfo);
            }) 
        },
        initStep() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('VO_PjSchedule',params).then(res => {
                if (res.data.records) {
                    this.stepData = res.data.records;
                    this.stepData = this._contrastStepName(this.stepData,this.PMainID);
                    // console.table(this.stepData)
                }
            })
        },

        closeDialog() {
            window.parent._closePopup();
        }
    }

    
}
</script>