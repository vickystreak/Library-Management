import axios from "axios";
import '../../App.css'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Book() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3013/book")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (book_id) =>{
    try {
      const response = await axios.delete(
        "http://localhost:3013/deletebook/"+book_id
      );

      if (response.data.code == 200) {
        alert(response.data.message);
      //   navigate("/bookmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex bg-primary justify-content-center align-items-center" style={{width:'100%'}}>
        <div className=" bg-white rounded p-3">
          <h2 className="text-center" style={{color:'#B22222'}}>Books List</h2>
          <div className="d-flex justify-content-end mb-2">
            <Link to={'/createbook'} className='btn btn-success'>Create +</Link>
          </div>
          <table className="p-3 border-table">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Stock Quantity</th>
                <th>Rent Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((book, index) => {
                return (
                  <tr key={index}>
                    <td>{book.book_id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.stock_qty}</td>
                    <td>{book.rent_fee}</td>
                    <td>
                      <Link to={`/updatebook/${book.book_id}`} className="btn btn-sm btn-primary">Edit</Link>
                      <button onClick={() => {handleDelete(book.book_id)}} className="btn btn-sm btn-danger mx-2">Delete</button>
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

export default Book;
