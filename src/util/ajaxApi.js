/*

 * @Author lizhenhua
 * @version 2018/6/14
 * @description
 */

export default {
  company:{
    //公司接口
    edit:'le-center/company/companyMsgtForSub/updateEntity.json',
    list:'le-center/company/companyMsgtForSub/findAllByPagingForSub.json',
    add:'le-center/company/companyMsgtForSub/save.json',
    del:'le-center/company/companyMsgtForSub/deleteByIdsForSub.json'
  },
  dept:{
    //获取部门接口
    list:'le-center/company/deptForSub/findAllByPagingForSub.json',
    add:'le-center/company/deptForSub/saveEntity.json',
    edit:'le-center/company/deptForSub/updateEntity.json',
    del:'le-center/company/deptForSub/deleteByIds.json'
  },
  employ:{
    //员工管理
    list:'le-center/company/userForSub/findAllByPagingForSub.json',
    add:'le-center/company/userForSub/saveEntity.json',
    edit:'le-center/company/userForSub/updateEntity.json',
    del:'le-center/company/userForSub/deleteByIds.json',
    startStop:'le-center/company/userForSub/updateStatus.json',
  },
  user:{
    //login
    login:'le-center/subSystem/login/accountLogin.json',
    //通过token获取用户信息
    userInfo:'le-center/login/getUserInfoByToken.json',
    //菜单
    menu:'le-center/authority/findUserMenuForChildSys.json'
  },
  address:'le-center/common/findRegionByPidForSub.json',
  getDeptList:'le-center/company/deptForSub/getDeptList.json',
  spokenTest:{
    area:"/gorilla/api/spoken/exam/area",
    list:"/gorilla/api/spoken/exam/list",
    exam:"/gorilla/api/spoken/exam",
    detail:"/gorilla/api/spoken/exam/detail",
    info:"/gorilla/api/v1.5/lesson/preview-exercise/info", //lesson_id: this.lesson_id 根据课程id 获取课程详情
    paperDetail:"/gorilla/api/v1.5/tiku/title/detail", //post title_id_list 根据题目id数组 获取已选题目
    save:"/gorilla/api/spoken/curriculum/lesson/in_class_exercise",
  }
}

