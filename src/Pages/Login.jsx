import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    //append means to combine with the formData
    //formData is a built-in object in JavaScript that allows you to collect form data and send it to a server.
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/login",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data.data.email);

      if (response.ok && data.data.authorization) {
        localStorage.setItem("token", data.data.authorization);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error" + err);
    }
  };

  const ForgetPassword = async () => {
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/domain-check",
        {
          method: "POST",
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      console.log(" data is :", data);

      if (response.ok) {
        // localStorage.setItem("token", data.data.email);
        navigate("/forget-password");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl px-10 py-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login into FiveLumens
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
        <div>
          <p className="font-semibold ">
            {" "}
            You don`t have an Account ? go to Sign Page{" "}
          </p>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
          <Link to={"/signup"}> sign Up </Link>{" "}
        </button>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-3 "
          onClick={ForgetPassword}
        >
          Forget Password
        </button>
      </form>
    </div>
  );
};

export default Login;
