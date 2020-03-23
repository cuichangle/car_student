const app = getApp()


Page({
  data: {

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
      this.setData({
        islogin: false
      })
    } else {
      this.setData({
        islogin: true
      })
    }
  }

})

