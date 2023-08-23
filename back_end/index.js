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
      // first we need to need check if the person is already existed in database or not
      let userCount = "select count(*) as count from admin where username = ?";
      con.query(userCount, [req.body.email], (error, result) => {
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

add.get("/book", (req, res) => {
  try {
    let bookCountQuery = "select * from books";
    con.query(bookCountQuery, (getError, getResult) => {
      if (getError) {
        res.send(getError);
      } else {
        return res.json(getResult);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.post("/createbook", (req, res) => {
  try {
    let insertBookQuery =
      "INSERT INTO books (title, author, stock_qty, rent_fee) VALUES (?,?,?,?)";
    con.query(
      insertBookQuery,
      [req.body.title, req.body.author, req.body.quantity, req.body.rent],
      (getError, getResult) => {
        if (getError) {
          res.send(getError);
        } else {
          let msg = {
            code: 200,
            message: "Successfully Created",
          };
          res.send(msg);
        }
      }
    );
  } catch (systemError) {
    console.log(systemError);
  }
});

add.put("/updatebook/:book_id", (req, res) => {
  try {
    let bookid = req.params.book_id;
    let updateBookQuery =
      "UPDATE books SET title = ? ,author = ?,stock_qty = ?,rent_fee = ? WHERE book_id = ?";
    con.query(
      updateBookQuery,
      [
        req.body.title,
        req.body.author,
        req.body.quantity,
        req.body.rent,
        bookid,
      ],
      (getError, getResult) => {
        if (getError) {
          res.send(getError);
        } else {
          let msg = {
            code: 200,
            message: "Successfully Updated",
          };
          res.send(msg);
        }
      }
    );
  } catch (systemError) {
    console.log(systemError);
  }
});

add.delete("/deletebook/:book_id", (req, res) => {
  try {
    let bookid = req.params.book_id;
    let deleteBookQuery = "DELETE FROM books WHERE book_id = ?";
    con.query(deleteBookQuery, [bookid], (getError, getResult) => {
      if (getError) {
        res.send(getError);
      } else {
        let msg = {
          code: 200,
          message: "Successfully Deleted",
        };
        res.send(msg);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.get("/getDashboardInfo/:adminId", (req, res) => {
  try {
    let msg = {
      code: 200,
      message: "Successfully Fetched!",
    };
    res.send(msg);
  } catch (error) {
    console.log(error);
  }
});

add.get("/member", (req, res) => {
  try {
    let userMemberCount = "SELECT * FROM librarydata.members";
    con.query(userMemberCount, (getError, getResult) => {
      if (getError) {
        res.send(getError);
      } else {
        return res.json(getResult);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.post("/createmember", (req, res) => {
  try {
    let userCount =
      "INSERT INTO members (first_name,last_name,email,phone_number,outstanding_debt) VALUES (?,?,?,?,?)";
    con.query(
      userCount,
      [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.pno,
        req.body.debt,
      ],
      (getError, getResult) => {
        if (getError) {
          res.send(getError);
        } else {
          let msg = {
            code: 200,
            message: "Successfully Created",
          };
          res.send(msg);
        }
      }
    );
  } catch (systemError) {
    console.log(systemError);
  }
});

add.put("/updatemember/:member_id", (req, res) => {
  try {
    let memberid = req.params.member_id;
    let updateQuery =
      "UPDATE members SET first_name = ? ,last_name = ?,email = ?,phone_number = ?,outstanding_debt = ? WHERE member_id = ?";
    con.query(
      updateQuery,
      [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.pno,
        req.body.debt,
        memberid,
      ],
      (getError, getResult) => {
        if (getError) {
          res.send(getError);
        } else {
          let msg = {
            code: 200,
            message: "Successfully Updated",
          };
          res.send(msg);
        }
      }
    );
  } catch (systemError) {
    console.log(systemError);
  }
});

add.delete("/deletemember/:member_id", (req, res) => {
  try {
    let memberid = req.params.member_id;
    let deleteQuery = "DELETE FROM members WHERE member_id = ?";
    con.query(deleteQuery, [memberid], (getError, getResult) => {
      if (getError) {
        res.send(getError);
      } else {
        let msg = {
          code: 200,
          message: "Successfully Deleted",
        };
        res.send(msg);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.get("/transaction", (req, res) => {
  try {
    let userCount = "SELECT * FROM librarydata.transactions;";
    con.query(userCount, (getError, getResult) => {
      if (getError) {
        res.send(getError);
      } else {
        return res.json(getResult);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.post("/issuebook", (req, res) => {
  try {
    let check =
      "SELECT count(*) as count FROM members WHERE member_id = ?   AND outstanding_debt <= 500";
    con.query(check, [req.body.memberid], (err, result) => {
      if (result[0].count > 0) {
        let insertQuery =
          "INSERT INTO transactions(book_id,member_id,transaction_date,due_date,status) VALUES(?,?,current_date(),?,'borrowed')";
        con.query(
          insertQuery,
          [req.body.bookid, req.body.memberid, req.body.duedate],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              let msg = {
                code: 200,
                message: "Book had been Successfully Issed",
              };
              res.send(msg);
            }
          }
        );
      } else {
        let msg = {
          code: 200,
          message: "Unable to Issue Book Member Outstanding is more than 500",
        };
        res.send(msg);
      }
    });
  } catch (systemError) {
    console.log(systemError);
  }
});

add.listen(3013, () => {
  console.log("Running on port 3013");
});
