import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createbook() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let quantity = document.getElementById("quantity").value;
    let rent = document.getElementById("rent").value;

    let info = {
      title: title,
      author: author,
      quantity: quantity,
      rent: rent,
    };
    try {
      const response = await axios.post(
        "http://localhost:3013/createbook",
        info
      );

      if (response.data.code == 200) {
        alert(response.data.message);
        navigate("/bookmanagement");
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
            <h2 className="text-center">Add Book</h2>
            <div className="mb-2">
              <label>
                <h4>Title</h4>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter the Book Title"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Author</h4>
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter the Author Name"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>
                <h4>Quantity</h4>
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter the Quantity"
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <label>
                <h4>Rent Fee</h4>
              </label>
              <input
                id="rent"
                type="number"
                placeholder="Enter the Rent for Book"
                className="form-control"
              />
            </div>

            <button className="btn btn-success justify-content-end" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createbook;
