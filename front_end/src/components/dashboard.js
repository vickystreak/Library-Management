import axios from "axios";
import React from "react";

function Dashboard(){

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getDashboardInfo = async () => {
        const response = await axios.get("http://localhost:3013/getDashboardInfo/"+ userInfo.adminId);
       if(response.data.code === 200){
        alert(response.data.message);
       }
    };
    return(
       <div className="justify-content-center align-items-center">
        <h1 className="text-danger">Library Management Dashboard </h1>
        <h2 className="text-success">{"Welcome "+userInfo.name}</h2>
        <button className="bg-primary rounded" style={{border:'none'}} onClick={getDashboardInfo}>Dashboard Info</button>
       </div> 
    );

}

export default Dashboard;