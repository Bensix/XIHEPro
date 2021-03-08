<template>
  <!-- <div style="display:none;" id="siframe">
    <div id="msg-div">
      <div id="ext-gen11"
        style="position: relative; visibility: visible; left: 0px; top: 36.8484px; z-index: auto; opacity: 1;">
        <div class="msg" style="background:#fff;">
          <div class="x-box-tl">
            <div class="x-box-tr">
              <div class="x-box-tc"></div>
            </div>
          </div>
          <div class="x-box-ml">
            <div class="x-box-mr">
              <div class="x-box-mc">
                <table>
                  <tbody>
                    <tr>
                      <td class="lb-tip-header"></td>
                      <td width="16px" align="right" rowspan="2" valign="top">
                        <div class="lb-icon-close"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>执行S2商机判定成功.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="x-box-bl">
            <div class="x-box-br">
              <div class="x-box-bc"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  

  <div>
    <button @click="handleReduceClick(10)">减少</button>
    <h1>{{$store.state.count}}</h1>
    <button @click="handleAddClick(10)">增加</button>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        url: 'http://localhost:8080/#/inputData'
      }
    },
    mounted() {

      // let _that = this;
      // setTimeout(() => {
      //   const siframe = document.querySelector('#siframe')
      //   siframe.onload = function () {
      //     _that.getMsgDiv();
      //     console.log('iframe已加载完毕')
      //   }
      // })
      // this.getTestDiv();
    },
    methods: {
      handleAddClick(n) {
        // this.$store.commit('mutationAddCount',n)
        this.$store.dispatch('actionAddCount',n)
      },
      handleReduceClick(n) {
        // this.$store.commit('mutationReduceCount',n)
        this.$store.dispatch('actionReduceCount',n)
      },


      // getMsgDiv() {
      //   let iframe = document.getElementById('siframe').contentWindow.document;
      //   let node = iframe.getElementById('msg-div');
      //   if (node.hasChildNodes()) {
      //     debugger
      //     // if (!iframe.querySelector('.err-list')) {
      //     //     this.dialogVisible = false;
      //     //     this.$router.go(0);
      //     // }
      //   }
      // },

      getTestDiv() {
        let node = document.getElementById('msg-div');
        if (node.hasChildNodes()) {
          var obj = document.getElementsByTagName('td');
          for (var i = 0, j = obj.length; i < j; i++) {
            if (obj[i].innerText != '') {
              var str = obj[i].innerText;
              if (str.indexOf("成功") != -1) {

              }
            } 
          }
        }
      }
    }
  }

</script>
