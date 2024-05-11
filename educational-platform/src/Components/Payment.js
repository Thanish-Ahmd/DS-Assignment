import React from "react";
import axios from "axios";
import LearnerNavBar from "./LearnerNavBar";

const Payment = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/pay"); 
      console.log(response.data);
      // Redirect user to the PayPal approval URL
      window.location.href = response.data.approval_url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="row">
      <LearnerNavBar />
      <div className="col-md-10">
        <h1>Payment</h1>
        <h2>Enroll for $1</h2>
        <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Pay Now
          </button>
      </div>
    </div>
  );
};

export default Payment;
