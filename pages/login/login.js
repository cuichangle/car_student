import API from "../../utils/api.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timetext: '获取验证码',
    mobile: '',
    yzm:'',
    pwd:'',
    code: '',
    flag: true, //避免重复点击
    timer: 60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      flag: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let loginadmin = app.gets('loginadmin')
    // if (loginadmin) {
    //   app.nto('admin/admin')
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login() {

    // if (app.isphone(this.data.mobile)) {
    //   app.toast("请输入有效手机号码");
    //   return
    // }
    if(this.data.mobile != '123456'){
      app.toast("请输入管理员手机号");
      return
    }
    if (this.data.pwd != '123456') {
      app.toast("请输入正确的密码");
      return
    }
    if (this.data.code != this.data.yzm) {
      app.toast("验证码有误");
      return
    }
    app.saves('loginadmin',true)
   app.nto('admin/admin')

  },
  bindnumber(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindpwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  //获取code 验证码
  getcode() {
    // if (app.isphone(this.data.mobile)) {
    //   app.toast("请输入有效手机号码");
    //   return
    // }
    if (this.data.flag) {
      // 随机数模拟验证码功能
      let str = ''
      for(var i=0;i<4;i++){
        str+= Math.ceil( Math.random()*10)
      }
      setTimeout(()=>{
        app.confirm(str,(res)=>{
          this.setData({
            yzm:str
          })
        },()=>{

        },'验证码为')
      },4000)
      this.setData({
        flag: false
      })
      var t = this.data.timer
      var timer = setInterval(() => {
        t--
        this.setData({
          timer: t,
          timetext: this.data.timer + 's后重新发送'
        })
        if (this.data.timer <= 0) {
          this.setData({
            timetext: '重新发送',
            flag: true,
            timer: 60
          })

          clearInterval(timer)
        }
      }, 1000)
     
    } else {
      app.toast('请勿重复点击')
    }

  },
})