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
  getDeptList:'le-center/company/deptForSub/getDeptList.json'
}

