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



// 注册
app.post('/register', (req, res) => {
	let info = req.body

	let sql = `SELECT * from  users where nickname = '${info.nickname}' `
	connection.query(sql, (err, result) => {
		if (result.length) {
			res.send({
				status: 201,
				msg: '已存在',
				data: null
			})
		} else {
			let info = req.body
			let sql = `insert into users set? `
			connection.query(sql, info, (err, result) => {
				if (err) {
					return console.log(err.message)
				}
				res.send({
					status: 200,
					msg: '注册成功'
					
				}
				)

			})
		}
	})

})
// 添加记录
app.post('/addRecord', (req, res) => {
	let info = req.body
	
	let sql = `insert into record set?`
	let  updatesql = `update parking set isuse=1 where id =${info.pid}`
	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
	
		connection.query(updatesql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
     	res.send({
			status: 200,
			msg: '成功',
			data: []
		})
	})

	})
})
// 添加费用
app.post('/settingprice', (req, res) => {
	let info = req.body
	let sql = `update admin set minutes='${info.minutes}',hourcost='${info.hourcost}'`
	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
     	res.send({
			status: 200,
			msg: '成功',
			data: []
	})
	})
})
// 查询费用
app.post('/getprice', (req, res) => {
	let info = req.body
	let sql = `select *  from  admin`
	connection.query(sql, info, (err, result) => {
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
// 删除停车位
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
// 查询我的停车记录
app.post('/getMyRecord', (req, res) => {
	let sql = `SELECT * FROM record LEFT JOIN parking ON  parking.id = record.pid  WHERE nickname = '${req.body.nickname}'`
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
// 修改结束时间和金额
app.post('/updateTime', (req, res) => {
	let sql = `update record set end='${req.body.end}',money='${req.body.money}' where recordid = ${req.body.id}`
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '成功',
			data: []
		})

	})
})
// 查询我的停车总费用
app.post('/getAllcount', (req, res) => {
	let sql = `SELECT sum(money) AS nums from record  WHERE nickname = '${req.body.nickname}'`
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
// 用户列表
app.post('/getusres', (req, res) => {
	let sql = `SELECT * FROM users`
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
