import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import InstructotNavBar from "./InstructotNavBar";
import LearnerProgressMonitor from "./LearnerProgressMonitor";

const InstructorDashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [courseNames, setCourseNames] = useState([]);
  const [courseContents, setCourseContents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [progressData, setProgressData] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    title: "",
    content: null,
    duration: "",
    status: "Not Registered",
  });
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    verifyIntructor();
    const fetchCourseNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/courseMaster/names"
        );
        setCourseNames(response.data);
      } catch (error) {
        console.error("Error fetching course names:", error);
      }
    };
    fetchCourseNames();
    const fetchCourseContents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/courseContent"
        );
        setCourseContents(response.data.courseContents);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };
    fetchCourseContents();
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
          alert("your session expired and you have been logged out");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert("You have been logged out");
        window.location.href = "/";
        console.log(err);
      });
  };
  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
    if (itemName === "Add") {
      window.alert("Add Course Content from Here!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData(event.target);
    formDataToSend.append("status", "Not Approved");

    try {
      await axios.post(
        "http://localhost:8082/api/courseContent/",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000); // Close the success alert after 3 seconds
      setFormData({
        courseName: "",
        title: "",
        content: null,
        duration: "",
        status: "Not Registered",
      });
      console.log("Course content added successfully");
    } catch (error) {
      console.error("Error adding course content:", error);
      console.log("Message:", error.response.data.message);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, content: event.target.files[0] });
  };

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course content?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8082/api/courseContent/${id}`);
        // Remove the deleted course content from the state
        setCourseContents(
          courseContents.filter((content) => content._id !== id)
        );
        console.log("Course content deleted successfully");
      } catch (error) {
        console.error("Error deleting course content:", error);
      }
    }
  };

  const [editFormData, setEditFormData] = useState({
    courseName: "",
    title: "",
    duration: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editContentId, setEditContentId] = useState(null);

  const handleEdit = (content) => {
    setEditFormData({
      courseName: content.courseName,
      title: content.title,
      duration: content.duration,
    });
    setIsEditing(true);
    setEditContentId(content._id);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8082/api/courseContent/${editContentId}`,
        editFormData
      );
      // Update the course content in the state
      setCourseContents(
        courseContents.map((content) => {
          if (content._id === editContentId) {
            return {
              ...content,
              courseName: editFormData.courseName,
              title: editFormData.title,
              duration: editFormData.duration,
            };
          }
          return content;
        })
      );
      setIsEditing(false);
      console.log("Course content updated successfully");
    } catch (error) {
      console.error("Error updating course content:", error);
    }
  };

  const options = {
    animationEnabled: true,
    title: { text: "Student Progress Overview" },
    data: [
      {
        type: "pie",
        startAngle: 60,
        toolTipContent: "<b>{label}</b>: {y}%",
        indexLabel: "{label} - {y}%",
        indexLabelPlacement: "inside",
        dataPoints: progressData,
      },
    ],
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="row">
      <div className="col-md-2 navigation-container">
        <div className="nav-item-container">
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavItemClick("Add")}
          >
            Add Course Content
          </a>
        </div>
        <div className="nav-item-container">
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavItemClick("Update and Delete")}
          >
            Update/Delete Course Content
          </a>
        </div>
        <div className="nav-item-container">
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavItemClick("Monitor")}
          >
            Monitor Learner Progress
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
        {selectedNavItem === "Add" && (
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div
                  className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                  style={{ backdropFilter: "blur(30px)" }}
                >
                  <div className="card-body p-5 shadow-5 text-center">
                    <h3>Add Course Content</h3>
                  </div>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3 row">
                      <label
                        htmlFor="courseName"
                        className="col-sm-2 col-form-label"
                      >
                        Course :
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          id="courseName"
                          name="courseName"
                          required
                          value={formData.courseName}
                          onChange={handleChange}
                        >
                          <option value="">Select a course</option>
                          {courseNames.map((courseName, index) => (
                            <option key={index} value={courseName}>
                              {courseName}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          Please select a course.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="contentTitle"
                        className="col-sm-2 col-form-label"
                      >
                        Title:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="contentTitle"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please provide a title.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="contentFile"
                        className="col-sm-2 col-form-label"
                      >
                        Content:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          className="form-control"
                          id="contentFile"
                          name="content"
                          accept="application/pdf"
                          required
                          onChange={handleFileChange}
                        />
                        <div className="invalid-feedback">
                          Please choose a PDF file.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="duration"
                        className="col-sm-2 col-form-label"
                      >
                        Duration:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          name="duration"
                          required
                          value={formData.duration}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please provide a duration.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="status"
                        className="col-sm-2 col-form-label"
                      >
                        Status:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="status"
                          name="status"
                          value={formData.status}
                          readOnly
                        />
                        <div className="invalid-feedback">
                          Please provide a status.
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary me-md-2">
                      ADD
                    </button>
                    {/* <button type="clear" className="btn btn-primary">CLEAR</button> */}
                  </form>
                  {successAlert && (
                    <div className="alert alert-success" role="alert">
                      Course content added Successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Other conditional renderings for "Update and Delete" and "Monitor" */}
        {selectedNavItem === "Update and Delete" && (
          <div>
            <div className="container py-4">
              <div className="row justify-content-center">
                {" "}
                <div
                  className="col-lg-6 mb-5 mb-lg-0"
                  style={{ width: "100%" }}
                >
                  <div
                    className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                    style={{ backdropFilter: "blur(30px)" }}
                  >
                    <div className="card-body p-5 shadow-5 text-center">
                      <h3>Course content</h3>

                      <div className="container py-4">
                        <div className="row justify-content-center">
                          <div
                            className="col-lg-6 mb-5 mb-lg-0"
                            style={{ width: "100%" }}
                          >
                            {courseContents.map((content) => (
                              <div key={content._id} className="card mb-3">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "5rem",
                                    }}
                                  >
                                    <div>{content.courseName}</div>
                                    <div>{content.title}</div>
                                    <div>{content.duration}</div>
                                    <div>{content.status}</div>
                                  </div>
                                  {/* Display PDF content */}
                                  <a
                                    href={`data:application/pdf;base64,${content.content}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View PDF
                                  </a>

                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleEdit(content)}
                                  >
                                    UPDATE
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(content._id)}
                                  >
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isEditing && (
              <div style={{ marginLeft: "250px" }}>
                <input
                  type="text"
                  value={editFormData.courseName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      courseName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editFormData.duration}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      duration: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsEditing(false)}
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        )}
        {selectedNavItem === "Monitor" && (
          <LearnerProgressMonitor></LearnerProgressMonitor>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
