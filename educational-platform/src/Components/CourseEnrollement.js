import React, { useEffect, useState } from 'react';
import AdminNavBar from "./AdminNavBar";

const Enrollement = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [coursePrice, setCoursePrice] = useState('');

  useEffect(() => {
    // Function to extract URL parameters
    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(window.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Extract course data from URL parameters
    const extractedCourseCode = getUrlParameter('courseCode');
    const extractedCourseName = getUrlParameter('courseName');
    const extractedCoursePrice = getUrlParameter('coursePrice');

    // Update state with course data
    setCourseCode(extractedCourseCode);
    setCourseName(extractedCourseName);
    setCoursePrice(extractedCoursePrice);
  }, []);

  const handleEnrollClick = () => {
    // Construct the URL with enrolment details as query parameters
    const url = `/payment?courseCode=${courseCode}&courseName=${courseName}&coursePrice=${coursePrice}`;
    // Navigate to the Payment page
    window.location.href = url;
  };

  return (
    <div className="row">
       <AdminNavBar />
      <div className="col-md-10">
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Enrollement Details</h1>
        <br/>
        <p><strong>Course Code:</strong> {courseCode}</p>
        <p><strong>Course Name:</strong> {courseName}</p>
        <p><strong>Course Price:</strong> {coursePrice}</p>
        {/* Additional content for enrollement page */}
        <button className="btn btn-primary" onClick={handleEnrollClick} style = {{
    backgroundColor: '#3c8518', 
    color: 'white', 
    padding: '10px 20px', 
    borderRadius: '5px', 
    border: 'none', 
    width: '300px',
    marginLeft: '20px',
    marginTop: '20px',
    fontSize: '18px',
    cursor: 'pointer'}}>Enroll</button>
      </div>
    </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh', // Set the height of the container to full viewport height
  },
  box: {
    textAlign: 'left',
    padding: '20px',
    border: '5px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    height: '400px',
  },
};

export default Enrollement;
