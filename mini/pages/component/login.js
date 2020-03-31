const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },


  data: {
   islogin:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击了确定
    bindGetUserInfo(e){
      console.log(e)
      let info = e.detail.userInfo
      
      if(info){
        app.load()
        app.globalData.userInfo = info
        app.saves('userInfo',info)
        app.request('register',{nickname:info.nickName,avatar:info.avatarUrl}).then(res=>{
          app.hide()
        
          this.triggerEvent('cancelLogin', { dialog: false, cancel: false });

        })
      }
    },
    // 取消授权
    cancel(){
      app.toast('拒绝授权后将影响小程序功能体验')
      this.triggerEvent('cancelLogin', {dialog:false,cancel:true});
    }
  },
  // 组件进入节点时执行
  attached(){
    
  }
})
