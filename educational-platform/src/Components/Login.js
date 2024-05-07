import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const body = {
      email,
      password,
    };
    axios
      .post(
        `https://nasa-app-backend-usermanagement.onrender.com/api/users/login`,
        body
      )
      .then((res) => {
        if (res.data.message == "Login Successfull") {
          alert("Login successfull");
          localStorage.setItem("token", res.data.token);
          window.location = "/";
        } else if (res.data.message == "Incorrect password") {
          alert("Incorrect Password");
        } else if (res.data.message == "Invalid email") {
          alert("Invalid Email");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured");
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
                <h2 className="fw-bold mb-5">Login</h2>
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
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
                      required
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign In
                  </button>

                  <div className="text-center">
                    <p>do not have an account:</p>
                    <a
                      href="/signup"
                      className="btn btn-link btn-floating mx-1"
                    >
                      Sign-up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="./images/books.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
