const app = getApp()


Page({
  data: {
    userInfo:'',
    islogin: false,
    allcount:'',


  },
  loginout(){
   app.saves('userInfo',null)
   this.setData({
     userInfo:{},
   })
   app.toast('成功退出登录，切换页面可重新授权')
  },
  getchildren(e) {
    this.setData({
      islogin: false
    })
    if (!e.detail.cancel) {

      app.toast('授权成功')
      this.getallcount()
      this.setData({
        userInfo: app.gets('userInfo'),
        islogin: false
      })
    }
  },
  
  gorecord(){
  app.nto('records/records')
  },
  // 查询总费用
  getallcount() {
    let user = app.gets('userInfo')
    let data = {
      nickname: user.nickName
    }
    app.request('getAllcount', data).then(res => {
      if (res.status == 200) {
        console.log(res)
        this.setData({
         allcount:res.data[0].nums
        })
      }
    })
  },
  onShow() {
    
    if (app.gets('userInfo')) {
      this.getallcount()
      this.setData({
        userInfo:app.gets('userInfo'),
        islogin: false
      })
    } else {
      this.setData({
        islogin: true
      })
    }
  }

})

