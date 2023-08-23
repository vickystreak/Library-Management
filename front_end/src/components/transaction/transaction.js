import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Transaction() {

    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:3013/transaction")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []);


  return (
    <>
      <div
        className="d-flex bg-primary justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <div className=" bg-white rounded p-3">
          <h2 className="text-center" style={{ color: "#B22222" }}>
            Transaction List
          </h2>
          {/* <div className="d-flex justify-content-end mb-2">
            <Link to={"/createmember"} className="btn btn-success">
              Create +
            </Link>
          </div> */}
          <table className="p-3 border-table">
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Book Id</th>
                <th>Member Id</th>
                <th>Transaction Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Fine Amount</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((trans, index) => {
                return (
                  <tr key={index}>
                    <td>{trans.transaction_id}</td>
                    <td>{trans.book_id}</td>
                    <td>{trans.member_id}</td>
                    <td>{trans.transaction_date}</td>
                    <td>{trans.due_date}</td>
                    <td>{trans.return_date}</td>
                    <td>{trans.fine_amount}</td>
                    <td>{trans.status}</td>
                    {/* <td> */}
                      {/* <Link
                        to={`/updatemember/${member.member_id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(member.member_id);
                        }}
                        className="btn btn-sm btn-danger mx-2"
                      >
                        Delete
                      </button> */}
                    {/* </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Transaction;
