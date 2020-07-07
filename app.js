const express = require("express");
const app = express();
const mysql = require("mysql");
// const bodyParser = require('body-parser');

// 创建连接
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodemysql"
})
db.connect( (err) => {
    if(err) throw err;
    console.log('连接成功');
})
// // 创建数据库
// app.get("/createdb",(req,res) => {
//     let sql = "CREATE DATABASE node1mysql";
//     db.query(sql,(err,result) => {
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result);
//             res.send("Datebase create success...")
//         }
//     })
// })

// //  创建表
// app.get("/createpoststable",(req,res) => {
//     //  创建表 表名为posts id自增 title字符串长度255 body字符串255 主键是ID
//     let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
//     db.query(sql,(err,result) => {
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result);
//             res.send("posts表创建成功....")
//         }
//     })
// })


// 查询内容
app.post("/getposts",(req,res) => {
    var str = "";   
    req.on("data",function (chunk) {    
        str += chunk;   
    });   
    req.on("end",function () {
       let json={};
       // res.end("ok");   
        str.split("&").forEach(paramMap => {
            json[paramMap.split("=")[0]] = paramMap.split("=")[1];
        });
        console.log(json.name,json.password);
        let sql = "select * from posts where name="+json.name+" and password="+json.password;
        db.query(sql,(err,result) => {
            if(err){
                console.log(err);
                res.send(err);
                  return; 
                  
            }else{
                console.log(result)
                if(result==null||result=='')
                {res.send("查询成功但是结果为空");
            return;} 
                 else
                 {res.send("用户名密码正确");
                 return;
                }
               // res.json(result);
            }
        })
    });
})
//增加内容
app.post("/add",(req,res) => {
    var str = "";   
    req.on("data",function (chunk) {    
        str += chunk;   
         
    });   
    req.on("end",function () {
       let json={};
       // res.end("ok");   
        str.split("&").forEach(paramMap => {
            json[paramMap.split("=")[0]] = paramMap.split("=")[1];
        });
        console.log(json);
        let sql = "INSERT INTO "+"`students`"+'('+"`name`"+','+"`age`"+','+ "`number`"+','+"`clas`" +') '+"VALUES ("+"'"+json.name+"'"+','+"'"+json.age+"'"+','+json.number+','+"'"+json.clas+"'"+')';
        db.query(sql,(err,result) => {
            if(err){
                console.log(err);
                res.send(err);
                  return; 
                  
            }else{
                console.log(result)
                if(result==null||result=='')
                {res.send("插入成功但是结果为空");
            return;} 
                 else
                 {res.send("添加成功");
                 return;
                }
               // res.json(result);
            }
        })
    });
})
app.post("/getAll",(req,res) => {
    var str = "";   
    req.on("data",function (chunk) {    
        str += chunk;   
    });   
    req.on("end",function () {
       let json={};
       // res.end("ok");   
        str.split("&").forEach(paramMap => {
            json[paramMap.split("=")[0]] = paramMap.split("=")[1];
        });
        console.log(json.name,json.password);
        let sql = "select * from students";
        db.query(sql,(err,result) => {
            if(err){
                console.log(err);
                res.send(err);
                  return; 
                  
            }else{
                console.log(result)
                if(result==null||result=='')
                {res.send("查询成功但是结果为空");
            return;} 
                 else
                 { 
                     res.send(result);
                 return;
                }
               // res.json(result);
            }
        })
    });
})
//删除内容
app.post("/delete",(req,res) => {
    var str = "";   
    req.on("data",function (chunk) {    
        str += chunk;   
         
    });   
    req.on("end",function () {
       let json={};
       // res.end("ok");   
        str.split("&").forEach(paramMap => {
            json[paramMap.split("=")[0]] = paramMap.split("=")[1];
        });
        console.log(json);
        let sql ="DELETE FROM `students` WHERE number="+json.number;
        db.query(sql,(err,result) => {
            if(err){
                console.log(err);
                res.send(err);
                  return; 
                  
            }else{
                console.log(result)
                if(result==null||result=='')
                {res.send("删除成功但是结果为空");
            return;} 
                 else
                 {res.send("删除成功");
                 return;
                }
               // res.json(result);
            }
        })
    });
})
app.use(express.static("HTML")).listen(3000);
