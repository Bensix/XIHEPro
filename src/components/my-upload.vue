<template>
    <div>
        <el-row style="padding:0 24px;">
            <el-col :span="12">
                <label>附件</label>
            </el-col>
            <el-col :span="12" style="text-align:right;">
                <el-upload
                    class="upload-demo"
                    action="#"
                    :http-request="handlePreview"
                    multiple
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div class="upload-list-wrap mt8">
                    <div class="upload-item" v-for="(item,index) in fileList" :key="index">
                        <div @click="viewFile(item.thumbnail)" class="upload-title">{{item.name}}</div>
                        <div class="upload-icon" @click="delteImg(item.id)">
                            <i class="el-icon-close"></i>
                        </div>
                    </div>
                </div>    
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: {
            fileList: {
                type: Array,
            }
        },
        methods:{
            viewFile(url) {
                window.open(process.env.API_URL + url,'_blank')
            },
            handlePreview(params){
                // debugger
                this.uploadApi(params.file).then(res => {
                    if(res.data.sucess == true){
                        let fileList = JSON.parse(res.data.url);
                        // this.fileList.push(fileList);
                        console.log(this.fileList);
                        this.$parent.$parent.fileList.push(fileList)
                        return this.$message.success('上传成功');
                    }else{
                        return this.$message.error('上传失败,请重新上传');
                    }
                })    
            },
            delteImg(id){
                let index = this.fileList.findIndex(item =>{
                    if(item.id == id){
                        return true
                    }
                })
                // this.fileList.splice(index,1)
                this.$parent.$parent.fileList.splice(index,1)
                },
            beforeAvatarUpload(file){  
                let types = [ 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                'application/rtf', 'application/vnd.ms-excel application/x-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.slideshow',
                'application/pdf', 'text/plain', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmg'];
                // console.log(file.type);
                const isType = types.includes(file.type);
                const isLtSize = file.size / 1024 / 1024 < 5;
                if (!isType) {
                    this.$message.error('只能上传文档和图片!');
                    return false;
                }
                if (!isLtSize) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                    return false;
                }
                return true;
            }
        }
    }
</script>