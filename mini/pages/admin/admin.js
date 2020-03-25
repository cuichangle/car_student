const app = getApp()
Page({

  data: {
    mapScale: 18, //地图的缩放级别
    latitude: 26.08226,//福建农林大学经纬度
    longitude: 119.23975,
    markers:[],
    long:'',
    name:'',
    lat:'',
    minutes:'',
    hourcost:'',
    showprice:false,
    showprop: false, // 底部弹框

  },
  // 关闭弹框
  onClose() {
    this.setData({
      showprop: false,
    })
  },
  // 点击地图
  bindMap(e){
  
    this.setData({
      showprop:true,
      long: e.detail.longitude.toFixed(6),
      lat: e.detail.latitude.toFixed(6),
      name:''
    })
   
  },
  // 点击标记点，可以选择删除或者是修改名称
  bindParkMarkerTap(e){
    let id = e.markerId
    let flag = true

    this.data.markers.map((v)=>{
      if(v.id == id){
        if(v.isuse == 1){
          flag = false
          app.toast('已停车，不可删除')
        }
      }
    })
    if(flag){
   app.confirm('是否删除该停车位',(res)=>{
   this.deletePark(id)
   },(res)=>{

   })
    }


  },
  // 设置免费时间
  changeMinutes(e){
    this.setData({
      minutes:e.detail.value
    })
  },
  changeHourcost(e) {
    this.setData({
      hourcost: e.detail.value
    })
  },
  // 获得默认价格
  getprice(){
    app.request('getprice',{}).then(res=>{
      if(res.data.length){
        this.setData({
          minutes:res.data[0].minutes,
          hourcost:res.data[0].hourcost
        })
      }
    })
  },
  // 删除停车位
  deletePark(id){
      app.request('deleteParkingLot', { id: id }).then(res => {
        if (res.status == 200) {
          app.toast('删除成功')
          this.getParkingLot()
        }
      })
  },
  // 输入停车位名称
  changeipt(e){
   this.setData({
     name:e.detail.value
   })
  },
  setting(){
    this.setData({
      showprice:!this.data.showprice
    })
  },
  submitPrice(){
    let {minutes,hourcost} = this.data
    if(!minutes || !hourcost){
      app.toast('信息不完善')
      return
    }
    let data = {
      minutes,
      hourcost
    }
    app.request('settingprice',data).then(res=>{
      this.setData({
        showprice:false,
        showprop:false
      })
      app.toast('设置成功')
    })

  },
  // 添加停车位
  addParkingLot(){
    if(!this.data.name){
      app.toast('请输入名称')
      return
    }
    let data = {
      name:this.data.name,
      longitude:this.data.long,
      latitude:this.data.lat
    }
    app.request('addParkingLot',data).then(res=>{
      if(res.status == 200){
        this.setData({
          showprop:false
        })
        app.toast(this.data.name+'添加成功')
        this.getParkingLot()
      }
    })
  },
  getParkingLot(){
    
    app.request('getParkingLot', {}).then(res => {
      let nouse = '../image/p.png'
      let use = '../image/car.png'
      let temp = []


      if (res.status == 200) {
 
          res.data.map((v)=>{
            let obj = {
              title:v.name,
              latitude: v.latitude,
              longitude: v.longitude,
              width:25,//图片的宽和高
              height:25,
              id:v.id,
              isuse:v.isuse
            }
            if(v.isuse == 1){
              obj.iconPath=use
            }else{
              obj.iconPath = nouse
            }
            temp.push(obj)
          })
          this.setData({
            markers:temp
          })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getParkingLot()
    this.getprice()

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