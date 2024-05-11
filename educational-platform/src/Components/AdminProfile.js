import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const AdminProfile = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateAdmin = () => {
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

  const getAdminDetails = () => {
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/login";
    } else {
      const headers = {
        token: token,
      };

      axios
        .get(`http://localhost:8081/api/admins/get`, {
          headers: headers,
        })
        .then((res) => {
          console.log(res.data.admin);
          setEmail(res.data.admin[0].email);
          setFirstName(res.data.admin[0].firstName);
          setLastName(res.data.admin[0].lastName);
          setPhoneNo(res.data.admin[0].phoneNo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);
  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h3>Admin Profile</h3>
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
                defaultValue={email}
                readOnly
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
              defaultValue={firstName}
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
              defaultValue={lastName}
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
              defaultValue={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
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
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>{" "}
          <br /> <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              updateAdmin();
            }}
          >
            Update Admin Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
