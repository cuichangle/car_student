const express = require('express')
const http = require('http')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
// const qiniu = require('qiniu')
// const ak = '8s4imcddpfDxsQN_WmtM0RlacC7O4Sdxstj1YpsJ'//上传七牛云的ak和sk
// const sk = 'cNJhfM3KZ8PSt-6sb5kIdBvOHjjZYVBQeGBOU_Rb'
const mysql_config = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'wechat',
    multipleStatements: true,//多条语句
    useConnectionPooling: true
}

let connection = mysql.createConnection(mysql_config)

connection.on('error', function(err) {
   
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('需要重新连接');
      connection = mysql.createConnection(mysql_config)
    } else {
        throw err;
    }
});
app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == 'options')
		res.sendStatus(200); //让options尝试请求快速结束
	else
		next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// 登录接口
app.post('/login', (req, res) => {
	let info = req.body
	let sql = `SELECT * from  user where email = '${info.email}' `
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		if (result.length) {
			if (result[0].password == info.password) {
				res.send({
					status: 200,
					msg: '成功',
					data: result[0]
				})
			} else {
				res.send({
					status: 201,
					msg: '密码错误',
					data: null
				})
			}
		} else {
			res.send({
				status: 201,
				msg: '账号不存在',
				data: null
			})
		}

	})
})
// 注册
app.post('/register', (req, res) => {
	let info = req.body

	let selectsql = `SELECT * from  user where email = '${info.email}' `
	connection.query(selectsql, (err, result) => {
		if (result.length) {
			res.send({
				status: 201,
				msg: '已存在',
				data: null
			})
		} else {
			let info = req.body
			let sql = `insert into user set? `
			connection.query(sql, info, (err, result) => {
				if (err) {
					return console.log(err.message)
				}
				res.send({
					status: 200,
					msg: '注册成功',
					data: []
				}
				)

			})
		}
	})

})

// 删除项目
app.post('/deleteParkingLot', (req, res) => {

	let sql = ` delete from parking  where id='${req.body.id}'`
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '删除成功',
			data: []
		})

	})
})
// 添加停车位
app.post('/addParkingLot', (req, res) => {
	let info = req.body
	
	let sql = `insert into parking set?`
	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '添加成功',
			data: []
		})

	})
})
// 查询停车位信息
app.post('/getParkingLot', (req, res) => {
	
	
	let sql = `select * from parking`
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '成功',
			data: result
		})

	})
})




app.listen(4000, () => {
	console.log('4000端口已经开启...')
})
