<template>
  <div class="top flex-between">
    <div class="container flex-start">
      <div class="back flex" @click="goBack">
        <span class="op-icon">&#xe679;</span>
      </div>
      <p class="size16 color46 ml16">第{{lessonNum}}次课 {{lessonTitle}}</p>
      <p class="save-tips ml16"><span>{{saveTime | filterTime}}</span><span class="ml10">已保存</span></p>
    </div>
    <div class="save-btn" @click="save(true)">保存</div>
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                timer:null,
                saveTime:"",
                lessonTitle:"",
                lessonNum:"",
            }
        },
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
        filters:{
            filterTime(val){
                let second = (val/1000).toFixed(0)
                second = second<=9?`0${second}`:second
                let min = Math.floor(second/60)
                min = min<=9?`0${min}`:min
                return `${min}:${second}`
            }
        },
        created(){
            this.lesson_id = this.$route.params.lesson_id || "5db17aba3977f10001cc14e6";
            this.teacher_id = "5d29512955e9ec0001397510";
        },
        mounted() {
            this.$http({
                url:this.ajaxApi.spokenTest.info,
                data:{
                    lesson_id:this.lesson_id
                }
            }).then(({data})=>{
                this.saveTime = data.update_at;
                this.lessonTitle = data.lesson_title;
                this.lessonNum = data.lesson_num;
                return (data.list || [] ).map( item => item.title_id)
            }).then(testIdList=>{
                if(testIdList.length>0){
                    this.$http({
                        url:this.ajaxApi.spokenTest.paperDetail,
                        type:"post",
                        data:{
                            title_id_list:testIdList
                        }
                    }).then(res=>{
                        let list = res.data.list;
                        this.$emit('input',[...list]);
                        list.forEach(item=>this.$set(this.selectedMap, item.question_item_id, 1))
                        this.$emit("update:selectedMap",{...this.selectedMap});
                    })
                }
            })
            // 每隔5分钟自动保存
            this.timer = setTimeout(this.save,1000*60*5)
        },
        methods:{
            save(saveByHand){
                this.$http({
                    url:this.ajaxApi.spokenTest.save,
                    type:"put",
                    data:JSON.stringify({
                        lesson_id: this.lesson_id,
                        teacher_id: this.teacher_id,
                        question_ids: this.selectedList.map(item=>item.question_id),
                    })
                }).then(()=>{
                    if(saveByHand){
                        console.log("保存成功")
                    }else{
                        console.log("已自动保存")
                    }
                    clearTimeout(this.timer);
                    this.saveTime = new Date().getTime()/1000;
                    this.timer = setTimeout(this.save,1000*60*5)
                })
            },
            goBack(){
                this.$message("当前编辑未保存，退出将丢失已编辑内容，是否保存").then(()=>{
                    this.save(true);
                    this.back();
                }).catch(this.back);
            },
            back(){
                this.$router.push({
                    name: 'curriculum-prepare-preview',
                    params: {
                        curriculum_id: this.$route.params.curriculum_id
                    }
                })
                clearTimeout(this.timer);
            },
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
    }
</script>
<style lang="scss" scoped>
  @import "../module";

  .top {
    height: 60px;
    background: #fff;
    border-bottom: 1px solid rgba(237, 237, 237, 1);
  }

  .ml16 {
    margin-left: 16px;
  }

  .back {
    width: 60px;
    height: 60px;
    cursor: pointer;
    color: #999999;

    &:hover,
    &:active {
      color: #00c55d;
    }
  }

  .save-tips {
    color: #999;
  }

  .save-btn {
    width: 108px;
    height: 36px;
    background: rgba(42, 207, 109, 1);
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 24px;

    &:hover {
      background-color: #00c55d;
      font-weight: 600;
    }

    &:active {
      background-color: #00ab51;
      font-weight: 600;
    }
  }
</style>
