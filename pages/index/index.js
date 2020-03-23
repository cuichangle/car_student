const app = getApp()


Page({
  data: {
    explain:'爱搜发酵粉骄傲佛为案件佛为案件佛为案件佛啊',
    allcount:30,
    usecount:12,
    markers: [
      {
        iconPath: "../image/p.png",
        id: 0,
        title:'xssdddxx',
        latitude: 28.718941,
        longitude: 115.828219,
        width: 30,
        height: 30,
        zIndex:100,
        callout:{
          content:'111',
          color:'#f66',
          fontSize:12
        },
      },
      {
        iconPath: "../image/car.png",
        id: 1,
        title: 'xssdddxx',
        latitude: 28.738941,
        longitude: 115.818219,
        width: 30,
        height: 30,
        zIndex: 100,
        callout: {
          content: '111',
          color: '#f66',
          fontSize: 12
        },
      }
    ],
    mapScale: 4, //地图的缩放级别
    latitude: 28.718941,
    longitude: 115.828219,
  islogin:false,
 
  
  },
  bindParkMarkerTap(e){
    console.log(e)
  },
  bindMap(e){
    console.log(e)

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

