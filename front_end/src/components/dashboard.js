import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const getDashboardInfo = async () => {
    const response = await axios.get(
      "http://localhost:3013/getDashboardInfo/" + userInfo.adminId
    );
    if (response.data.code === 200) {
      
    }
  };

  return (
    <div className="justify-content-center align-items-center bg-info" style={{width:'100%'}}> 
      <nav class="navbar bg-danger">
        <div class="container-fluid justify-content-center">
          <span class="navbar-brand mb-0 h1 text-white">
            Welcome to Library Management 
          </span>
        </div>
      </nav>
      <marquee>
        <h2 className="text-dark">
          Librarians can maintain the catalog of books in library and to create
          & manage member accounts and transactions.
        </h2>
      </marquee>

      <div className="d-flex flex-row justify-content-around m-5">
        <div className="md-3">
          <Link to={'/bookmanagement'}><button
            className="bg-primary rounded text-white"
            style={{ border: "none",maxWidth:"150px",maxHeight:"80px" }}
            onClick={getDashboardInfo}
          >
            Book Management
          </button>
          </Link>
        </div>
        <div className="md-3">
          <Link to={'/membermanagement'}>
          <button
            className="bg-danger rounded text-white"
            style={{ border: "none" }}
            onClick={getDashboardInfo}
          >
            Member Management
          </button>
          </Link>
        </div>
        <div className="md-3">
          <Link to={'/transactionmanagement'}> 
          <button
            className="bg-success rounded text-white"
            style={{ border: "none" }}
            onClick={getDashboardInfo}
          >
            Transaction Management
          </button>
          </Link>
        </div>
        <div className="md-3">
          <Link to={'/issuebook'}> 
          <button
            className="bg-dark rounded text-white"
            style={{ border: "none" }}
            onClick={getDashboardInfo}
          >
           Issue Book
          </button>
          </Link>
        </div>
       
      </div>
    </div>
  );
}

export default Dashboard;
