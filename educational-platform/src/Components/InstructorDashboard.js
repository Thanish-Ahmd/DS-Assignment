//****************************************************************************************************** */
// import React, { useState, useEffect } from "react";
// import CanvasJSReact from "@canvasjs/react-charts";
// import axios from "axios";
// import "@fortawesome/fontawesome-free/css/all.css";

// const InstructorDashboard = () => {
//   const [selectedNavItem, setSelectedNavItem] = useState("");
//   const [courseNames, setCourseNames] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8082/api/courseMaster/all")
//       .then((response) => {
//         setCourseNames(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching course names:", error);
//       });
//   }, []);

//   const handleNavItemClick = (itemName) => {
//     setSelectedNavItem(itemName);
//   };

//   const sampleData = [
//     { label: "Completed", y: 60 },
//     { label: "In Progress", y: 30 },
//     { label: "Not Started", y: 10 },
//   ];

//   const options = {
//     animationEnabled: true,
//     title: {
//       text: "Learner Progress Overview",
//     },
//     data: [
//       {
//         type: "pie",
//         startAngle: 60,
//         toolTipContent: "<b>{label}</b>: {y}%",
//         indexLabel: "{label} - {y}%",
//         indexLabelPlacement: "inside",
//         dataPoints: sampleData,
//       },
//     ],
//   };

