<template>
  <div class="left-part" :class="{'min-height':testList.length===0}">
    <div class="header flex-between">
      <div class="header-left">第1次课 课堂练习-口语测评</div>
      <div class="header-right"><span>已选择 <b>{{testList.length}}</b> 道</span> <span class="ml10">共计答题时间 <b>{{allTimes}}s</b></span></div>
      <div class="header-icon">
        <img src="../images/op_title_star@2x.png">
      </div>
    </div>
    <draggable v-model="testList" @change="dragSuccess" class="content" element="ol">
      <li v-for="(item,index) in testList" class="test">
        <div class="test-content mt10">
          <div class="test-title">模仿朗读（答题时间{{item.answer_time}}s)</div>
          <div class="test-detail">{{item.content}} {{item.question_item_id}}</div>
          <div class="tool-bar first-bar flex">
            <div class="btn green-btn" @click="moveUp(index)" v-if="index!==0"><span class="op-icon">&#xe675;</span>
            </div>
            <div class="btn green-btn" @click="moveDown(index)" v-if="index!==testList.length-1"><span class="op-icon">&#xe673;</span>
            </div>
            <div class="btn red-btn" @click="remove(index)"><span class="op-icon">&#xe672;</span></div>
          </div>
          <div class="tool-bar second-bar flex">
            <div class="btn green-btn" @click="addPosition=index" v-if="addPosition!==index">
              <span class="op-icon" style="margin-right: 4px">&#xe670;</span>添加题目
            </div>
            <div class="btn blue-btn" @click="addPosition=-1" v-else>取消添加</div>
          </div>
        </div>
        <div class="add-area" @hover="" v-if="addPosition==index">从右侧选择题目，添加到此处</div>
      </li>
    </draggable>
  </div>
</template>
<script>
    import draggable from 'vuedraggable'

    export default {
        components: {draggable},
        model: {
            prop: 'selectedList',
        },
        props: {
            selectedList: {
                type: Array,
            },
            selectedMap: {
                type: Object
            }
        },
        data: function () {
            return {
                testList: [],
                addPosition: -1,
            }
        },
        watch: {
            selectedList(val) {
                this.testList = [...val];
                if(this.addPosition!==-1){ //指定位置插入
                    let last = this.testList.pop();
                    this.testList.splice(this.addPosition+1,0,last);
                    this.addPosition = -1;
                }
            }
        },
        computed:{
            allTimes(){
                return this.selectedList.reduce((pre,o,i)=>pre+o.answer_time,0)
            },
        },
        methods: {
            dragSuccess() {
                this.$emit("input",[...this.testList]);
            },
            moveUp(index) {
                let arr = this.testList;
                [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
                this.$emit("input",[...this.testList]);
            },
            moveDown(index) {
                let arr = this.testList;
                [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
                this.$emit("input",[...this.testList]);
            },
            remove(index) {
                let item = this.testList.splice(index,1)[0];
                this.$emit("input",[...this.testList]);
                this.selectedMap[item.question_item_id] = 0;
                this.$emit("update:selectedMap",{...this.selectedMap});
            },
        }
    }
</script>
<style lang="scss" scoped>
  @import "../module";

  .left-part.min-height {
    height: calc(100% - 24px);
  }

  .left-part {
    box-sizing: border-box;
    padding-top: 32px;
    position: relative;
    background: #fff;
    height: 100%;
    align-self: flex-start;

    .header {
      padding: 0 56px;
      position: relative;
      font-size: 20px;
      color: rgba(54, 54, 54, 1);

      .header-left {
        font-weight: 500;
      }

      .header-right {
        font-weight: 400;
      }

      b {
        color: $green;
        font-weight: normal;
      }

      .header-icon {
        width: 42px;
        height: 32px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .content {
      padding: 20px 56px 0 70px;
      position: absolute;
      top: 70px;
      left: 0;
      bottom: -15px;
      right: 0;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    .test-content {
      margin-bottom: 30px;
      position: relative;
      cursor: pointer;
      padding-right: 5px;
      position: relative;

      .test-title {
        height: 22px;
        font-size: 16px;
        text-align: left;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #464646;
        line-height: 22px;
        margin-bottom: 7px;
      }

      .test-detail {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 30px;
        text-align: justify;
      }

      .tool-bar {
        height: 30px;
        width: 100%;
        position: absolute;
        justify-content: flex-end;
        box-sizing: border-box;
        align-items: center;
        right: 0;
        padding-right: 15px;
        visibility: hidden;
        span {
          cursor: pointer;
        }
      }

      .first-bar {
        top: -30px;
        .btn {
          width: 32px;
          height: 28px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      .second-bar {
        bottom: -30px;
        .btn {
          width: 92px;
          height: 28px;
          font-size: 14px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    }

    .test:hover .test-content {
      background: #F5F6F7;
      .tool-bar{
        visibility: inherit;
      }
    }

    .add-area {
      width: 100%;
      height: 68px;
      padding-right: 3px;
      background: rgba(255, 255, 255, 1);
      border-width: 1px;
      border-style: dashed solid;
      border-color: #ededed;
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 68px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>
