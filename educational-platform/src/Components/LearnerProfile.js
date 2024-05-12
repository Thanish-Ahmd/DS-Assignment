import React, { useEffect, useState } from "react";
import LearnerNavBar from "./LearnerNavBar";
import axios from "axios";

const LearnerProfile = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    verifyLearner();
    getLearnerDetails();
  }, []);
  const verifyLearner = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      token: token,
    };
    await axios
      .post(
        `http://localhost:8081/api/learners/verify`,
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

  const updateLearner = () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };
    if (password != "") {
      axios
        .put(`http://localhost:8081/api/learners/update`, body)
        .then((res) => {
          if (res.data.message == "Learner Updated") {
            alert("Updated Successfully");
            window.location.reload();
          } else if (res.data.message == "Error in updating") {
            alert("Error in updating");
          } else if (res.data.message == "Incorrect Password") {
            alert("Incorrect password");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Could no add update the admin");
        });
    } else {
      alert("Please Enter the password");
    }
  };

  const getLearnerDetails = () => {
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/";
    } else {
      const headers = {
        token: token,
      };

      axios
        .get(`http://localhost:8081/api/learners/get`, {
          headers: headers,
        })
        .then((res) => {
          console.log(res.data.learner);
          setEmail(res.data.learner[0].email);
          setFirstName(res.data.learner[0].firstName);
          setLastName(res.data.learner[0].lastName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      <LearnerNavBar />
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
              placeholder="Password"
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
              updateLearner();
            }}
          >
            Update Admin Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default LearnerProfile;
