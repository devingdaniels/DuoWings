import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreed) {
      alert(`Welcome ${formData.username}`);
    } else {
      alert("Please agree to the terms.");
    }
    navigate("/home");
  };

  return (
    <div>
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={handleRegister}>
        <p>
          <label>
            Username
            <br />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Email address
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Password
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              required
            />
            I agree to the terms
          </label>
        </p>
        <p>
          <button type="submit">Register</button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </footer>
    </div>
  );
};

export default RegisterPage;
