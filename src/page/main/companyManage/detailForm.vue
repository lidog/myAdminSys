<template>
  <div>
      <edit-form @cancel="cancel" @editSave="save" :towLines="true">
        <el-tabs v-model="activeName">
          <el-tab-pane label="公司基本信息" name="first">
            <el-form :model="company" label-position="right" :label-width="formLabelWidth">
              <el-form-item label="公司名称">
                <el-input v-model="company.companyName"></el-input>
              </el-form-item>
              <el-form-item label="公司简称">
                <el-input v-model="company.companyNameShort"></el-input>
              </el-form-item>
              <el-form-item label="公司类型">
                <el-select v-model="company.companyType" placeholder="请选择">
                  <el-option
                    v-for="item in companyType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <address-select  :provinceId="company.provinceId" :cityId="company.cityId" :districtId="company.districtId" @sFn="sFn" @cFn="cFn" @qFn="qFn"/>
              <el-form-item label="详细地址">
                <el-input v-model="company.address"></el-input>
              </el-form-item>
              <el-form-item label="是否为总公司">
                <el-radio v-model="company.isHeadCompany" :label=1>是</el-radio>
                <el-radio v-model="company.isHeadCompany" :label=2>否</el-radio>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio v-model="company.companyStatus" :label=1>启用</el-radio>
                <el-radio v-model="company.companyStatus" :label=2>停用</el-radio>
              </el-form-item>
              <el-form-item label="交易中心编码">
                <el-input v-model="company.tradeCenterCode"></el-input>
              </el-form-item>
              <el-form-item label="所属园区">
                <el-input v-model="company.ownedPark"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码">
                <el-input v-model="company.zipCode"></el-input>
              </el-form-item>
              <el-form-item label="所属总公司">
                <el-input v-model="company.headCompanyName"></el-input>
              </el-form-item>
              <el-form-item label="经度">
                <el-input v-model="company.longitude"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input v-model="company.latitude"></el-input>
              </el-form-item>
              <el-form-item label="公司座机">
                <el-input v-model="company.emailAddress"></el-input>
              </el-form-item>
              <el-form-item class="inline" label="配置描述">
                <el-input type="textarea" v-model="company.companyDesc"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="公司详细信息" name="second">
            <el-form :model="companyDetail" label-position="right" :label-width="formLabelWidth">
              <el-form-item label="营业执照">
                <el-input v-model="companyDetail.licence"></el-input>
              </el-form-item>
              <el-form-item label="营销户号">
                <el-input v-model="companyDetail.salesNum"></el-input>
              </el-form-item>
              <el-form-item label="税务登记号">
                <el-input v-model="companyDetail.taxRegNum"></el-input>
              </el-form-item>
              <el-form-item label="所属工商行政管理局">
                <el-input v-model="companyDetail.adminBureau"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="companyDetail.category"></el-input>
              </el-form-item>
              <el-form-item label="经营范围	">
                <el-input v-model="companyDetail.businessScope"></el-input>
              </el-form-item>
              <el-form-item label="注册资本(万元)">
                <el-input v-model="companyDetail.regCapital"></el-input>
              </el-form-item>
              <el-form-item label="实收资本(万元)">
                <el-input v-model="companyDetail.paidCapital"></el-input>
              </el-form-item>
              <el-form-item label="成立时间">
                <el-date-picker
                  v-model="companyDetail.foundTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="传真">
                <el-input v-model="companyDetail.fax"></el-input>
              </el-form-item>
              <el-form-item label="开户银行">
                <el-input v-model="companyDetail.bankName"></el-input>
              </el-form-item>
              <el-form-item label="开户账号">
                <el-input v-model="companyDetail.bankAccount"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input v-model="companyDetail.creditCode"></el-input>
              </el-form-item>
              <el-form-item label="企业性质">
                <el-input v-model="companyDetail.companyProperty"></el-input>
              </el-form-item>
              <el-form-item label="负荷性质">
                <el-input v-model="companyDetail.loadProperty"></el-input>
              </el-form-item>
              <el-form-item label="总用电容量">
                <el-input v-model="companyDetail.totalUsedCapacity"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名">
                <el-input v-model="companyDetail.linkPerson"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话">
                <el-input v-model="companyDetail.linkTelephone"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </edit-form>
  </div>
</template>
<script>
  import editForm from '@/components/editForm.vue'
  import addressSelect from '@/components/addressSelect.vue'

  export default {
    data: function () {
      return {
        formLabelWidth: "150px",
        company: {},
        companyDetail: {},
        companyType: [
          {value: 1, label: "用电企业"},
          {value: 2, label: "售电企业"},
          {value: 3, label: "发电企业"},
        ],
        activeName: 'first'
      }
    },
    components:{
      editForm,
      addressSelect
    },
    props: {
      formData: {
        type: Object
      }
    },
    mounted(){
      if (this.formData.company) {
        this.company = this.formData.company;
        this.company.uHeadId = this.company.headId;
        this.company.uPCompanyId = this.company.pCompanyId;
        delete this.company.headId
        delete this.company.pCompanyId
      }
      if (this.formData.companyDetail) {
        this.companyDetail = this.formData.companyDetail
        this.companyDetail.uPComDetailId = this.companyDetail.pCompanyDetailId
        this.companyDetail.uPCompanyId = this.companyDetail.pCompanyId
        delete this.companyDetail.pCompanyDetailId
        delete this.companyDetail.pCompanyId
      }
    },
    methods: {
      cancel(){
        this.$emit("doCancel")
      },
      save(){
        this.$emit("doSave", {
          company: this.company,
          companyDetail: this.companyDetail,
        })
      },
      sFn([id,label]){
        this.company.provinceId=id
        this.company.provinceName=label
      },
      cFn([id,label]){
        this.company.cityId=id
        this.company.cityName=label
      },
      qFn([id,label]){
        this.company.districtId=id
        this.company.districtName=label
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
