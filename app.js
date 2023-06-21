// const express = require("express");
// // const mysql = require("mysql")

// // // create connection
// // const db = mysql.createConnection({
// //     host : 'localhost',
// //     user : 'root',
// //     password : '',
// //     port:3306,
// //     'database' : 'nodemysql'
// // })

// db.connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("My sql connected");
//   }
// });

// const app = express();

// // create DB
// // app.get("/createdb",(req,res) => {
// //     let sql = 'CREATE DATABASE nodemysql'
// //     db.query(sql,(err,result)=>{
// //         if(err){
// //            throw err;
// //         }else {
// //             console.log({result})
// //             res.send("daataabase created")
// //         }
// //     })
// // })

// // create table
// app.get("/createposttable", (req, res) => {
//   let sql = `CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Posts table created.");
//   });
// });

// // insert post one
// app.get("/addpost", (req, res) => {
//   let post = {
//     title: "post One",
//     body: "this is post one",
//   };
//   let sql = "INSERT INTO posts SET ?";
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Posts one added");
//   });
// });
// // SELECT post
// app.get("/getposts", (req, res) => {
//   let sql = "SELECT * FROM posts";
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send("Posts fetched");
//   });
// });
// // SELECT single post 1
// app.get("/getpost/:id", (req, res) => {
//   let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post fetched");
//   });
// });
// // UPDATE POST
// app.get("/updatepost/:id", (req, res) => {
//   let newTitle = "updated tile";

//   let sql = `UPDATE posts SET title='${newTitle}' WHERE id= ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post updated");
//   });
// });
// // delete POST
// app.get("/deletepost/:id", (req, res) => {
//   let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post DELETED");
//   });
// });

// app.listen("5000", () => console.log("server started on port 5000"));
