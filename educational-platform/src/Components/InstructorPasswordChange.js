import axios from "axios";
import React, { useEffect, useState } from "react";

const InstructorPasswordChange = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    verifyIntructor();
  }, []);

  const verifyIntructor = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      token: token,
    };
    await axios
      .post(
        `http://localhost:8081/api/instructors/verify`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.message == "Authentication Successfull") {
        } else {
          console.log(res.data);
          alert("your session expired and you have been logged out");

          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert("You have been logged out");
        window.location.href = "/";
      });
  };

  const changePassword = () => {
    const body = {
      password,
      oldPassword,
    };
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/login";
    } else {
      const headers = {
        token: token,
      };
      if (password == confirmPassword) {
        axios
          .post(`http://localhost:8081/api/instructors/changePassword`, body, {
            headers: headers,
          })
          .then((res) => {
            if (res.data.message == "Password changed") {
              alert("Password changed");
              window.location.reload();
            } else if (res.data.message == "Error in changing password") {
              alert("Error in changing password");
            } else if (res.data.message == "Incorrect Password") {
              alert("Incorrect Password");
            }
          })
          .catch((err) => {
            alert("Error occured!!");
            console.log(err);
          });
      } else {
        alert("Passwords do not match eachother!");
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="row">
      <div className="col-md-2 navigation-container">
        <div className="nav-item-container">
          <a href="#" className="nav-link">
            Dashboard
          </a>
        </div>

        <div className="nav-item-container">
          <a href="/instructorProfile" className="nav-link">
            Profile
          </a>
        </div>
        <div className="nav-item-container">
          <a href="/instructorPasswordChange" className="nav-link">
            Change Password
          </a>
        </div>
        <div className="nav-item-container">
          <a href="/#" className="nav-link" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
      <div className="col-md-10">
        <h3>Change Password</h3>
        <form className="add-instructor-form">
          <div className="form-group">
            <label htmlFor="inputPassword4">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">New Password</label>
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
          </div>{" "}
          <br /> <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorPasswordChange;
