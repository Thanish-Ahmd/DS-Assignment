import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LearnerDashboard from "./Components/LearnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learnerDashboard" element={<LearnerDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
