<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='验收管理'>
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
                                        <el-input size='small' v-model="form.FBulkNumXD" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="已发货数量">
                                        <el-input size='small' v-model="form.FBulkNumCH" :disabled="true"></el-input>
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
                                    <el-form-item label="已验收数量">
                                        <el-input size='small' v-model="form.FBulkNumYS" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="12">
                                    <el-form-item label="待销项项量">
                                        <el-input size='small' v-model="form.FWaitCNumXX" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                               
                            </el-row>
                        </el-form>
                        <el-row>
                            <el-col :span="24"><h3>校验记录</h3></el-col>
                        </el-row>
                        <el-row type='flex' justify='center'>
                            <el-col :span="24">
                                <my-table :tableData="tableData" :tableArray="tableArray"></my-table>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><h3>销项记录</h3></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="flex-row ly_measure_con">
                                    <div @click="toTungDetail(item)" v-for="(item,index) in tungData" :key="index"
                                        class="flex-column ly_measure_item"  
                                        >
                                        <img class="left_img" src="../img/left_tung.png" alt="">
                                        <div v-if='item.Fnum == item.FInstallNum' class="status_con flex-center">已安装</div>
                                        <div v-if='item.Fnum == item.FWriteoffNum' class="status_con flex-center">已验收</div>
                                        <div v-if='item.Fnum > item.FWriteoffNum && item.FWriteoffNum != 0' class="status_con flex-center">验收中</div>
                                        <div v-if='item.FWriteoffNum == 0' class="back_unfinsh status_con flex-center">未验收</div>
                                        <div class="flex-row" style="justify-content:space-around;">
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">总数量</font>
                                                <font class="ft_num">{{item.Fnum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">已安装数量</font>
                                                <font class="ft_num">{{item.FInstallNum}}</font>
                                            </div>
                                            <div class="flex-column" style="align-items:center;">
                                                <font class="ft_text">已验收数量</font>
                                                <font class="ft_num">{{item.FWriteoffNum}}</font>
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
            currentStep: 9,
            stepData: [{}],
            form: {},
            tableData: [
                
            ],
            tableArray: [
                {
                    value: 'Fstyle',
                    label: '类型'
                },
                {
                    value: 'FCheckContect',
                    label: '检验内容'
                },
                {
                    value: 'FCheckRemark',
                    label: '检验备注'
                },
                {
                    value: 'FCheckUser',
                    label: '检验人'
                },
                {
                    value: 'FCheckDate',
                    label: '检验日期'
                }
            ],
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
        this.getTestDetail();
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
        getDetail() {
            let params = {
                "PMainID": this.PMainID    
            }
            this.requestApi('CP_BulkYS_XQ_VO',params).then(res => {
                if (res.data.records) {
                    this.form = res.data.records[0];
                    // console.log(this.form);
                }
            })
        },

        getTestDetail() {
            let params = {"PMainID": this.PMainID};
            this.requestApi('CP_Experience3_VO',params).then(res => {
                // console.table(res.data.metaData.colInfo);
                if (res.data.records) {
                    this.tableData = res.data.records;
                    for(let i = 0; i < this.tableData.length; i++ ) {
                        if (this.tableData[i].Fstyle == '1') {
                            this.tableData[i].Fstyle = '首件检验'
                        } else if (this.tableData[i].Fstyle == '2') {
                            this.tableData[i].Fstyle = '过程检验'
                        } else if (this.tableData[i].Fstyle == '3') {
                            this.tableData[i].Fstyle = '批量检验'
                        }
                    }
                    // console.log(this.tableData);
                }
            })
        },
        toTungDetail(item) {
            this.$router.push({path: 'outputTungDetail', query: {'PMainID': this.PMainID,'PBuild': item.FBuild}});
        },
    }
}
</script>