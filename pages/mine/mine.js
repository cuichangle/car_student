const app = getApp()


Page({
  data: {
    userInfo:'',
    islogin: false,


  },
  getchildren(e) {
    this.setData({
      islogin: false
    })
    if (!e.detail.cancel) {
      app.toast('授权成功')
    }
  },

  onShow() {
    if (app.gets('userInfo')) {
      console.log(app.gets('userInfo'))
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

