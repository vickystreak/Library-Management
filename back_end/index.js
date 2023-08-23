const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const add = express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({ require: true }));
add.use(express.static("public"));

let con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Vicky#27",
  database: "librarydata",
});

con.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection Successful");
  }
});

add.post("/signup", (req, res) => {
  try {
    try {
      console.log(req.body);
      let userCount = "select count(*) as count from admin where username = ?";
      con.query(userCount, [req.body.email], (error, result) => {
        // console.log(result[0].count);
        // console.log(error);
        if (error) {
          res.send(error);
        } else {
          if (result && result[0] && result[0].count > 0) {
            let msg = {
              message: "User is already existed!",
            };
            res.send(msg);
          } else if (req.body.number != 2727) {
            let msg = {
              code: 400,
              message: "Provided Code is wrong!",
            };
            res.send(msg);
          } else {
            let insertData =
              "insert into admin(name,username,pword,created_date) values(?,?,?,current_timestamp())";
            con.query(
              insertData,
              [req.body.name, req.body.email, req.body.password],
              (err, resul) => {
                if (err) {
                  let msg = {
                    message: err,
                    code: 500,
                  };
                  res.send(msg);
                } else {
                  let msg = {
                    message: "User had been registered Successfully!",
                    code: 200,
                  };
                  res.send(msg);
                }
              }
            );
          }
        }
      });
    } catch (appError) {
      console.log(appError);
    }
  } catch (systemError) {
    console.log(systemError);
  }
});

add.post("/login", (req, res) => {
  try {
    try {
      let userCount =
        "select count(*) as count from admin where username = ? and pword = ? ";
      con.query(
        userCount,
        [req.body.email, req.body.password],
        (error, result) => {
          if (error) {
            res.send(error);
          } else {
            if (result && result[0] && result[0].count > 0) {
              let userInfo =
                "select admin_id,name,username from admin where username = ? and pword = ?";
              con.query(
                userInfo,
                [req.body.email, req.body.password],
                (loginErr, loginRes) => {
                  if (loginErr) {
                    res.send(loginErr);
                  } else {
                    let msg = {
                      code: 200,
                      message: "Successfully logined",
                      adminId: loginRes[0].admin_id,
                      name: loginRes[0].name,
                      username: loginRes[0].email,
                    };
                    res.send(msg);
                  }
                }
              );
            } else {
              let msg = {
                message: "Invalid User!",
              };
              res.send(msg);
            }
          }
        }
      );
    } catch (appError) {
      console.log(appError);
    }
  } catch (systemError) {
    console.log(systemError);
  }
});

add.get('/getDashboardInfo/:adminId', (req, res) => {
    try {
        let msg ={
            code:200,
            message:"Successfully Fetched!"
        }
        res.send(msg);
    } catch(error) {
        console.log(error)
    }
})


add.listen(3013, () => {
  console.log("Running on port 3013");
});
