const globalurl = 'http://192.168.31.151:4000/' //本机地址
const app = {
	request:function(url,data,callback){
		$.ajax({
			url:'http://192.168.31.151:4000/'+url,
			data:JSON.stringify(data),
			dataType:'JSON',
			headers:{'Content-Type':'application/json;charset=utf8'},
			type:"post",
			success:function(res){
				if(res.status == 200){
					callback(res)
				}else{
					app.error(res.msg)
				}
			}

			
		})
	},
	alert:function(msg,time=2000){
		var div =  document.createElement('div')
		div.innerHTML = msg,
		div.classList.add('alltoast','fudong')
		document.body.appendChild(div)
		setTimeout(()=>{
			document.body.removeChild(div)
		},time)
		
	},
	error:function(msg,time=2000){
		var div =  document.createElement('div')
		div.innerHTML = msg,
		div.classList.add('alltoast','error')
		document.body.appendChild(div)
		setTimeout(()=>{
			document.body.removeChild(div)
		},time)
	},
	uploadurl:'http://q7l27bvrq.bkt.clouddn.com/',
	formarTime:function(timestamp){
		 var date = new Date(timestamp);
		                        Y = date.getFullYear() + '-';
		                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		                        D = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
		                        h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
		                        m = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
		                        s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
		                        return Y+M+D+h+m+s;
		
	}
}