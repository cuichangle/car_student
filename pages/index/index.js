const app = getApp()


Page({
  data: {
    markers: [],
    mapScale: 11, //地图的缩放级别
    latitude: 28.718941,
    longitude: 115.828219,
  islogin:false,
 
  
  },
  getchildren(e){
    this.setData({
      islogin:false
    })
    if (!e.detail.cancel){
      app.toast('授权成功')
    }
  },

onShow() {

  if (app.gets('userInfo')){
    this.setData({
      islogin:false
    })
  }else{

    this.setData({
      islogin: true
    })
  }
  }

})

