<template>
    <div>
     <div class="container">
       <el-carousel indicator-position="outside">
         <el-carousel-item v-for="item in 4" :key="item">
           <h3>{{ item }}</h3>
         </el-carousel-item>
       </el-carousel>
      <div class="time-control">
        <el-date-picker
          v-model="timeVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-time-picker
          v-model="timeVal2"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'
          }"
          placeholder="任意时间点">
        </el-time-picker>
      </div>

     </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
              timeVal:'',
              timeVal2:''
            }
        }
    }
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
