const app = getApp()


Page({
  data: {
    explain:'计算时间啊啊啊啊啊',
    allcount:30,
    showprop:false, // 底部弹框
    usecount:12,
    markers: [
      {
        iconPath: "../image/p.png",
        id: 0,
        title:'111',
        latitude: 26.08226,
        longitude: 119.23975,
        width: 30,
        height: 30,
      },
      {
        iconPath: "../image/car.png",
        id: 1,
        title: '2222',
        latitude: 28.738941,
        longitude: 115.818219,
        width: 30,
        height: 30,
 
      }
    ],
    mapScale: 3, //地图的缩放级别
    latitude: 26.08226,//福建农林大学经纬度
    longitude: 119.23975,
  islogin:false,
 
  
  },

  bindParkMarkerTap(e){
    this.setData({
      showprop:true
    })
    console.log(e)
  },
  bindMap(e){
    console.log(e)

  },
  // 关闭弹框
  onClose(){
    this.setData({
      showprop:false,
    })
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

