import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import "./Styles/login.css";
import "./Styles/theme.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LearnerDashboard from "./Components/LearnerDashboard";
import InstructorDashboard from "./Components/InstructorDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./Components/AdminDashboard";
import Instructors from "./Components/Instructors";
import AddInstructor from "./Components/AddInstructor";

// import CourseContent from "./Components/CourseContent";
import AdminProfile from "./Components/AdminProfile";
import AdminChangePassword from "./Components/AdminChangePassword";
import CourseContentApproval from "./Components/CourseContentApproval";
import Payment from "./Components/Payment";
import { useEffect, useState } from "react";
import axios from "axios";
import LearnerProfile from "./Components/LearnerProfile";
import LearnerChangePassword from "./Components/LearnerChangePassword";
import AllAdmins from "./Components/AllAdmins";

function App() {
  const [adminLogged, setAdminLogged] = useState(false);
  const [learnerLogged, setLearnerLogged] = useState(false);
  const [instructorLogged, setInstructorLogged] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {}, []);

  const verifyInsrtructor = async () => {
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
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/";
        console.log(err);
      });
  };
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
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/";
        console.log(err);
      });
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/instructors" element={<Instructors />} />
          <Route path="/allAdmins" element={<AllAdmins />} />
          <Route path="/addInstructor" element={<AddInstructor />} />

          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route
            path="/adminChangePassword"
            element={<AdminChangePassword />}
          />

          <Route
            path="/courseContentApproval"
            element={<CourseContentApproval />}
          />
          <Route
            path="/instructorDashboard"
            element={<InstructorDashboard />}
          />
          <Route path="/adminProfile" element={<AdminProfile />} />

          <Route path="/insructorDashboard" element={<InstructorDashboard />} />

          <Route path="/learnerDashboard" element={<LearnerDashboard />} />
          <Route path="/learnerProfile" element={<LearnerProfile />} />
          <Route
            path="/learnerChangePassword"
            element={<LearnerChangePassword />}
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
