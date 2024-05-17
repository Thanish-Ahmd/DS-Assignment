import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LearnerNavBar from "./LearnerNavBar";

const Payment = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8084/pay",{
      coursePrice: coursePrice, // Send the course price to the backend
    });
      console.log(response.data);
      // Redirect user to the PayPal approval URL
      window.location.href = response.data.approval_url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const courseCode = queryParams.get('courseCode');
  const courseName = queryParams.get('courseName');
  const coursePrice = queryParams.get('coursePrice');

  return (
    <div className="row">
      <LearnerNavBar />
      <div className="col-md-10">
      <div style={styles.container}>
      <div style={styles.box}>
        <h1>Payment</h1>
        <div>
          <p><strong>Course Code:</strong> {courseCode}</p>
          <p><strong>Course Name:</strong> {courseName}</p>
          <p><strong>Course Price:</strong> {coursePrice}</p>
        </div>
        <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit} style = {{
              backgroundColor: '#3c8518', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              border: 'none', 
              width: '280px',
              marginLeft: '10px',
              marginTop: '20px',
              fontSize: '18px',
              cursor: 'pointer'}}
          >
            Pay Now
          </button>
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
    height: '70vh', 
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

export default Payment;
