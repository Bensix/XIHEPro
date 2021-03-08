<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='大货安装'>
                    <slot>
                        <my-step :stepData='stepData' :currentStep='currentStep'></my-step>
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
                               
                                <el-col :span="12">
                                    <el-form-item label="已下单数量">
                                        <el-input size='small' v-model="form.FBulkNumXD" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已发货数量">
                                        <el-input size='small' v-model="form.FBulkNumCH" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已具备安装面">
                                        <el-input size='small' v-model="form.FFaceNum" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已收货数量">
                                        <el-input size='small' v-model="form.FBulkNumSH" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已安装数量">
                                        <el-input size='small' v-model="form.FBulkNumAZ" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="待整改数量">
                                        <el-input size='small' v-model="form.FWaitCNumAZ" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row>
                            <el-col :span="24">
                                <div class="flex-row ly_measure_con">
                                    <div @click="toTungDetail(item)" v-for="(item,index) in tungData" :key="index"
                                        class="flex-column ly_measure_item"  
                                        >
                                        <img class="left_img" src="../img/left_tung.png" alt="">
                                        <div class="status_con status_con flex-center">待安装</div>
                                        <div v-if='item.Fnum == item.FFaceNum && item.Fnum != item.FArrivalNum && item.Fnum != item.FInstallNum' class="status_con flex-center">已具备安装面</div>
                                        <div v-if='item.Fnum == item.FFaceNum && item.Fnum == item.FArrivalNum && item.Fnum != item.FInstallNum' class="status_con flex-center">产品到货完成</div>
                                        <div v-if='item.Fnum == item.FFaceNum && item.Fnum == item.FArrivalNum && item.Fnum == item.FInstallNum' class="status_con status_con flex-center">产品安装完成</div>
                                        <div v-if='item.FWaitChangeNum > 0' class="back_unfinsh status_con flex-center">异常</div>
                                        <div class="flex-row" style="justify-content:space-around;">
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">具备安装面</font>
                                                <font class="ft_num">{{item.FFaceNum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">产品到货</font>
                                                <font class="ft_num">{{item.FArrivalNum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">安装完成</font>
                                                <font class="ft_num">{{item.FInstallNum}}</font>
                                            </div>  
                                        </div>
                                        <div class="flex-row" style="justify-content:space-around;">
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">待整改</font>
                                                <font class="ft_num">{{item.FWaitChangeNum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">已整改</font>
                                                <font class="ft_num">{{item.FEndChangeNum}}</font>
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
    data() {
        return {
            currentStep: 7,
            stepData: [{}],
            form: {},
            tungData: [],
            PMainID: ''
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
        }

        this.initStep();
        this.getDetail();
        this.initTungData();
    },
    methods: {
        initTungData() {
            let params = {
                "PMainID": this.PMainID
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
                    console.log(this.tungData);
                }
            })    
        },
        initStep() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('VO_PjSchedule',params).then(res => {
                if (res.data.records) {
                    this.stepData = res.data.records;
                    this.stepData = this._contrastStepName(this.stepData,this.PMainID);
                    // console.log(this.stepData);
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
        toTungDetail(item) {
            this.$router.push({path: 'bigInstallationTungDetail', query: {'PMainID': this.PMainID,'PBuild': item.FBuild}});
        },
    }
}
</script>