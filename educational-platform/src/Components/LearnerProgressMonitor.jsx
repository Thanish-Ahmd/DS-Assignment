import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import "./../Styles/learnProgressMonitor.css";

const LearnerProgressMonitor = () => {
  let displayDataObj = {
    CourseName: "",
    CourseCode: "",
    StudentCount: 0,
    ProgressStatus: {
      Completed: 0,
      InProgress: 0,
      NotStarted: 0,
    },
  };

  const [courseNames, setCourseNames] = useState([]);
  const [displayData, setDisplayData] = useState(displayDataObj);
  const [showPieChart, setShowPieChart] = useState(false);

  //fetch course names
  useEffect(() => {
    fetchCourseNames();
  }, []);

  // Options for the pie chart
  const [chartData, setChartData] = useState({});

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

  const fetchProgressData = async (courseName) => {
    try {
      if (courseName) {
        let response = await axios.get(`http://localhost:8082/` + courseName);
        if (response) {
          let completePercentage = (
            (response.data.progressData[2].studentCount /
              response.data.totalRecords) *
            100
          ).toFixed(2);

          let inProgressPercentage = (
            (response.data.progressData[1].studentCount /
              response.data.totalRecords) *
            100
          ).toFixed(2);

          let pendingPercentage = (
            (response.data.progressData[0].studentCount /
              response.data.totalRecords) *
            100
          ).toFixed(2);

          setChartData({
            animationEnabled: true,
            title: {
              text: "Learner Progress Overview",
            },
            data: [
              {
                type: "pie",
                startAngle: 60,
                toolTipContent: "<b>{label}</b>: {y}%",
                indexLabel: "{label} - {y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                  {
                    label: "Completed",
                    y: completePercentage,
                  },
                  {
                    label: "In Progress",
                    y: inProgressPercentage,
                  },
                  {
                    label: "Not Started",
                    y: pendingPercentage,
                  },
                ],
              },
            ],
          });
          setDisplayData({
            CourseName: courseName,
            CourseCode: "",
            StudentCount: response.data.totalRecords,
          });
          setShowPieChart(true);
        }
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  const handleCourseChange = (event) => {
    fetchProgressData(event.target.value);
  };

  return (
    <div>
      <h3>Learner Progress Monitor</h3>
      <p>Please select a course to see the progress of students</p>
      <div className="row justify-content-start">
        <select
          onChange={handleCourseChange}
          className="form-select course-picker"
          id="courses"
        >
          <option value="">Select a course</option>
          {courseNames.map((courseName, index) => (
            <option key={index} value={courseName}>
              {courseName}
            </option>
          ))}
        </select>
      </div>
      {showPieChart ? (
        <div>
          <div className="container py-1">
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
                    <div style={{ marginRight: "30px" }}>
                      <h6>No of students</h6>
                      <h5>{displayData.StudentCount}</h5>
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
                    height: "8em",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "10px" }}>
                      <h6>Course Name</h6>
                      <h5>{displayData.CourseName}</h5>
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
                  <CanvasJSReact.CanvasJSChart options={chartData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LearnerProgressMonitor;
