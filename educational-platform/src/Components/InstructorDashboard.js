import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

const InstructorDashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [courseNames, setCourseNames] = useState([]);
  const [courseContents, setCourseContents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchCourseNames = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/courseMaster/all");
        setCourseNames(response.data);
      } catch (error) {
        console.error("Error fetching course names:", error);
      }
    };
    fetchCourseNames();
  }, []);

  useEffect(() => {
    const fetchCourseContents = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/courseContent");
        setCourseContents(response.data.courseContents);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };
    fetchCourseContents();
  }, []);

  useEffect(() => {
    const verifyInstructor = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { token: token };
        const response = await axios.post("http://localhost:8081/api/instructors/verify", {}, { headers: headers });
        if (response.data.message !== "Authentication Successful") {
          alert("Your session has expired, and you have been logged out");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error verifying instructor:", error);
        alert("You have been logged out");
        window.location.href = "/";
      }
    };
    verifyInstructor();
  }, []);

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("status", "Not Approved");

    try {
      await axios.post("http://localhost:8082/api/courseContent/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Course content added successfully");
    } catch (error) {
      console.error("Error adding course content:", error);
      console.log("Message:", error.response.data.message);
    }
  };

  const options = {
    animationEnabled: true,
    title: { text: "Student Progress Overview" },
    data: [{ type: "pie", startAngle: 60, toolTipContent: "<b>{label}</b>: {y}%", indexLabel: "{label} - {y}%", indexLabelPlacement: "inside", dataPoints: progressData }],
  };

  return (
    <div className="row">
      <div className="col-md-2 navigation-container">
        <div className="nav-item-container">
          <a href="#" className="nav-link" onClick={() => handleNavItemClick("Add")}>Add Course Content</a>
        </div>
        <div className="nav-item-container">
          <a href="#" className="nav-link" onClick={() => handleNavItemClick("Update and Delete")}>Update/Delete Course Content</a>
        </div>
        <div className="nav-item-container">
          <a href="#" className="nav-link" onClick={() => handleNavItemClick("Monitor")}>Monitor Learner Progress</a>
        </div>
      </div>
      <div className="col-md-10">
        {selectedNavItem === "Add" && (
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right bg-body-tertiary border-0 shadow p-4" style={{ backdropFilter: "blur(30px)" }}>
                  <div className="card-body p-5 shadow-5 text-center">
                    <h3>Add Course Content</h3>
                  </div>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3 row">
                      <label htmlFor="courseName" className="col-sm-2 col-form-label">Course :</label>
                      <div className="col-sm-10">
                        <select className="form-select" id="courseName" name="courseName" required>
                          <option value="">Select a course</option>
                          {courseNames.map((courseName, index) => (
                            <option key={index} value={courseName}>{courseName}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">Please select a course.</div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="contentTitle" className="col-sm-2 col-form-label">Title:</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="contentTitle" name="title" required />
                        <div className="invalid-feedback">Please provide a title.</div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="contentFile" className="col-sm-2 col-form-label">Content:</label>
                      <div className="col-sm-10">
                        <input type="file" className="form-control" id="contentFile" name="content" accept="application/pdf" required />
                        <div className="invalid-feedback">Please choose a PDF file.</div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="duration" className="col-sm-2 col-form-label">Duration:</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="duration" name="duration" required />
                        <div className="invalid-feedback">Please provide a duration.</div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="status" className="col-sm-2 col-form-label">Status:</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="status" name="status" value="Not Registered" readOnly />
                        <div className="invalid-feedback">Please provide a status.</div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary me-md-2">ADD</button>
                    <button type="clear" className="btn btn-primary">CLEAR</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Other conditional renderings for "Update and Delete" and "Monitor" */}
      </div>
    </div>
  );
};

export default InstructorDashboard;
