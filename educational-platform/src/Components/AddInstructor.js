import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const AddInstructor = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addInstructor = () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };
    if (password == confirmPassword) {
      axios
        .post(`http://localhost:8081/api/instructors/add`, body)
        .then((res) => {
          if (res.data.message == "Email already exist") {
            alert("Email already exist");
          } else if (res.data.message == "Instructor added") {
            alert("Instrcutor added");
            window.location.href = "/instructors";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Could no add the instructor");
        });
    } else {
      alert("Passwords do not match each other");
    }
  };
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPhoneNo">Phone No</label>
            <input
              type="number"
              className="form-control"
              id="inputPhoneNo"
              name="phoneNo"
              placeholder="Phone No"
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>{" "}
          <br /> <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              addInstructor();
            }}
          >
            Add Instructor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInstructor;
