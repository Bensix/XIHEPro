<template>
    <div>
      <el-table
        :data="tableData"
        border>
        <el-table-column
          v-for="(item,index) in tableArray"  :key="index"
          :prop="item.value"
          :label="item.label"
          >
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'my-table',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableArray: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
