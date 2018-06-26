<template>
  <div>
    <el-form-item label="省">
      <el-select v-model="provinceVal" placeholder="请选择" @change="provinceChange">
        <el-option
          v-for="item in provinceData"
          :key="item.regionId"
          :label="item.regionName"
          :value="item.regionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="市">
      <el-select v-model="cityVal" placeholder="请选择" @change="cityChange">
        <el-option
          v-for="item in cityData"
          :key="item.regionId"
          :label="item.regionName"
          :value="item.regionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="区">
      <el-select v-model="districtVal" placeholder="请选择" @change="districtChange">
        <el-option
          v-for="item in districtData"
          :key="item.regionId"
          :label="item.regionName"
          :value="item.regionId">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        provinceData: [],
        cityData: [],
        districtData: [],
        provinceVal: '',
        cityVal: '',
        districtVal: '',
      }
    },
    props: {
      provinceId: {
        type: Number
      },
      cityId: {
        type: Number
      },
      districtId: {
        type: Number
      },
      value: {
        type: Array,
        default: () => {
          return [0, 0, 0]
        }
      }
    },
    mounted(){

    },
    watch: {
      provinceId(val){
        this.provinceVal = val
        this.$store.dispatch('getProvince').then(province => {
          this.provinceData = province;
        })
      },
      cityId(val){
        this.cityVal = val
        this.$store.dispatch('getCity', this.provinceVal).then(city => {
          this.cityData = city;
        })
      },
      districtId(val){
        this.districtVal = val
        this.$store.dispatch('getDistrict', this.cityVal).then(district => {
          this.districtData = district;
        })
      }
    },
    methods: {
      provinceChange(id){
        this.$store.dispatch('getCity', id).then(city => {
          this.cityData = city;
          this.$emit('sFn', [id, this.findLabel(id, this.provinceData)]);
          this.cityVal = ''
          this.districtVal = ''
        })
      },
      cityChange(id){
        this.$store.dispatch('getDistrict', id).then(district => {
          this.districtData = district;
          this.$emit('cFn', [id, this.findLabel(id, this.cityData)]);
        })
      },
      districtChange(id){
        this.$emit('qFn', [id, this.findLabel(id, this.districtData)]);
      },
      findLabel(id, data){
        let item =  data.find(item => {
          return item.regionId == id
        })
        return item.regionName;
      }
    }
  }
</script>
<style lang="" scoped>
</style>