//   return (
//     <div className="row">
//       <div className="col-md-2 navigation-container">
//         <div className="nav-item-container">
//           <a
//             href="#"
//             className="nav-link"
//             onClick={() => handleNavItemClick("Add")}
//           >
//             Add Course Content
//           </a>
//         </div>
//         <div className="nav-item-container">
//           <a
//             href="#"
//             className="nav-link"
//             onClick={() => handleNavItemClick("Update and Delete")}
//           >
//             Update/Delete Course Content
//           </a>
//         </div>
//         <div className="nav-item-container">
//           <a
//             href="#"
//             className="nav-link"
//             onClick={() => handleNavItemClick("Monitor")}
//           >
//             Monitor Learner Progress
//           </a>
//         </div>
//       </div>
//       <div className="col-md-10">
//         {/* <h4>Content Area</h4> */}
//         {selectedNavItem === "Add" && (
//           <div className="container py-4">
//             <div className="row justify-content-center">
//               <div className="col-lg-6 mb-5 mb-lg-0">
//                 <div
//                   className="card cascading-right bg-body-tertiary border-0 shadow p-4"
//                   style={{ backdropFilter: "blur(30px)" }}
//                 >
//                   <div className="card-body p-5 shadow-5 text-center">
//                     <h3>Add Course Content</h3>
//                   </div>
//                   <form className="needs-validation" noValidate>
//                     {/* Your form fields go here */}
//                     <div className="mb-3 row">
//                       <label
//                         htmlFor="courseName"
//                         className="col-sm-2 col-form-label"
//                       >
//                         Course :
//                       </label>
//                       <div className="col-sm-10">
//                         <select
//                           className="form-select"
//                           id="courseName"
//                           required
//                         >
//                           <option value="">Select a course</option>
//                           {courseNames.map((courseName, index) => (
//                             <option key={index} value={courseName}>
//                               {courseName}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="invalid-feedback">
//                           Please select a course.
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mb-3 row">
//                       <label
//                         htmlFor="contentTitle"
//                         className="col-sm-2 col-form-label"
//                       >
//                         Title:
//                       </label>
//                       <div className="col-sm-10">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="contentTitle"
//                           name="contentTitle"
//                           required
//                         />
//                         <div className="invalid-feedback">
//                           Please provide a title.
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mb-3 row">
//                       <label
//                         htmlFor="contentFile"
//                         className="col-sm-2 col-form-label"
//                       >
//                         Content:
//                       </label>
//                       <div className="col-sm-10">
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="contentFile"
//                           name="contentFile"
//                           required
//                         />
//                         <div className="invalid-feedback">
//                           Please choose a file.
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mb-3 row">
//                       <label
//                         htmlFor="contentTitle"
//                         className="col-sm-2 col-form-label"
//                       >
//                         Duration:
//                       </label>
//                       <div className="col-sm-10">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="contentTitle"
//                           name="contentTitle"
//                           required
//                         />
//                         <div className="invalid-feedback">
//                           Please provide a duration.
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mb-3 row">
//                       <label
//                         htmlFor="contentTitle"
//                         className="col-sm-2 col-form-label"
//                       >
//                         Status:
//                       </label>
//                       <div className="col-sm-10">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="contentTitle"
//                           name="contentTitle"
//                           readOnly
//                         />
//                         <div className="invalid-feedback">
//                           Please provide a title.
//                         </div>
//                       </div>
//                     </div>
//                     {/* Add more form fields as needed */}
//                     <button type="submit" className="btn btn-primary me-md-2">
//                       ADD
//                     </button>
//                     <button type="cear" className="btn btn-primary">
//                       CLEAR
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {selectedNavItem === "Update and Delete" && (
//           <div>
//             <div className="row justify-content-center">
//               <select
//                 className="form-select"
//                 style={{
//                   width: "50%",
//                   justifyContent: "center",
//                   marginTop: "5em",
//                 }}
//                 id="cars"
//               >
//                 <option value="">Select a course</option>
//                 {courseNames.map((courseName, index) => (
//                   <option key={index} value={courseName}>
//                     {courseName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="container py-4">
//               <div className="row justify-content-center">
//                 {" "}
//                 {/* Centering the content */}
//                 <div className="col-lg-6 mb-5 mb-lg-0">
//                   <div
//                     className="card cascading-right bg-body-tertiary border-0 shadow p-4"
//                     style={{ backdropFilter: "blur(30px)" }}
//                   >
//                     <div className="card-body p-5 shadow-5 text-center">
//                       <h3>Course content</h3>

//                       {/* Nested cards for each course content */}
//                       <div className="card mb-3">
//                         <div className="card-body d-flex justify-content-between align-items-center">
//                           <div>course content here</div>
//                           <div>status</div>
//                           <button type="button" className="btn btn-success">
//                             UPDATE
//                           </button>
//                           <button type="button" className="btn btn-danger">
//                             DELETE
//                           </button>
//                         </div>
//                       </div>
//                       <div className="card mb-3">
//                         <div className="card-body d-flex justify-content-between align-items-center">
//                           <div>course content here</div>
//                           <div>status</div>
//                           <button type="button" className="btn btn-success">
//                             UPDATE
//                           </button>
//                           <button type="button" className="btn btn-danger">
//                             DELETE
//                           </button>
//                         </div>
//                       </div>
//                       <div className="card mb-3">
//                         <div className="card-body d-flex justify-content-between align-items-center">
//                           <div>course content here</div>
//                           <div>status</div>
//                           <button type="button" className="btn btn-success">
//                             UPDATE
//                           </button>
//                           <button type="button" className="btn btn-danger">
//                             DELETE
//                           </button>
//                         </div>
//                       </div>
//                       <div className="card mb-3">
//                         <div className="card-body d-flex justify-content-between align-items-center">
//                           <div>course content here</div>
//                           <div>status</div>
//                           <button type="button" className="btn btn-success">
//                             UPDATE
//                           </button>
//                           <button type="button" className="btn btn-danger">
//                             DELETE
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {selectedNavItem === "Monitor" && (
//           <div>
//             <div className="row justify-content-end">
//               <select
//                 className="form-select"
//                 style={{
//                   width: "25%",
//                   justifyContent: "center",
//                   marginTop: "5em",
//                   marginRight: "5em",
//                 }}
//                 id="cars"
//               >
//                 {" "}
//                 <option value="">Select a course</option>
//                 {courseNames.map((courseName, index) => (
//                   <option key={index} value={courseName}>
//                     {courseName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="container py-4">
//               <div className="row g-0 align-items-center">
//                 <div
//                   className="col-lg-6 mb-5 mb-lg-0"
//                   style={{ width: "25%", marginRight: "5em" }}
//                 >
//                   <div
//                     className="card cascading-right bg-body-tertiary border-0 shadow p-4"
//                     style={{
//                       backdropFilter: "blur(30px)",
//                       width: "",
//                       height: "8em",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div style={{ marginRight: "10px" }}>
//                         <h6>No of students</h6>
//                         <h5>100</h5>
//                       </div>
//                       <div>
//                         <i
//                           className="fa fa-users"
//                           aria-hidden="true"
//                           style={{ fontSize: "40px", color: "#868b92" }}
//                         ></i>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 mb-5 mb-lg-0">
//                   <div
//                     className="card cascading-right bg-body-tertiary border-0 shadow p-4"
//                     style={{
//                       backdropFilter: "blur(30px)",
//                       width: "fit-content",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div style={{ marginRight: "10px" }}>
//                         <h6>Course Name</h6>
//                         <h5>Distributed Systems</h5>
//                         <h6>DS</h6>
//                       </div>
//                       <div>
//                         <i
//                           className="fa fa-graduation-cap"
//                           aria-hidden="true"
//                           style={{ fontSize: "40px", color: "#868b92" }}
//                         ></i>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="container py-4">
//               <div className="row g-0 align-items-center">
//                 <div className="col-lg-6 mb-5 mb-lg-0">
//                   <div
//                     className="card cascading-right bg-body-tertiary border-0 shadow p-4"
//                     style={{ backdropFilter: "blur(30px)" }}
//                   >
//                     {/* Insert your CanvasJS chart component here */}
//                     <CanvasJSReact.CanvasJSChart options={options} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;

//****************************************************************************************** */

import React, { useState, useEffect } from "react";
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
    if (selectedCourse) {
      axios
        .get(`http://localhost:8082/api/studentProgress/${selectedCourse}`)
        .then((response) => {
          setStudentCount(response.data.studentCount);
          setProgressData(response.data.progressData);
        })
        .catch((error) => {
          console.error("Error fetching student progress:", error);
        });
    }
  }, [selectedCourse]);

  useEffect(() => {
    // Fetch course content data from the backend
    axios
      .get("http://localhost:8082/api/courseContent")
      .then((response) => {
        setCourseContents(response.data.courseContents);
      })
      .catch((error) => {
        console.error("Error fetching course content:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/courseMaster/all")
      .then((response) => {
        setCourseNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course names:", error);
      });
  }, []);

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  // const sampleData = [
  //   { label: "Completed", y: 60 },
  //   { label: "In Progress", y: 30 },
  //   { label: "Not Started", y: 10 },
  // ];

  // const options = {
  //   animationEnabled: true,
  //   title: {
  //     text: "Learner Progress Overview",
  //   },
  //   data: [
  //     {
  //       type: "pie",
  //       startAngle: 60,
  //       toolTipContent: "<b>{label}</b>: {y}%",
  //       indexLabel: "{label} - {y}%",
  //       indexLabelPlacement: "inside",
  //       dataPoints: sampleData,
  //     },
  //   ],
  // };

  const options = {
    animationEnabled: true,
    title: {
      text: "Student Progress Overview",
    },
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const formObject = {};
  //   formData.forEach((value, key) => {
  //     formObject[key] = value;
  //   });
  //   formObject["status"] = "Not Approved"; // Set status outside the loop
  //   try {
  //     // Perform client-side form validation before making the request
  //     // e.g., check if required fields are filled
  //     await axios.post("http://localhost:8082/api/courseContent/", formObject); // Use environment variables for URL
  //     // Optionally, handle success (e.g., show a success message)
  //   } catch (error) {
  //     console.error("Error adding course content:", error);
  //     // Optionally, handle error (e.g., show an error message)
  //   }
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const formObject = {};
  //   formData.forEach((value, key) => {
  //     // If the key is 'content', check if it's a file
  //     if (key === "content" && value instanceof File) {
  //       formObject[key] = value; // If it's a file, directly assign it
  //     } else {
  //       formObject[key] = value;
  //     }
  //   });
  //   formObject["status"] = "Not Approved"; // Set status outside the loop
  //   try {
  //     // Perform client-side form validation before making the request
  //     // e.g., check if required fields are filled
  //     await axios.post("http://localhost:8082/api/courseContent/", formObject); // Use environment variables for URL
  //     // Optionally, handle success (e.g., show a success message)
  //   } catch (error) {
  //     console.error("Error adding course content:", error);
  //     // Optionally, handle error (e.g., show an error message)
  //   }
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const formObject = {};
  //   formData.forEach((value, key) => {
  //     formObject[key] = value;
  //   });
  //   formObject["status"] = "Not Approved";

  //   try {
  //     await axios.post("http://localhost:8082/api/courseContent/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Course content added successfully");
  //   } catch (error) {
  //     console.error("Error adding course content:", error);
  //     console.log("Message:", error.response.data.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("status", "Not Approved"); // Add status field manually
    try {
      await axios.post("http://localhost:8082/api/courseContent/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Course content added successfully");
    } catch (error) {
      console.error("Error adding course content:", error);
      console.log("Message:", error.response.data.message);
    }
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
                  {/* <form className="needs-validation" noValidate> */}
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                          name="courseName"
                          required
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
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
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
                          value={"Not Registered"}
                          readOnly
                        />
                        <div className="invalid-feedback">
                          Please provide a status.
                        </div>
                      </div>
                    </div>
                    {/* Add more form fields as needed */}
                    <button type="submit" className="btn btn-primary me-md-2">
                      ADD
                    </button>
                    <button type="clear" className="btn btn-primary">
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
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                  >
                                    UPDATE
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
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
                onChange={(e) => setSelectedCourse(e.target.value)}
                value={selectedCourse}
              >
                <option value="">Select a course</option>
                {courseNames.map((courseName, index) => (
                  <option key={index} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
            </div>
            {selectedCourse && (
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
                          <h5>{studentCount}</h5>
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
                          <h5>{selectedCourse}</h5>
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
            )}
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

          // <div>
          //   <div className="row justify-content-end">
          //     <select
          //       className="form-select"
          //       style={{
          //         width: "25%",
          //         justifyContent: "center",
          //         marginTop: "5em",
          //         marginRight: "5em",
          //       }}
          //       id="cars"
          //     >
          //       {" "}
          //       <option value="">Select a course</option>
          //       {courseNames.map((courseName, index) => (
          //         <option key={index} value={courseName}>
          //           {courseName}
          //         </option>
          //       ))}
          //     </select>
          //   </div>
          //   <div className="container py-4">
          //     <div className="row g-0 align-items-center">
          //       <div
          //         className="col-lg-6 mb-5 mb-lg-0"
          //         style={{ width: "25%", marginRight: "5em" }}
          //       >
          //         <div
          //           className="card cascading-right bg-body-tertiary border-0 shadow p-4"
          //           style={{
          //             backdropFilter: "blur(30px)",
          //             width: "",
          //             height: "8em",
          //           }}
          //         >
          //           <div style={{ display: "flex", alignItems: "center" }}>
          //             <div style={{ marginRight: "10px" }}>
          //               <h6>No of students</h6>
          //               <h5>100</h5>
          //             </div>
          //             <div>
          //               <i
          //                 className="fa fa-users"
          //                 aria-hidden="true"
          //                 style={{ fontSize: "40px", color: "#868b92" }}
          //               ></i>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //       <div className="col-lg-6 mb-5 mb-lg-0">
          //         <div
          //           className="card cascading-right bg-body-tertiary border-0 shadow p-4"
          //           style={{
          //             backdropFilter: "blur(30px)",
          //             width: "fit-content",
          //           }}
          //         >
          //           <div style={{ display: "flex", alignItems: "center" }}>
          //             <div style={{ marginRight: "10px" }}>
          //               <h6>Course Name</h6>
          //               <h5>Distributed Systems</h5>
          //               <h6>DS</h6>
          //             </div>
          //             <div>
          //               <i
          //                 className="fa fa-graduation-cap"
          //                 aria-hidden="true"
          //                 style={{ fontSize: "40px", color: "#868b92" }}
          //               ></i>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>

          //   <div className="container py-4">
          //     <div className="row g-0 align-items-center">
          //       <div className="col-lg-6 mb-5 mb-lg-0">
          //         <div
          //           className="card cascading-right bg-body-tertiary border-0 shadow p-4"
          //           style={{ backdropFilter: "blur(30px)" }}
          //         >
          //           {/* Insert your CanvasJS chart component here */}
          //           <CanvasJSReact.CanvasJSChart options={options} />
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
