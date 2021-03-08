<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title="新增商机">
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="产业">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="商机名称">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="商机进度">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="营销中心">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="合作类型">
                                        <el-input size='small' v-model="form.FName" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
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
            form: {
                FName: ''
            }
        }
    },
    created() {

    },
    methods: {

    }
}
</script>