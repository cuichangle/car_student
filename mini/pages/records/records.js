const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[]
  },
  getlist() {
    let user = app.gets('userInfo')
    let data = {
      nickname: user.nickName
     

    }
    app.request('getMyRecord', data).then(res => {
      if (res.status == 200) {
        this.setData({
          list:res.data
        })
      }
    })
  },
  clickover(e){
    let { star, id } = e.currentTarget.dataset
    let {minutes,hourcost} = app.globalData
    let nowt = new Date().getTime()
    // 免费的
    let money=  0
    let nomoney = minutes/60
    let hour = (nowt - star) / 60 / 60 / 1000
    if(hour>nomoney){
       hour = Math.ceil(hour)
       money = hour*hourcost
    }
    let data = {
      end:nowt,
      money:money,
      id
    }
    app.request('updateTime', data).then(res => {
      if (res.status == 200) {
        this.getlist()
      }
    })
    console.log(hour)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
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

  }
})