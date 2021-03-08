<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card paddingStyle='0px' title="测量进度表单">
                    <slot>
                        <my-step :stepData='stepData' :currentStep='currentStep'></my-step>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24">
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
                                    <el-form-item label="已测量数量">
                                        <el-input size='small' v-model="form.FMeasureNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待测量数量">
                                        <el-input size='small' v-model="form.FNotMeasureNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row class="pd24">
                            <el-col :span="24">
                                <div class="flex-row ly_measure_con">
                                    <div @click="toTungDetail(item)" v-for="(item,index) in tungData" :key="index"
                                        class="flex-column ly_measure_item curor_pointer"  
                                        >
                                        <img class="left_img" src="../img/left_tung.png" alt="">
                                        <div v-if="item.FNotMeasureNum == 0" class="back_success status_con flex-center">测量完成</div>
                                        <div v-if="item.FNotMeasureNum == item.Fnum" class="back_unfinsh status_con flex-center">测量未完成</div>
                                        <div v-if="item.FNotMeasureNum < item.Fnum && item.FNotMeasureNum != 0" class="status_con flex-center">测量中</div>
                                        <div class="flex-row" style="justify-content:space-around;">
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">总数量</font>
                                                <font class="ft_num">{{item.Fnum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">已测量</font>
                                                <font class="ft_num">{{item.FMeasureNum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">待测量</font>
                                                <font class="ft_num">{{item.FNotMeasureNum}}</font>
                                            </div>
                                        </div>
                                        <div class="botttom_num flex-center">{{item.FBuild}}栋</div>
                                    </div>
                                </div>
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
    data () {
        return {
            form: {},
            currentStep: 2,
            stepData: [{}],
            title: '',
            tungData: [],
            PMainID: ''
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
        }

        this.initStep();
        this.initTungData();
        this.getDetail();
    },
    methods: {
        initTungData() {
            let params = {
                "PMainID": this.PMainID,
            }
            this.requestApi('CP_BuildSumTJ_VO',params).then(res => {
                if (res.data.records) {
                    this.tungData = res.data.records;
                    for (let i = 0; i < this.tungData.length; i ++) {
                        for (let key in this.tungData[i]) {
                            if (key != 'FBuild') {
                                this.tungData[i][key] = parseInt(this.tungData[i][key]);
                            }
                        }
                    }
                }
            })    
        },
        initStep() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('VO_PjSchedule',params).then(res => {
                if (res.data.records) {
                    this.stepData = res.data.records;
                    this.stepData = this._contrastStepName(this.stepData,this.PMainID);
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
                }
            })
        },
        toTungDetail(item) {
            this.$router.push({path: 'measurementTungProgressDetail', query: {'PMainID': this.PMainID,'PBuild': item.FBuild}});
        },
    }
}
</script>