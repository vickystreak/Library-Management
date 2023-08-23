import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Issuebook() {
//   const navigate = useNavigate();
  const handleSubmit = async () => {
    let memberId = document.getElementById("memberid").value;
    let bookId = document.getElementById("bookid").value;
    let dueDate = document.getElementById("duedate").value;

    let info = {
      memberid: memberId,
      bookid: bookId,
      duedate: dueDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:3013/issuebook",
        info
      );

      if (response.data.code == 200) {
        alert(response.data.message);
        // navigate("/bookmanagement");
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.error(error);
    }
  };
  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Issue Book</h2>
            <div className="mb-2">
              <label>
                <h4>Member Id</h4>
              </label>
              <input
                id="memberid"
                type="text"
                placeholder="Enter the Member Id"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Book Id</h4>
              </label>
              <input
                id="bookid"
                type="text"
                placeholder="Enter the Book Id"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Due Date</h4>
              </label>
              <input
                id="duedate"
                type="date"
                placeholder="Enter the Due Date"
                className="form-control"
              />
            </div>
            {/* <div className="mb-4">
              <label>
                <h4>Phone Number</h4>
              </label>
              <input
                id="pno"
                type="number"
                placeholder="Enter the Phone Number"
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <label>
                <h4>Outstanding Debt</h4>
              </label>
              <input
                id="debt"
                type="number"
                placeholder="Enter the Outstanding Debt"
                className="form-control"
              />
            </div> */}
            <div className="mb-3">
              <p>
                <h6>Note!:</h6>If the member has outstanding more than 500 then
                unable to issue book
              </p>
            </div>

            <button
              className="btn btn-success justify-content-end"
              type="submit"
            >
              Issue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Issuebook;
