import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Member(){

    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:3013/member")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []);
  
    const handleDelete = async (member_id) =>{
      try {
        const response = await axios.delete(
          "http://localhost:3013/deletemember/"+member_id
        );
  
        if (response.data.code == 200) {
          alert(response.data.message);
        //   navigate("/bookmanagement");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return(
        <>
        <div className="d-flex bg-primary justify-content-center align-items-center" style={{width:'100%'}}>
        <div className=" bg-white rounded p-3">
          <h2 className="text-center" style={{color:'#B22222'}}>Members List</h2>
          <div className="d-flex justify-content-end mb-2">
            <Link to={'/createmember'} className='btn btn-success'>Create +</Link>
          </div>
          <table className="p-3 border-table">
            <thead>
              <tr>
                <th>Member Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Outstanding Debt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member, index) => {
                return (
                  <tr key={index}>
                    <td>{member.member_id}</td>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td>{member.email}</td>
                    <td>{member.phone_number}</td>
                    <td>{member.outstanding_debt}</td>
                    <td>
                      <Link to={`/updatemember/${member.member_id}`} className="btn btn-sm btn-primary">Edit</Link>
                      <button onClick={() => {handleDelete(member.member_id)}} className="btn btn-sm btn-danger mx-2">Delete</button>
                    </td>
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

export default Member;