<template>
  <div class="detail-form" :class="towLines?'tow-line':''">
    <div class="detail">
      <slot></slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <slot name="form-footer"></slot>
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="actionType=='edit'" type="primary" @click="editSave">保存</el-button>
      <el-button v-if="actionType=='add'" type="primary" @click="addSave">保存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    props: {
      towLines: {
        type: Boolean,
        default: false
      },
      actionType: {
        type: String,
        default: "edit"
      }
    },
    mounted(){
    },
    methods: {
      cancel(){
        this.$emit("cancel")
      },
      editSave(){
        this.$emit("editSave")
      },
      addSave(){
        this.$emit("addSave")
      },
    }
  }
</script>
<style lang="scss">
  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
  }

  .el-dialog__body {
    padding: 0;
  }

  .detail {
    max-height: 500px;
    overflow-y: auto;
    text-align: left;
    padding: 20px;
  }

  .dialog-footer {
    border-top: 1px solid #dcdfe6;
    padding: 20px;
  }

  .tow-line .el-form-item {
    display: inline-block;
    width: 49%;
    &:nth-child(2n) {
      margin-left: 1%;
    }
  }

  .tow-line .el-form-item.inline {
    display: block !important;
    width: auto;
    margin-left: 0;
  }

  .el-tabs__item {
    font-size: 16px;
    font-weight: bolder;
  }

  .el-textarea textarea {
    background-color: #f4f5f7;
  }
</style>
