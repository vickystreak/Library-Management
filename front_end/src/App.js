import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Book from "./components/book/book";
import Member from "./components/member/member";
import Transaction from "./components/transaction/transaction";
import Createbook from "./components/book/createbook";
import Updatebook from "./components/book/updatebook";
import Createmember from "./components/member/createmember";
import Updatemember from "./components/member/updatemember";
import Issuebook from "./components/issuebook/issuebook";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookmanagement" element={[<Dashboard />,<Book/>]} />
          <Route path="/membermanagement" element={[<Dashboard />,<Member/>]} />
          <Route path="/transactionmanagement" element={[<Dashboard />,<Transaction/>]} />
          <Route path="/createbook" element={[<Dashboard />,<Createbook/>]} />
          <Route path="/updatebook/:book_id" element={[<Dashboard />,<Updatebook/>]} />
          <Route path="/createmember" element={[<Dashboard />,<Createmember/>]} />
          <Route path="/updatemember/:member_id" element={[<Dashboard />,<Updatemember/>]} />
          <Route path="/issuebook" element={[<Dashboard />,<Issuebook/>]} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
