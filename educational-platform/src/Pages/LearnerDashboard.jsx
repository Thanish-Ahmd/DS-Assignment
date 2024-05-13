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
    "Profile",
    "Change Password",
    "Logout",
  ]

  const [selected, setSelected] = useState('dashboard');
  const [showEnrolPopup, setShowEnrolPopup] = useState(false);
  const [showUnenrollPopup, setShowUnenrollPopup] = useState(false);
  const [enrolCourse, setEnrolCourse] = useState('');
  const [unenrollCourse, setUnenrollCourse] = useState('');
  const [availableCourses, setAvailableCourses] = useState([{}]);
  const [coursePrice, setCoursePrice] = useState(0);

  // const courses = [
  //   {
  //     name: 'DS',
  //     fullName: 'Distributed Systems',
  //     code: 'SE3020',
  //   },
  //   {
  //     name: 'AF',
  //     fullName: 'Application Frameworks',
  //     code: 'SE3040',
  //   },
  //   {
  //     name: 'SA',
  //     fullName: 'Software Architecture',
  //     code: 'SE3030',
  //   },
  // ]

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

  // useEffect(() => {
  //   verifyLearner();
  // }, []);

  useEffect(() => {
    verifyLearner();
    const fetchCourseDetails = async () => {
      const response = await fetch('http://localhost:8082/api/courseMaster/all');
      const data = await response.json();
      
      setAvailableCourses(data)
    }

    fetchCourseDetails()
  }, []);

  useEffect(() => {
    if (selected === "new courses") {
      setShowEnrolPopup(true);
    }

    if (selected === "unenroll course") {
      setShowUnenrollPopup(true);
    }
  }, [selected]);

  const handleEnrolFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    showEnrolPopup(false);
    setSelected('dashboard');
  };

  const handleUnenrollFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowUnenrollPopup(false);
    setSelected('dashboard');
  };

  const handleCourseChange = (e) => {
    const selectedCourse = availableCourses.find(course => course.courseName === e.target.value);
    if (selectedCourse) {
      setCoursePrice(selectedCourse.price);
    }
    setEnrolCourse(e.target.value);
  };

  const navigateToEnrollement = (courseData) => {
    // Navigate to the enrollement.js page and pass the course data as a parameter
    // For example, you can use window.location.href to navigate
    window.location.href = `/enrollement?courseCode=${courseData.courseCode}&courseName=${courseData.courseName}&coursePrice=${courseData.price}`;
  };
  

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
            <CourseCards courses={availableCourses} navigateToEnrollement={navigateToEnrollement}/>
          </div>
        </div>
      </div>
      {showEnrolPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form 
            onSubmit={handleEnrolFormSubmit} 
            className='flex flex-col h-fit w-[350px] bg-white rounded-xl p-4 shadow-lg'
          >
            <text className="text-slate-900 font-bold text-2xl text-center mb-4">Enrol to New Course</text>
            <select 
              className='py-1 px-2 rounded-xl border border-gray-300 text mb-3'
              value={enrolCourse} 
              onChange={handleCourseChange}
            >
              <option value='' disabled>Select a Course</option>
              {availableCourses.map((course) => (
                <option key={course.courseCode} value={course.courseName}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            <div className="flex flex-row w-full items-center gap-2 mb-4">
              <text className="">Course Price:</text>
              <text className='text-xl font-medium'>LKR {coursePrice}</text>
            </div>
            <div className="flex flex-row justify-between">
              <button 
                type='button' 
                onClick={() => {
                  setShowEnrolPopup(false)
                  setSelected('dashboard')
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
      {/* {showUnenrollPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form 
            onSubmit={handleUnenrollFormSubmit} 
            className='flex flex-col h-fit w-[350px] bg-white rounded-xl p-4 shadow-lg'
          >
            <text className="text-slate-900 font-bold text-2xl text-center mb-4">Unenroll a Course</text>
            <select 
              className='py-1 px-2 rounded-xl border border-gray-300 text mb-3'
              value={unenrollCourse} 
              onChange={(e) => setUnenrollCourse(e.target.value)}
            >
              <option value='' disabled>Select a Course</option>
              {courses.map((course) => (
                <option key={course.code} value={course.fullName}>
                  {course.code} - {course.fullName}
                </option>
              ))}
            </select>
            <div className="flex flex-row w-full items-center gap-2 mb-4">
              <text className="">Course Price:</text>
              <text className='text-xl font-medium'>LKR 999.00</text>
            </div>
            <div className="flex flex-row justify-between">
              <button 
                type='button' 
                onClick={() => {
                  setShowUnenrollPopup(false)
                  setSelected('dashboard')
                }} 
                className="bg-gray-400 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button type='submit' className="bg-purple-600 w-24 h-8 rounded-2xl text-white font-semibold shadow-sm">Unenroll</button>
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
};

export default LearnerDashboard;
