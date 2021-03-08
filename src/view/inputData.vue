<template>
    <div class="mg10">
        <el-row>
            <el-col :span="24">
                <my-card title='录入资料'>
                    <slot>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-row class="pd24 mg0">
                                <el-col :span="24">
                                    <el-form-item label="项目名称">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="项目地址">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="客户经理">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目经理">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="产品数量">
                                        <el-input size='small' v-model="form.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="12">
                                    <el-form-item label="项目交期">
                                        <el-date-picker size='small' type="date" :disabled="true" placeholder="" v-model="form.date" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                        >
                            <el-table-column v-if="item.value != 'done'"
                                v-for="(item,index) in tableArray"  :key="index"
                                :prop="item.value"
                                :label="item.label"
                            >

                            </el-table-column>
                            <el-table-column v-if="item.value == 'done'"
                                v-for="(item,index) in tableArray"  :key="index"
                                :prop="item.value"
                                :label="item.label"
                            >
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                </template>      
                            </el-table-column>



                        </el-table>
                    </slot>
                </my-card>
            </el-col>
        </el-row>

        <div id="msg-div">
        
        </div>
    </div>
</template>

<script>
import myTable from '../components/my-table.vue'
export default {
  components: { myTable },
    data () {
        return {
            form: {
                name: '',
                address: '',
                number: '',
                province: '',
                city: '',
                allNumber: '',
                mesuredNumber: '',
                date: '',  
            },

            tableData: [
                {
                    tung: '楼栋',
                    number: '1000',
                    done: ''
                }
            ],
            tableArray: [
                {
                    value: 'tung',
                    label: '楼栋'
                },
                {
                    value: 'number',
                    label: '总数量'
                },
                {
                    value: 'done',
                    label: '操作'
                }
            ],
        }
    },
    created() {

    },
    methods: {
        handleClick() {

        }
    }
}
</script>