<template>
  <div class="right-box">
    <div class="hide-stats" @click="show=!show" v-show="!show">
      资源筛选<span class="op-icon">&#xe66f;</span>
    </div>
    <div class="right-content" v-show="show">
      <div class="top mb10" @click="show=!show">
        <span class="op-icon">&#xe66f;</span>
      </div>
      <div class="mid flex-between">
        <Cascader v-model="area" :api="ajaxApi.spokenTest.area"
                  @change="getPaper"
                  :preItem="{value:'',label:'全部地区'}"
                  :width="148"/>
        <Cascader v-model="grade" :defaultOption="gradeOption" @change="getPaper" :width="112"
                  style="margin-left:12px;"/>
      </div>
      <ul class="list mt20 scroll-bar" id="paperLoader" @scroll="scrollFun">
        <li class="flex" v-for="(item,index) in papers" @click="()=>{$emit('select',item);itemNum=index;}"
            :class="{on:itemNum===index}">
          <div><span></span></div>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    import Cascader from "./Cascader"

    function debounce(fn, time) {
        let timer = null;
        return function () {
            let context = this;
            let args = arguments;
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, time)
        }
    }

    export default {
        components: {Cascader},
        data: function () {
            return {
                area: '',
                grade: "",
                start: 0,
                length: 10,
                papers: [],
                gradeOption: [{value: '', label: "所有年级"}, {value: 5, label: "五年级"}, {value: 6, label: "六年级"}, {
                    value: 7,
                    label: "初一"
                }],
                Ajax: null,
                show: true,
                timer: null,
                itemNum: -1,
                noData: false,
            }
        },
        methods: {
            getPaper(start) {
                start = start || this.start;
                this.start = start;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$http({
                        url: this.ajaxApi.spokenTest.list,
                        data: {
                            area: this.area,
                            grade: this.grade,
                            start: start,
                            length: this.length
                        }
                    }).then(res => {
                        if (res && res.length === 0) {
                            this.noData = true;
                        }
                        if (start !== 0) {
                            this.papers.push(...res);
                        } else {
                            this.papers = res;
                        }
                    })
                }, 100)
            },
            scrollFun: debounce(function () {
                let paperLoader = document.getElementById('paperLoader');
                let scrollHeight = paperLoader.scrollHeight
                let clientHeight = paperLoader.clientHeight
                let scrollTop = paperLoader.scrollTop
                if (scrollHeight === clientHeight + scrollTop && !this.noData) {
                    this.getPaper(++this.start)
                }
            }, 100),
        }
    }
</script>
<style lang="scss" scoped>
  @import "../module";

  .right-box {
    position: relative;
  }

  .hide-stats {
    position: absolute;
    left: 0;
    top: 0;
    width: 39px;
    height: 128px;
    box-sizing: border-box;
    text-align: center;
    padding: 16px 13px;
    background: #EDEDED;
    cursor: pointer;
    border-radius: 0px 8px 8px 0px;

    span {
      display: block;
      margin-top: 9px;
    }
  }

  .right-content {
    background: #fff;
    height: calc(100% - 24px);
    border-left: 1px solid #EDEDED;
    box-sizing: border-box;
  }

  .top {
    padding: 24px;
    padding-bottom: 0;
    text-align: left;

    span {
      cursor: pointer;
      color: #AAA;

      &:hover {
        color: $green;
      }
    }
  }

  .mid {
    padding: 0 24px;
  }

  .list {
    padding: 0 24px 20px 24px;
    height: calc(100% - 130px);
    overflow: auto;

    li {
      list-style: none;
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      cursor: pointer;
      line-height: 22px;
      margin-bottom: 24px;
      align-items: flex-start;

      div {
        width: 28px;
      }

      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ccc;
        margin-right: 15px;
      }

      &:hover {
        color: $green;

        span {
          background: $green;
        }
      }

      &.on {
        color: $green;

        span {
          background: $green;
        }
      }
    }
  }
</style>
