import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "@fortawesome/fontawesome-free/css/all.css";

const InstructorDashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("");

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  const sampleData = [
    { label: "Completed", y: 60 },
    { label: "In Progress", y: 30 },
    { label: "Not Started", y: 10 },
  ];

  // Define the options for the doughnut chart
  const options = {
    animationEnabled: true,
    title: {
      text: "Learner Progress Overview",
    },
    data: [
      {
        type: "pie",
        startAngle: 60,
        // Tooltips
        toolTipContent: "<b>{label}</b>: {y}%",
        indexLabel: "{label} - {y}%",
        indexLabelPlacement: "inside",
        dataPoints: sampleData,
      },
    ],
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
      </div>
      <div className="col-md-10">
        {/* <h4>Content Area</h4> */}
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
                  <form className="needs-validation" noValidate>
                    {/* Your form fields go here */}
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
                          required
                        >
                          <option value="">Select a course</option>
                          {/* Populate options dynamically if needed */}
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
                          name="contentTitle"
                          required
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
                        File:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          className="form-control"
                          id="contentFile"
                          name="contentFile"
                          required
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                    </div>
                    {/* Add more form fields as needed */}
                    <button type="submit" className="btn btn-primary me-md-2">
                      ADD
                    </button>
                    <button type="cear" className="btn btn-primary">
                      CLEAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedNavItem === "Update and Delete" && (
          <div>
            <div className="row justify-content-center">
              <select
                className="form-select"
                style={{
                  width: "50%",
                  justifyContent: "center",
                  marginTop: "5em",
                }}
                id="cars"
              >
                <option>Course 1</option>
                <option>Course 2</option>
                <option>Course 3</option>
                <option>Course 4</option>
              </select>
            </div>
            <div className="container py-4">
              <div className="row justify-content-center">
                {" "}
                {/* Centering the content */}
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div
                    className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                    style={{ backdropFilter: "blur(30px)" }}
                  >
                    <div className="card-body p-5 shadow-5 text-center">
                      <h3>Course content</h3>

                      {/* Nested cards for each course content */}
                      <div className="card mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>course content here</div>
                          <div>status</div>
                          <button type="button" className="btn btn-success">
                            UPDATE
                          </button>
                          <button type="button" className="btn btn-danger">
                            DELETE
                          </button>
                        </div>
                      </div>
                      <div className="card mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>course content here</div>
                          <div>status</div>
                          <button type="button" className="btn btn-success">
                            UPDATE
                          </button>
                          <button type="button" className="btn btn-danger">
                            DELETE
                          </button>
                        </div>
                      </div>
                      <div className="card mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>course content here</div>
                          <div>status</div>
                          <button type="button" className="btn btn-success">
                            UPDATE
                          </button>
                          <button type="button" className="btn btn-danger">
                            DELETE
                          </button>
                        </div>
                      </div>
                      <div className="card mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>course content here</div>
                          <div>status</div>
                          <button type="button" className="btn btn-success">
                            UPDATE
                          </button>
                          <button type="button" className="btn btn-danger">
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedNavItem === "Monitor" && (
          <div>
            <div className="row justify-content-end">
              <select
                className="form-select"
                style={{
                  width: "25%",
                  justifyContent: "center",
                  marginTop: "5em",
                  marginRight: "5em",
                }}
                id="cars"
              >
                <option>Course 1</option>
                <option>Course 2</option>
                <option>Course 3</option>
                <option>Course 4</option>
              </select>
            </div>
            <div className="container py-4">
              <div className="row g-0 align-items-center">
                <div
                  className="col-lg-6 mb-5 mb-lg-0"
                  style={{ width: "25%", marginRight: "5em" }}
                >
                  <div
                    className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                    style={{
                      backdropFilter: "blur(30px)",
                      width: "",
                      height: "8em",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "10px" }}>
                        <h6>No of students</h6>
                        <h5>100</h5>
                      </div>
                      <div>
                        <i
                          className="fa fa-users"
                          aria-hidden="true"
                          style={{ fontSize: "40px", color: "#868b92" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div
                    className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                    style={{
                      backdropFilter: "blur(30px)",
                      width: "fit-content",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "10px" }}>
                        <h6>Course Name</h6>
                        <h5>Distributed Systems</h5>
                        <h6>DS</h6>
                      </div>
                      <div>
                        <i
                          className="fa fa-graduation-cap"
                          aria-hidden="true"
                          style={{ fontSize: "40px", color: "#868b92" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container py-4">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div
                    className="card cascading-right bg-body-tertiary border-0 shadow p-4"
                    style={{ backdropFilter: "blur(30px)" }}
                  >
                    {/* Insert your CanvasJS chart component here */}
                    <CanvasJSReact.CanvasJSChart options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
