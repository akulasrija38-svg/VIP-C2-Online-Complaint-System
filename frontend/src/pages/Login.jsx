import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
  useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
      await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
localStorage.setItem(
  "role",
  res.data.role
);


      alert("Login Success");

      if (res.data.role === "ADMIN") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}

    } 
    catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    "Backend server not running"
  );

}

  };

  return (
    <div className="container mt-5">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button
          className="btn btn-success"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;