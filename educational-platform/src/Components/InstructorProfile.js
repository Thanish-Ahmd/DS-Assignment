import axios from "axios";
import React, { useEffect, useState } from "react";

const InstructorProfile = () => {
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

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    verifyIntructor();
    getInstructorDetails();
    const fetchCourseNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/courseMaster/all"
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

  const getInstructorDetails = () => {
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/";
    } else {
      const headers = {
        token: token,
      };

      axios
        .get(`http://localhost:8081/api/instructors/get`, {
          headers: headers,
        })
        .then((res) => {
          console.log(res.data.instructor);
          setEmail(res.data.instructor[0].email);
          setFirstName(res.data.instructor[0].firstName);
          setLastName(res.data.instructor[0].lastName);
          setPhoneNo(res.data.instructor[0].phoneNo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateIntructor = () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };
    if (password != "") {
      axios
        .put(`http://localhost:8081/api/instructors/update`, body)
        .then((res) => {
          if (res.data.message == "Instructor Updated") {
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
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  return (
    <div className="row">
      <div className="col-md-2 navigation-container">
        <div className="nav-item-container">
          <a href="/instructorDashboard" className="nav-link">
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
              updateIntructor();
            }}
          >
            Update Intructor Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorProfile;
