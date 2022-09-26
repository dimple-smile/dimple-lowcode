<template>
  <div>
    <div v-overlay class="container">
      <div class="content">
        <div v-for="item in 100" :key="item.id">
          {{ item }}
        </div>
      </div>
    </div>

    <el-table v-overlay="{ target: setTableOverlayTarget, x: false }" :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
  },
  methods: {
    setTableOverlayTarget(el) {
      return el.children[2]
    },
  },
}
</script>

<style lang="scss">
.container {
  height: 70vh;
  // background: burlywood;
  max-width: 50vw;
  border: 1px solid blueviolet;
  margin: 10px;
}
.content {
  box-sizing: border-box;
  padding: 10px;
  width: 100vw;
}

.test::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

.test::-webkit-scrollbar:vertical {
  width: 16px;
}

.test::-webkit-scrollbar:horizontal {
  height: 16px;
}

.test::-webkit-scrollbar-thumb:vertical {
  border-radius: 20px;
  border: 4px solid rgba(0, 0, 0, 0);
  box-shadow: 20px 0 0 #ccc inset;
}

.test::-webkit-scrollbar-thumb:vertical:hover {
  box-shadow: 20px 0 0 #aaa inset;
}

.test::-webkit-scrollbar-thumb:horizontal {
  border-radius: 20px;
  border: 4px solid rgba(0, 0, 0, 0);
  box-shadow: 0 20px 0 #ccc inset;
}

.test::-webkit-scrollbar-thumb:horizontal:hover {
  box-shadow: 0 20px 0 #aaa inset;
}
</style>
