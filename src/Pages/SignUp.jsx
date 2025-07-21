import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [industry, setindustry] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [domain, setdomain] = useState("");
  const [passsword, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("companyName", companyName);
    formData.append("industry", industry);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("domain", domain);
    formData.append("password", passsword);
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/signup",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok && data.data) {
        navigate("/");
      } else {
        console.log("sign up failed", data.message);
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };
  //   const checkApi = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://fldemo.fivelumenstest.com/api/signup",
  //         {
  //           method: "POST",
  //           body: JSON.stringify(),
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log("error is ", error);
  //     }
  //   };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSignUp}
        className="bg-white shadow-lg rounded-xl px-10 py-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Sign Up to FiveLumens
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <input
            value={firstName}
            type="text"
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="Enter your First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            type="text"
            placeholder="Enter your Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            company Name
          </label>
          <input
            value={companyName}
            onChange={(e) => setcompanyName(e.target.value)}
            type="text"
            placeholder="Enter your company Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Industry Name
          </label>
          <select
            value={industry}
            onChange={(e) => setindustry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select your industry
            </option>
            <option value="Consulting & Services">Consulting & Services</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Hospitality & Leisure">Hospitality & Leisure</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Retail & Consumer Goods">
              Retail & Consumer Goods
            </option>
            <option value="Technology">Technology</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Country Name
          </label>
          <input
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            type="text"
            placeholder="Enter your Country Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Telephone Number
          </label>
          <input
            value={phone}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/[^0-9]/g, "");
              setphone(value);
            }}
            maxLength={11}
            type="tel"
            placeholder="Enter your Phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Domail Name
          </label>
          <input
            value={domain}
            onChange={(e) => setdomain(e.target.value)}
            type="text"
            placeholder="Enter your Domain"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Passsword
          </label>
          <input
            value={passsword}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )} */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {" "}
          Sign Up
        </button>
        <div>
          <p className="font-semibold ">
            {" "}
            Already have an Account ? go to Login Page
          </p>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
          <Link to={"/"}> Login </Link>
        </button>
      </form>
    </div>
  );
};
export default SignUp;
