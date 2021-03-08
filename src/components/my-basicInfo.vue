<template>
    <div>
        <el-row v-if="isShowTitle">
            <el-col :span="24">
                <h2>{{title}}</h2>
            </el-col>
        </el-row>
        <el-row v-if="isShowSecondTitle">
            <el-col :span="24"><h3>{{secondTitle}}</h3></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"
                v-for="(item,index) in infoData" :key="index">
                {{item.name}}
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'my-basicInfo',
    props: {
        title: {
            type: String,
            default: () => {
                return []
            }
        },
        secondTitle: {
            type: String,
            default: () => {
                return []
            }
        },
        isShowTitle: {
            type: Boolean,
            default: true
        },
        isShowSecondTitle: {
            type: Boolean,
            default: true
        },
        infoData: {
            type: Array,
            default: () => {
                return []
            }
        }
    }     
            
}

</script>
