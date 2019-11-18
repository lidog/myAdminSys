<template>
  <div>
    <div class="mid-content">
      <div class="header flex-between" v-if="testList.length>0">
        <div class="left dian"><span></span>人教版七年级上册同步听说训练Unit1人人教版七年级上册同步听说训练Unit1人</div>
        <div class="right flex-between">
          <span>共<b>{{testList.length}}</b>题</span>
          <div class="btn mid-btn green-btn" @click="addAll('add')" v-if="!selectedAll">全部添加</div>
          <div class="btn mid-btn blue-btn" @click="addAll" v-if="selectedAll">全部移除</div>
        </div>
      </div>
      <div class="header flex-between" v-else>
        <div class="left dian flex-start" style="color:#aaa;"><span style="background:#aaa;"></span>请选择资源</div>
        <div class="right flex-between">
          <span>共<b>0</b>题</span>
          <div class="btn mid-btn dis-btn">全部添加</div>
        </div>
      </div>
      <ul class="test-list scroll-bar">
        <li v-for="(item,index) in testList">
          <div class="test-title flex-between">
            <div class="test-title-left">模仿朗读 <span>答题时间 {{item.answer_time}}s</span></div>
            <div class="test-title-right btn blue-btn mid-btn" v-if="selectedMap[item.question_item_id]"
                 @click="del(item)">取消添加
            </div>
            <div class="test-title-right btn green-btn mid-btn" v-else
                 @click="add(item)">添加此题
            </div>
          </div>
          <div class="test-content mt20">{{item.content}} {{item.question_item_id}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
        model: {
            prop: 'selectedList',
        },
        props: {
            selectedList: {
                type:Array,
            },
            selectedMap: {
                type:Object
            }
        },
        data: function () {
            return {
                testList: [],
                timer:null,
            }
        },
        computed:{
            selectedAll(){
                return this.testList.filter(item=>this.selectedMap[item.question_item_id]===0).length>0?false:true;
            }
        },
        methods: {
            refresh({exam_id}) {
                if (exam_id) {
                    this.testList.splice(0);
                    this.$http({
                        url: this.ajaxApi.spokenTest.detail,
                        data: {
                            exam_id: exam_id
                        }
                    }).then(({question_list}) => {
                        if (question_list) {
                            let spokenTest = question_list.filter(item => item.type === 1)[0]
                            if (spokenTest) {
                                this.testList.push(...spokenTest.question_items)
                                this.testList.forEach(item=>{
                                    if(!this.selectedMap[item.question_item_id]){
                                        this.$set(this.selectedMap, item.question_item_id, 0)
                                    }
                                })
                            }
                        }
                    })
                }
            },
            add(item) {
                if (!this.selectedMap[item.question_item_id]) {
                    this.change('add',item)
                }
            },
            del(item) {
                this.change('del',item)
            },
            addAll(type){
                if(type==="add"){
                    this.testList.forEach(o=>this.change('add',o))
                }else {
                    this.testList.forEach(o=>this.change('del',o))
                }
            },
            change(type,item){
                if(type==="add") {
                    this.selectedMap[item.question_item_id]=1;
                    this.selectedList.push(item);
                }
                if(type==="del") {
                    this.selectedMap[item.question_item_id]=0;
                    this.selectedList.splice(this.selectedList.findIndex(o=>o.question_item_id===item.question_item_id),1);
                }
                clearTimeout(this.timer)
                this.timer = setTimeout(()=> {
                    // this.$emit("input",[...this.selectedList]) //用了改变数组的方法，不用再次emit 了
                    this.$emit("update:selectedMap",{...this.selectedMap});
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
  @import "../module";

  .mid-content {
    background: #fff;
    height: calc(100% - 24px);
  }

  .header {
    font-size: 16px;
    padding-top: 10px;
    margin: 0 24px;
    border-bottom: 1px solid #EDEDED;
    height: 64px;
    line-height: 64px;
  }

  .left {
    width: 70%;

    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #666;
      margin-right: 10px;
    }
  }

  .right {
    width: 34%;

    span {
      color: #AAAAAA;
      margin: 0 10px;

      b {
        font-weight: normal;
        margin: 0 3px;
      }
    }
  }

  .test-list {
    padding: 0 24px;
    box-sizing: border-box;
    overflow: auto;
    height: calc(100% - 80px);

    li {
      margin-top: 24px;
      list-style: none;
      padding-bottom: 15px;
      border-bottom: 1px solid #EDEDED;

      .test-title {
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #464646;
        line-height: 22px;
        margin-bottom: 7px;
      }

      .test-content {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 30px;
        text-align: justify;
      }
    }
  }

</style>
