import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'bussinessOpportunityDetail',
      meta: {
        title: '商机进度',
        isKeep: false
      },
      component: () => import('@/view/bussinessOpportunityDetail')
    },
    // {
    //   path: '/bussinessOpportunityDetail1',
    //   name: 'bussinessOpportunityDetail1',
    //   meta: {
    //     title: '商机进度',
    //     isKeep: false
    //   },
    //   component: () => import('@/view/bussinessOpportunityDetail1')
    // },
    {
      path: '/measurementProgressDetail',
      name: 'measurementProgressDetail',
      meta: {
        title: '测量进度详情',
        isKeep: false
      },
      component: () => import('@/view/measurementProgressDetail')
    },
    {
      path: '/measurementTungProgressDetail',
      name: 'measurementTungProgressDetail',
      meta: {
        title: '测量楼栋详情',
        isKeep: false
      },
      component: () => import('@/view/measurementTungProgressDetail')
    },
    
    {
      path: '/forecastProgressDetail',
      name: 'forecastProgressDetail',
      meta: {
        title: '预测进度详情',
        isKeep: false
      },
      component: () => import('@/view/forecastProgressDetail')
    },
    {
      path: '/orderProgressDetail',
      name: 'orderProgressDetail',
      meta: {
        title: '下单进度详情',
        isKeep: false
      },
      component: () => import('@/view/orderProgressDetail')
    },
    {
      path: '/packageProgressDetail',
      name: 'packageProgressDetail',
      meta: {
        title: '安装计划进度详情',
        isKeep: false
      },
      component: () => import('@/view/packageProgressDetail')
    },
    {
      path: '/receiveProgressDetail',
      name: 'receiveProgressDetail',
      meta: {
        title: '收货进度管控表',
        isKeep: false
      },
      component: () => import('@/view/receiveProgressDetail')
    },
    {
      path: '/scheduleControl',
      name: 'scheduleControl',
      meta: {
        title: '项目进度管控表',
        isKeep: false
      },
      component: () => import('@/view/scheduleControl')
    },
    {
      path: '/outputDetail',
      name: 'outputDetail',
      meta: {
        title: '验收管理',
        isKeep: false
      },
      component: () => import('@/view/outputDetail')
    },
    {
      path: '/outputTungDetail',
      name: 'outputTungDetail',
      meta: {
        title: '验收管理',
        isKeep: false
      },
      component: () => import('@/view/outputTungDetail')
    },
    {
      path: '/bigInstallationDetail',
      name: 'bigInstallationDetail',
      meta: {
        title: '大货安装',
        isKeep: false
      },
      component: () => import('@/view/bigInstallationDetail')
    },
    {
      path: '/bigInstallationTungDetail',
      name: 'bigInstallationTungDetail',
      meta: {
        title: '大货安装',
        isKeep: false
      },
      component: () => import('@/view/bigInstallationTungDetail')
    },
    {
      path: '/inputData',
      name: 'inputData',
      meta: {
        title: '录入资料',
        isKeep: false
      },
      component: () => import('@/view/inputData')
    },
    {
      path: '/houseInformation',
      name: 'houseInformation',
      meta: {
        title: '户型信息',
        isKeep: false
      },
      component: () => import('@/view/houseInformation')
    },
    {
      path: '/sampleDeliveryIns',
      name: 'sampleDeliveryIns',
      meta: {
        title: '样板交付-安装',
        isKeep: false
      },
      component: () => import('@/view/sampleDeliveryIns')
    },
    {
      path: '/sampleDeliveryCal',
      name: 'sampleDeliveryCal',
      meta: {
        title: '样板交付-验收',
        isKeep: false
      },
      component: () => import('@/view/sampleDeliveryCal')
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '测试页面',
        isKeep: false
      },
      component: () => import('@/view/test')
    },
    {
      path: '/newBussinessOpportunityForm',
      name: 'newBussinessOpportunityForm',
      meta: {
        title: '新增商机',
        isKeep: false
      },
      component: () => import('@/view/newBussinessOpportunityForm')
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
router.afterEach((to, from) => {
  if (to.meta) document.title = to.meta.title
})
export default router
