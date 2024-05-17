import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiBookmarklet } from "react-icons/gi";
import CourseCards from "../Components/CourseCards";
import axios from "axios";

const LearnerDashboard = () => {
  const navLinks = [
    "Dashboard",
    "New Courses",
    "Unenroll Course",
    // "Profile",
    "Change Password",
    "Logout",
  ]

  const [selected, setSelected] = useState('dashboard');
  const [enrolCourse, setEnrolCourse] = useState('');
  const [unenrollCourse, setUnenrollCourse] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([{}]);
  const [unenrolledCourses, setUnenrolledCourses] = useState([{}]);
  const [availableCourses, setAvailableCourses] = useState([{}]);
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseDetails, setCourseDetails] = useState({
    code: '',
    name: ''
  });
  const [learner, setLearner] = useState({});

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        console.log(res.data);
        if(res.data.message == 'Authentication Successfull') {
        } else {
          alert("Your session expired and you have been logged out");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert("You have been logged out");
        window.location.href = "/";
        console.log(err);
      });
  };

  useEffect(() => {
    verifyLearner();
  }, []);

  const getLearnerDetails = async () => {
    const token = localStorage.getItem("token");
    const headers = {token: token};

    const response = await fetch('http://localhost:8081/api/learners/get', {
      method: 'GET',
      headers
    });
    const data = await response.json();
    const { password, ...learnerWithoutPassword } = data?.learner[0];
    setLearner(learnerWithoutPassword);
  }

  useEffect(() => {
    getLearnerDetails();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch('http://localhost:8082/api/courseMaster/all');
      const data = await response.json();
      
      setAvailableCourses(data)
    }

    fetchCourseDetails()
  }, []);

  useEffect(() => {
    if (learner.courses && availableCourses.length > 0) {
      const enrolled = availableCourses.filter(course => learner.courses.includes(course._id));
      const unenrolled = availableCourses.filter(course => !learner.courses.includes(course._id));
      setEnrolledCourses(enrolled);
      setUnenrolledCourses(unenrolled);
    }
  }, [learner, availableCourses]);

  const handleEnrolCourseChange = (e) => {
    const selectedCourse = unenrolledCourses.find(course => course._id === e.target.value);
    if (selectedCourse) {
      setCoursePrice(selectedCourse.price);
    }
    setEnrolCourse(e.target.value);
  };

  const handleUnenrollCourseChange = (e) => {
    const selectedCourse = enrolledCourses.find(course => course._id === e.target.value);
    if (selectedCourse) {
      setCourseDetails({
        code: selectedCourse.courseCode,
        name: selectedCourse.courseName
      });
    }
    setUnenrollCourse(e.target.value);
  };

  const handleEnrolFormSubmit = async (e) => {
    e.preventDefault();

    if (!enrolCourse) {
      alert("Please select a course to enroll");
      return;
    }

    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to enrol in the desired course?");
    if (!isConfirmed) {
      return;
    }

    await axios.put('http://localhost:8085/enrolCourse', {email: learner.email, courses: enrolCourse})
    .then(() => {
      alert("Enrolled to the course successfully");
      setSelected('dashboard');
      getLearnerDetails();
      setEnrolCourse('')
      setCoursePrice(0)
    })
    .catch(err => {
      alert(err);
    })
  };

  const handleUnenrollFormSubmit = async (e) => {
    e.preventDefault();

    if (!unenrollCourse) {
      alert("Please select a course to unenroll");
      return;
    }

    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to unenroll from the desired course?");
    if (!isConfirmed) {
      return;
    }

    await axios.put('http://localhost:8085/unenrollCourse', {email: learner.email, course: unenrollCourse})
    .then(() => {
      alert("Unenrolled from the course successfully");
      setSelected('dashboard');
      getLearnerDetails();
      setUnenrollCourse('')
      setCourseDetails({})
    })
    .catch(err => {
      alert(err);
    })
  };

  const changePassword = (e) => {
    e.preventDefault();

    const body = { password, oldPassword };

    if(!password || !oldPassword || !confirmPassword) {
      alert("Please fill all the fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/login";
    }
    
    else {
      const headers = { token: token }

      if (password == confirmPassword) {
        axios
          .post(`http://localhost:8081/api/learners/changePassword`, body, {
            headers: headers,
          })
          .then((res) => {
            if (res.data.message == "Password changed") {
              alert("Password changed successfully!");
              logout()
            } else if (res.data.message == "Error in changing password") {
              alert("Error in changing password");
            } else if (res.data.message == "Incorrect Password") {
              alert("Incorrect Password");
            }
          })
          .catch((err) => {
            alert("Error occurred!");
            console.log(err);
          });
      } else {
        alert("Passwords do not match each other!");
      }
    }
  };

  const navigateToEnrollement = (courseData) => {
    // Navigate to the enrollement.js page and pass the course data as a parameter
    // For example, you can use window.location.href to navigate
    window.location.href = `/enrollement?courseCode=${courseData.courseCode}&courseName=${courseData.courseName}&coursePrice=${courseData.price}`;
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (selected === "logout") {
      logout();
    }
  }, [selected]);

  return (
    <div className="flex flex-row w-full p-[1%] h-screen gap-[1%]">
      <div className='w-[15%] bg-purple-600 flex flex-col h-full rounded-2xl py-3 gap-4 shadow-lg'>
        <GiBookmarklet size={150} className="self-center text-purple-300"/>
        <div className='flex flex-col items-center gap-3 text-lg font-medium px-2'>
          {navLinks.map((navLink) => (
            <Link
              key={navLink}
              onClick={() => setSelected(navLink.toLowerCase())}
              // to='' 
              className={`no-underline w-full text-center rounded-xl py-1 ${selected === navLink.toLowerCase() ? 'bg-white text-purple-600 shadow-md' : 'text-white hover:bg-purple-400 hover:text-purple-600 hover:shadow-md'}`}>
                {navLink}
            </Link>
          ))}
        </div>
      </div>
      <div className='w-[84%] rounded-2xl p-3 border-slate-300 border'>
        <div className='flex flex-col gap-3'>
          <text className='text-slate-700 font-bold text-lg'>Enrolled Courses</text>
          <div className='flex flex-row gap-2'>
            <CourseCards courses={enrolledCourses} navigateToEnrollement={navigateToEnrollement}/>
          </div>
        </div>
      </div>
      {selected === "new courses" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
          <form 
            onSubmit={handleEnrolFormSubmit} 
            className='flex flex-col h-fit w-[350px] bg-white rounded-xl p-4 shadow-lg'
          >
            <text className="text-slate-900 font-bold text-2xl text-center mb-4">Enrol to New Course</text>
            <select 
              className='py-1 px-2 rounded-xl border border-gray-300 text mb-3'
              value={enrolCourse} 
              onChange={handleEnrolCourseChange}
            >
              <option value='' disabled>Select a Course</option>
              {unenrolledCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
              {enrolledCourses.map((course) => (
                <option disabled key={course._id} value={course._id} className="bg-gray-300">
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            <div className="flex flex-row w-full items-center gap-2 mb-4">
              <text className="">Course Price:</text>
              <text className='text-xl font-medium'>USD {coursePrice}</text>
            </div>
            <div className="flex flex-row justify-between">
              <button 
                type='button' 
                onClick={() => {
                  setSelected('dashboard')
                  setEnrolCourse('')
                  setCoursePrice(0)
                }} 
                className="bg-gray-400 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button type='submit' className="bg-purple-600 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm">Enrol</button>
            </div>
          </form>
        </div>
      )}
      {selected === "unenroll course" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
          <form 
            onSubmit={handleUnenrollFormSubmit} 
            className='flex flex-col h-fit w-[350px] bg-white rounded-xl p-4 shadow-lg'
          >
            <text className="text-slate-900 font-bold text-2xl text-center mb-4">Unenroll a Course</text>
            <select 
              className='py-1 px-2 rounded-xl border border-gray-300 text mb-3'
              value={unenrollCourse} 
              onChange={handleUnenrollCourseChange}
            >
              <option value='' disabled>Select a Course</option>
              {enrolledCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            <div className="flex flex-row w-full items-center gap-2 mb-2.5 leading-[18px]">
              <text>Course Code:</text>
              <text className='font-medium'>{courseDetails.code}</text>
            </div>
            <div className="flex flex-row w-full items-center gap-2 mb-4 leading-[18px]">
              <text>Course Name:</text>
              <text className='font-medium'>{courseDetails.name}</text>
            </div>
            <div className="flex flex-row justify-between">
              <button 
                type='button' 
                onClick={() => {
                  setSelected('dashboard')
                  setUnenrollCourse('')
                  setCourseDetails({})
                }} 
                className="bg-gray-400 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button type='submit' className="bg-purple-600 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm">Unenroll</button>
            </div>
          </form>
        </div>
      )}
      {selected === "change password" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
          <form 
            onSubmit={changePassword} 
            className='flex flex-col h-fit w-[350px] bg-white rounded-xl p-4 shadow-lg gap-4'
          >
            <text className="text-slate-900 font-bold text-2xl text-center ">Change Password</text>
            <div className='flex flex-col gap-2.5'>
              <div>
                <label htmlFor="oldPassword" className="mb-0.5 ml-1">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Enter Password"
                  onChange={(e) => {setOldPassword(e.target.value)}}
                />            
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-0.5 ml-1">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter New Password"
                  onChange={(e) => {setPassword(e.target.value)}}
                />            
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-0.5 ml-1">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => {setConfirmPassword(e.target.value)}}
                />            
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <button 
                type='button' 
                onClick={() => {
                  setSelected('dashboard')
                  setPassword('')
                  setOldPassword('')
                  setConfirmPassword('')
                }} 
                className="bg-gray-400 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button type='submit' className="bg-purple-600 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm">Change</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LearnerDashboard;
