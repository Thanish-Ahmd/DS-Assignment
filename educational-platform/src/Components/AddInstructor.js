import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";

const AddInstructor = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h3>Add Instructors</h3>
        <form className="add-instructor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              name="address"
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              name="address2"
              placeholder="Last Name"
            />
          </div>{" "}
          <br /> <br />
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInstructor;
