import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(null);
  const [sentOtp, setSentOtp] = useState(null);

  const signup = () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(otp, sentOtp);
    if (otp != null && otp == sentOtp) {
      axios
        .post(`http://localhost:8081/api/learners/add`, body)
        .then((res) => {
          alert("Registration successfull");
          window.location = "/";
        })
        .catch((err) => {
          alert("Registration not successfull");
        });
    } else {
      alert("Invalid OTP");
    }
  };

  const sendotp = (e) => {
    e.preventDefault();
    const body = {
      email,
    };
    axios
      .post(`http://localhost:8081/api/learners/sendotp`, body)
      .then((res) => {
        if (res.data.message == "Email already exist;")
          alert("OTP sent to your email checkyour email!!");
        setVerified(true);
        setSentOtp(res.data.otp);
        console.log(res.data.otp);
      })
      .catch((err) => {
        alert("Registration not successfull");
      });
  };
  return (
    <section className="text-center text-lg-start">
      <style>
        {`
        .cascading-right {
          margin-right: -50px;
        }

        @media (max-width: 991.98px) {
          .cascading-right {
            margin-right: 0;
          }
        }
      `}
      </style>
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right bg-body-tertiary border-0 shadow"
              style={{ backdropFilter: "blur(30px)" }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    signup();
                  }}
                >
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="form3Example1">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          className="form-control"
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {!verified && (
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-warning btn-block mb-4"
                      onClick={sendotp}
                    >
                      Send OTP
                    </button>
                  )}

                  {verified && (
                    <div>
                      <input
                        type="number"
                        id="form3Example1"
                        className="form-control"
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                        max={9999}
                        placeholder="OTP"
                      />
                      <label className="form-label" htmlFor="form3Example1">
                        Check your mail to verify. Do not refresh!!
                      </label>{" "}
                      <br />
                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-danger btn-block mb-4"
                        onClick={sendotp}
                      >
                        Resend OTP
                      </button>{" "}
                      <br />
                      <button
                        id="signupbtn"
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-warning btn-block mb-4"
                        onClick={signup}
                      >
                        Sign up
                      </button>
                    </div>
                  )}

                  <div className="text-center">
                    <p>already have an account:</p>
                    <a href="/" className="btn btn-link btn-floating mx-1">
                      Sign-in
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="./images/signup-img.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
