import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const CourseContentApproval = () => {
  const [courseContents, setCourseContents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [approvalFormData, setApprovalFormData] = useState({
    courseName: "",
    title: "",
    content: "",
    duration: "",
    status: "",
  });

  useEffect(() => {
    verifyAdmin();
    getAllCourseContent();
  }, []);

  const verifyAdmin = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      token: token,
    };
    await axios
      .post(
        `http://localhost:8081/api/admins/verify`,
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
  const getAllCourseContent = () => {
    axios
      .get(`http://localhost:8082/api/courseContent/`)
      .then((res) => {
        setCourseContents(res.data.courseContents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprovalClick = (courseContent) => {
    setSelectedCourse(courseContent);
    setApprovalFormData(courseContent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setApprovalFormData({
        ...approvalFormData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to backend
    axios
      .put(
        `http://localhost:8082/api/courseContent/${selectedCourse._id}`,
        approvalFormData
      )
      .then((res) => {
        console.log("Course content updated successfully");
        // Refresh course content list
        getAllCourseContent();
        // Close approval form
        setSelectedCourse(null);
      })
      .catch((err) => {
        console.error("Error updating course content:", err);
      });
  };

  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h3>All Courses</h3>
        <table className="table table-instrcutor">
          <thead className="table-warning">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Name</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Duration</th>
              {/* <th scope="col">Timestamp</th> */}
              <th scope="col">Status</th>
              <th scope="col">Approval</th>
            </tr>
          </thead>
          <tbody>
            {courseContents.map((courseContent, index) => (
              <tr key={index}>
                <th scope="col">{index + 1}</th>
                <td>{courseContent.courseName}</td>
                <td>{courseContent.title}</td>
                <td>{courseContent.content}</td>
                <td>{courseContent.duration}</td>
                {/* <td>{courseContent.timestamps}</td> */}
                <td>{courseContent.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApprovalClick(courseContent)}
                  >
                    Approval
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCourse && (
          <div
            className="approval-form"
            style={{
              width: "50%",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              margin: "auto",
            }}
          >
            <h4>Approval Form</h4>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Course Name:</label>
                <input
                  type="text"
                  name="courseName"
                  value={approvalFormData.courseName}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={approvalFormData.title}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Content:</label>
                <input
                  type="text"
                  name="content"
                  value={approvalFormData.content}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Duration:</label>
                <input
                  type="text"
                  name="duration"
                  value={approvalFormData.duration}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              {/* <div className="form-group">
                <label>Created At:</label>
                <input
                  type="text"
                  name="timestamps"
                  value={approvalFormData.timestamps}
                  onChange={handleInputChange}
                  className="form-control"
                  readOnly
                />
              </div> */}
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={approvalFormData.status}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="Pending" >Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>

              <div
                className="approval-form"
                style={{
                  width: "50%",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  margin: "auto",
                }}
              >
                <h4>Course Content Approval</h4>

                <div className="form-group">
                  <label>Course Name:</label>
                  <input
                    type="text"
                    name="courseName"
                    value={approvalFormData.courseName}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={approvalFormData.title}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Content:</label>
                  <input
                    type="text"
                    name="content"
                    value={approvalFormData.content}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Duration:</label>
                  <input
                    type="text"
                    name="duration"
                    value={approvalFormData.duration}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Created At:</label>
                  <input
                    type="text"
                    name="timestamps"
                    value={approvalFormData.timestamps}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    name="status"
                    value={approvalFormData.status}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentApproval;
