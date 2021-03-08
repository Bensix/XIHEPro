<template>
    <div>
        <div class="flex-row ly_measure_con">
            <div v-for="(item,index) in tungData" :key="index"
                class="flex-column ly_measure_item"  
                >
                <img class="left_img" src="../img/left_tung.png" alt="">
                <div :class="{back_success: index == 1,back_unfinsh: index == 2}" class="status_con flex-center">
                    测量中
                </div>
                <div class="flex-row" style="justify-content:space-around;">
                    <div class="flex-column" style="align-items:center;">
                        <font class="ft_text">总数量</font>
                        <font class="ft_num">200</font>
                    </div>
                    <div class="flex-column" style="align-items:center;">
                        <font class="ft_text">已测量</font>
                        <font class="ft_num">200</font>
                    </div>
                    <div class="flex-column" style="align-items:center;">
                        <font class="ft_text">待测量</font>
                        <font class="ft_num">200</font>
                    </div>
                </div>
                <div class="botttom_num flex-center">{{index + 1}}栋</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-measure',
    props: {
        tungData: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>