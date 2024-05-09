import React from "react";
import AdminNavBar from "./AdminNavBar";

const AdminDashboard = () => {
  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h4>content</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
