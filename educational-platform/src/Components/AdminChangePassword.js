import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";

const AdminChangePassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="row">
      <AdminNavBar />
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
            }}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
