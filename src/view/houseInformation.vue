<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='户型信息'>
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24 mg0">
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
                                    <el-form-item label="客户经理">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
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
                                    <el-form-item label="项目交期">
                                        <el-date-picker size='small' type="date" :disabled="true" placeholder="" v-model="form.FExpectedEndDate" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="楼栋">
                                        <el-select @change='getFloorRoomInfo' size='small' style="width:100%;" v-model="PBuild" placeholder="请选择">
                                            <el-option
                                                v-for="item in buildOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="ly_house_con pd24">
                            <div v-for="(item,index) in typeNameRoom" :key="index" class="ly_detail_con flex-row">
                                <div class="ly_num_con flex-center">{{item.Ffloor}}<br/>层</div>
                                <div class="flex-row pt20" style="flex-wrap:wrap;align-items: center;width:96%;">
                                    <div v-for="(sitem,sindex) in item.typeList" :key="sindex" class="flex-colulmn pt10">
                                        <div class="ly_right_con ly_color_5"></div>
                                        <font class="ft_1">{{sitem.Ffloor}}{{sitem.FRoom}}</font>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            buildOptions:[],
            typeNameRoom: [],
            PMainID: '',
            PBuild: '',  
        }
    },
    created() {
        if (this.$route.query.PMainID) {
            this.PMainID = this.$route.query.PMainID;
            this.PBuild = this.$route.query.FBuild;
        } 
        this.initData();
        this.initTungData();
        this.getFloorRoomInfo();
    },
    methods: {
        initData() {
            let params = {
                "PMainID": this.PMainID
            }
            this.requestApi('CP_myProjectXQ_VO',params).then(res => {
                if (res.data.records) {
                    this.form = res.data.records[0];
                    // console.log(res.data.records)
                }
            })    
        },
        initTungData() {
            let params = {
                "PMainID": this.PMainID,
            }
            this.requestApi('CP_BuildSumTJ_VO',params).then(res => {
                if (res.data.records) {
                    this.buildOptions = res.data.records;
                    for(let i = 0; i < this.buildOptions.length; i++) {
                        this.buildOptions[i].value =  this.buildOptions[i].FBuild;
                        this.buildOptions[i].label =  this.buildOptions[i].FBuild;
                    }
                    // console.log(this.tungData)
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
                if (res.data.records) {
                    // console.log(res.data.records[0]);
                    this.typeNameRoom = this._loop3(res.data.records);
                }
            })
        },
        
    }
}
</script>