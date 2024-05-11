import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
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
import CourseContent from "./Components/CourseContent";
import AdminProfile from "./Components/AdminProfile";
import AdminChangePassword from "./Components/AdminChangePassword";
import CourseContentApproval from "./Components/CourseContentApproval";
import Payment from "./Components/Payment";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learnerDashboard" element={<LearnerDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/addInstructor" element={<AddInstructor />} />
          <Route path="/courseContentApproval" element={<CourseContentApproval />} />
          <Route path="/insructorDashboard" element={<InstructorDashboard />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route
            path="/adminChangePassword"
            element={<AdminChangePassword />}
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
