import util from '../../utils/util.js'
const app = getApp()


Page({
  data: {
    explain:'计算时间啊啊啊啊啊',
    showprop:false, // 弹框
    usecount:0,
    minutes:'',
    hourcost:'',
    markers: [
    
    ],
    adsinfo:{},
    
    mapScale: 18, //地图的缩放级别
    latitude: 26.08226,//福建农林大学经纬度
    longitude: 119.23975,
  islogin:false,
 
  
  },

  bindParkMarkerTap(e){
    let id = e.markerId
    let flag = true

    this.data.markers.map((v) => {
      if (v.id == id) {
        if (v.isuse == 1) {
          flag = false
          app.toast('停车位已被占用')
        }
        
        this.setData({
          adsinfo:v
        })
      }
    })
    if (flag) {
      this.setData({
        showprop: true
      })
    }
 
   
  },
  bindMap(e){
    console.log(e)

  },
  // 获得默认价格
  getprice() {
    app.request('getprice', {}).then(res => {
      if (res.data.length) {
        this.setData({
          minutes: res.data[0].minutes,
          hourcost: res.data[0].hourcost
        })
        app.globalData.minutes = this.data.minutes
        app.globalData.hourcost = this.data.hourcost
      }
    })
  },
  // 关闭弹框
  onClickHide(){
    this.setData({
      showprop:false,
    })
  },
  doRuleAds(){
    let temp = this.data.adsinfo
    let obj = {
      lat:temp.latitude,
      lon:temp.longitude,
      name:'农林大学停车位'+temp.title,
      address:'福建农林大学'
    }
    util.navigation(obj)
    console.log(this.data.adsinfo)
  },
  getchildren(e){
    
    this.setData({
      islogin:false
    })
    if (!e.detail.cancel){
      app.toast('授权成功')
    }
  },
  // 使用该车位
  useparking(){
    let user = app.gets('userInfo')
    let data = {
      nickname:user.nickName,
      avatar:user.avatarUrl,
      pid:this.data.adsinfo.id,
      star:new Date().getTime()
     
    }
    app.request('addRecord',data).then(res=>{
      if(res.status == 200){
        this.getParkingLot()
        this.setData({
          showprop:false
        })
        app.toast('请尽快前往车位')
      }
    })
  },
  getParkingLot() {
    let count = 0
    app.request('getParkingLot', {}).then(res => {
      let nouse = '../image/p.png'
      let use = '../image/car.png'
      let temp = []
      app.hide()
      if (res.status == 200) {
        res.data.map((v) => {
          let obj = {
            title: v.name,
            latitude: v.latitude,
            longitude: v.longitude,
            width: 25,//图片的宽和高
            height: 25,
            id: v.id,
            isuse: v.isuse
          }
          if (v.isuse == 1) {
            count++
            obj.iconPath = use
          } else {
            obj.iconPath = nouse
          }
          temp.push(obj)
        })
        this.setData({
          markers: temp,
          usecount:count
        })

      }
    })
  },
  onLoad(){
    app.load('加载中...')
   this.getParkingLot()
  
  },

onShow() {
  this.getprice()
  if (app.gets('userInfo')){
    console.log(app.gets('userInfo'))
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

