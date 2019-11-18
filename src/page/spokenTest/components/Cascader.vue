<template>
  <div>
    <el-cascader
      class="my-cascader"
      :style="`width:${width}px;`"
      :popper-class="`my-cascader-popper my-cascader-popper-${_uid}`"
      v-model="value"
      :options="options"
      @change="handleChange"
      :show-all-levels="false"
    >
    </el-cascader>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                value: [],
                options: []
            }
        },
        props: {
            api: {
                type: String,
                default: ""
            },
            width: {
                type: Number,
            },
            preItem: {
                type: Object,
                default: null
            },
            defaultOption: {
                type: Array,
                default: null
            }
        },
        created() {
            if (!this.api && this.defaultOption) {
                this.options.push(...this.defaultOption)
            }
            if (this.preItem) {
                this.options.push(this.preItem)
            }
            if (this.api) {
                this.$http({
                    url: this.api,
                    type: "get",
                }).then(res => {
                    if (res && res.length > 0) {
                        this.options.push(...res.map(item => {
                            return {value: item.Code, label: item.Name}
                        }))
                    }
                })
            }
            this.value.push(this.options[0] ? this.options[0].value : "")
            this.handleChange();
        },
        mounted() {
            let style = document.createElement("style")
            style.type = "text/css"
            style.innerHTML = `.my-cascader-popper-${this._uid} .el-cascader-menu{ min-width: ${this.width}px; }`
            document.getElementsByTagName("HEAD").item(0).appendChild(style)
        },
        methods: {
            handleChange(value) {
                this.$emit("input", value)
                this.$emit("change", value)
            }
        }
    }
</script>
<style lang="scss">
  .my-cascader {
    .el-input__inner {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      height: 34px;
      line-height: 34px;
    }

    .el-input, .el-input__suffix {
      line-height: 34px;
      height: 34px;
    }

    .el-input.is-focus .el-input__inner {
      border-color: #1DCC74 !important;
    }

    .el-input .el-icon-arrow-down.is-reverse {
      color: #1DCC74 !important;
    }
  }

  .my-cascader-popper {
    margin-top: 0 !important;
    border: none !important;
    border-radius: 3px;

    .popper__arrow {
      display: none !important;
    }
  }

  .el-cascader-menu {
    height: auto !important;
    max-height: 50vh !important;
    border-right: none !important;

    &::-webkit-scrollbar {
      width: 4px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      height: 8px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path {
    color: #1DCC74 !important;
  }
</style>
