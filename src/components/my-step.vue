<template>
  <!-- <el-steps finish-status="success" :active="currentStep" align-center>
    <el-step v-for='(item,index) in stepData' :key="index" :description="item.description">
      <slot slot="title">
        <div class="hander" @click="toPage(item.page)">{{item.title}}</div>
      </slot>
    </el-step>
  </el-steps> -->

    <div class="ly_step_con flex-row">
      <div v-for='(item,index) in stepData' :key="index" 
        class="el-step is-horizontal is-center" 
        style="margin-right: 0px;"
        :style='{flexBasis: percent}'
        >
        <div @click="toPage(item,index+1)" class="hander" v-if="item.status == '2'">
          <div class="el-step__title is-success text-center">
            <div>{{item.title}}</div>
          </div>
          <div class="el-step__head is-success">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 1px; width: 100%;"></i>
            </div>
            <div class="el-step__icon is-text">
              <i class="el-step__icon-inner is-status el-icon-check"></i>
            </div>
          </div>
          <div class="el-step__description is-success text-center">{{item.description}}</div>
        </div>
        <div @click="toPage(item,index+1)" class="hander" v-if="item.status == '1'">
          <div class="el-step__title is-process text-center">
            <div>{{item.title}}</div>
          </div>
          <div class="el-step__head is-process">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: -450ms; border-width: 0px; width: 0%;"></i>
            </div>
            <img class="icon_step" src="../img/nocomplete.png" alt="">
          </div>
          <div class="el-step__description is-success text-center">{{item.description}}</div>
        </div>
        <!-- <div class="hander" v-if="item.status == '1' && currentStep == index">
          <div class="el-step__title is-process text-center">
            <div>{{item.title}}</div>
          </div>
          <div class="el-step__head is-process">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: -450ms; border-width: 0px; width: 0%;"></i>
            </div>
            <i class="el-icon-warning" style="font-size:34px;"></i>
          </div>
          <div class="el-step__description is-success text-center">{{item.description}}</div>
        </div> -->
        <div class="hander" @click="toPage(item,index+1)" v-if="(item.status == '0' || item.status == null) && item.bussinessId">
          <div class="el-step__title is-wait text-center">
            <div>{{item.title}}</div>
          </div>
          <div class="el-step__head is-wait">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: -600ms; border-width: 0px; width: 0%;"></i>
            </div>
            <div v-if="item.type != '1'" class="el-step__icon is-text">
              <div class="el-step__icon-inner">{{index + 1}}</div>
            </div>
            <div v-if="item.type == '1'" class="el-step__icon is-text" style="width: 35px;height: 35px;">
              <div v-if="index < '3'" class="el-step__icon-inner">S{{index + 1}}</div>
              <div v-if="index == '3'" class="el-step__icon-inner" style="font-size:12px;">S4-1</div>
              <div v-if="index == '4'" class="el-step__icon-inner" style="font-size:12px;">S4-2</div>
              <div v-if="index > '4'" class="el-step__icon-inner">S{{index}}</div>
            </div>
          </div>
        </div>
        <div v-if="(item.status == '0' || item.status == null) && !item.bussinessId">
          <div class="el-step__title is-wait text-center">
            <div>{{item.title}}</div>
          </div>
          <div class="el-step__head is-wait">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: -600ms; border-width: 0px; width: 0%;"></i>
            </div>
            <div class="el-step__icon is-text">
              <div class="el-step__icon-inner">{{index + 1}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
  export default {
    name: 'my-step',
    props: {
      stepData: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentStep: {
        type: Number,
        default: () => {
          return []
        }
      },
      PMainID: {
        type: String,
        default: () => {
          return ''
        }
      }
    },
    data() {
      return {
        percent: '11.111%',
        url: ''
      }
    },
    created() {
      this.percent = ((1 / this.stepData.length) * 100).toFixed(3) + "%";
    },
    methods: {
      // childMethod() {
      //   this.$emit('fatherMethod');
      // },
      toPage(item,index) {
        if (item.PMainID && item.stepName) {
          // let url =  process.env.API_URL + '/OperateProcessor?operate=CP_Project_MtoDZ&Table=CP_Project&PMainID=' + PMainID +'&FDZtype='+ index +'&WindowType=1&extWindow=true&PopupWin=true';
          let url = process.env.API_URL + '/OperateProcessor?operate=CP_Project_MDZto' + item.stepName + '&Table=CP_Project&ID='+ item.PMainID + '&WindowType=1&extWindow=true&PopupWin=true'
          console.log(url);
          window.open(url,"_blank");
        } else if (item.bussinessId && item.type) {
          this.$parent.leftOpenNewPopup(index);
        }
      }
    }
  }

</script>

<style scoped>
  .hander {
    cursor: pointer;
  }

</style>
