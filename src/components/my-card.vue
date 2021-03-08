<template>
    <div>
        <div class="ly_card">
            <div v-if="isShowHead" class="ly_card_head">
                <div class="ly_card_head_wrapper">
                    <div class="ly_card_head_title">{{title}}</div> 
                </div>
            </div>
            <div class="ly_card_body" :style=" {padding: paddingStyle}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-card',
    props: {
        isShowHead: {
            type: Boolean,
            default: true
        },
        paddingStyle: {
            type: String,
            default: '24px'
        },
        title: {
            type: String,
            default: ''
        },
    }
}
</script>