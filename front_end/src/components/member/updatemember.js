import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Updatemember() {
  const { member_id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let pno = document.getElementById("pno").value;
    let debt = document.getElementById("debt").value;

    let info = {
      fname: fname,
      lname: lname,
      email: email,
      pno: pno,
      debt: debt,
    };
    try {
      const response = await axios.put(
        "http://localhost:3013/updatemember/" + member_id,
        info
      );

      if (response.data.code == 200) {
        alert(response.data.message);
        navigate("/membermanagement");
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
            <h2 className="text-center">Update Member</h2>
            <div className="mb-2">
              <label>
                <h4>First Name</h4>
              </label>
              <input
                id="fname"
                type="text"
                placeholder="Enter the First Name"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Last Name</h4>
              </label>
              <input
                id="lname"
                type="text"
                placeholder="Enter the Last Name"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Email</h4>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter the Email"
                className="form-control"
              />
            </div>
            <div className="mb-4">
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
            </div>

            <button
              className="btn btn-success justify-content-end"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Updatemember;
