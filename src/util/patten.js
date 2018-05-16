/*
 * @Author lizhenhua
 * @version 2018/5/11
 * @description async-validator插件构造器
 */

var pattenObj = {
  "required": [/^\s*$/g, "不能为空！"],
  "integer": [/^(0|[1-9][0-9]*)$/, "必须为整数！"],
  "numeric": [/^\d+(\.\d+)?$/, "不是合法的数字！"],
  "currency": [/^\d+\.\d{1,2}$/, "不是合法的货币数字！"],
  "email": [/^\w+@\w+(\.\w+)*$/, "不合法的email输入！"],
  "phone": [/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/, "电话不合法！"],
  "password":[/^(\w){6,20}$/,'只能输入6-20个字母、数字、下划线'],
  "mustChecked": [/0+/g, "checkbox不能为空！"],
  "mustSelected": [/0+/g, "select不能为空！"],
  "ipAddress": [/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, "不是有效的IP地址！"],
  "netport": [/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, "不合法的端口！"],
  "mac": [/^[0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}$/, "不合法的mac地址！"],
  "year": [/^(\d{4})$/, "年份不合法！"],
  "mouth": [/^(\d{4})-(0\d{1}|1[0-2])$/, "月份不合法！"],
  "date": [/^{\d}{4}\-{\d}{2}\-{\d}{2}$/, "日期不合法！"],
  "timeHour": [/^(0\d{1}|1\d{1}|2[0-3])$/, "小时不合法！"],  //HH
  "timeMinute": [/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/, "分钟不合法！"], //HH:mm
  "timeSeconds": [/^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/, "时间不合法！"], //HH:mm:ss
  "chineseOnly": [/[\u4e00-\u9fa5]/g, "输入不合法！请只输入中文！"],
  "mobilePhone": [/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, "手机号不合法！"],
  "specials": [/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>?]{1}[^`~!@$%^&+=\\\][\{\}:;'\,<>?]{0,}$/, "不能输入特殊字符！"],
  "pattern": [null, "数据不合法！请确认"],
  "carCode": [/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/, "车牌号格式不正确"],
  "idCard": [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, "身份证号格式不正确"],
  'postcode': [/^\d{6}$/, "邮编格式不正确"],
  'longitude': [/^-?((180(\.0{0,6})?)|((\d{1,2}|1[0-7]\d)(\.\d{0,6})?))$/, "不是有效的经度！"],
  'latitude': [/^-?((90(\.0{0,6})?)|((\d|[1-8]\d)(\.\d{0,6})?))$/, "不是有效的纬度！"],
  'digitOrLetter': [/^[A-Za-z0-9]*$/, "格式不正确(只支持数字或字母)"]
}

//返回 async-validator 的验证函数 validate
export function pattens(strKey) {
  const patten = pattenObj[strKey]
  if(patten){
    return (rule, value, callback) => {
      if (!patten[0].test(value)) {
        callback(new Error(patten[1]))
      } else {
        callback()
      }
    }
  }else {
    return false
  }
};

//异步验证
export function asyncValidate(url){
  return (rule, value, callback) => {
    doAjaxGet(url,value,function (res) {
        if(res.code = 1){
          callback()
        }else {
          callback(res.errMessage);
        }
    })
  }
}


