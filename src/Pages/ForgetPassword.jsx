import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function ForgetPassword() {
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();
  const handleForget = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("domain", domain);
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/domain-check",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("token", data.data.authorization);
        console.log("response is okay");
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };
  const LoginScreenPage = async () => {
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
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-xl px-10 py-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 my-8">
          Forget Password Page
        </h1>
        <h3 className="text-2xl font-bold text-center text-gray-700 my-3">
          Please enter the email address linked to your user for a password
          reset email to be sent.
        </h3>

        <form onSubmit={handleForget}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              value={domain}
              type="text"
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
            Reset Your Password
          </button>
        </form>
        <button
          className="w-full bg-blue-100 hover:bg-blue-700 text-black font-semibold py-2 rounded-lg transition duration-200"
          onClick={LoginScreenPage}
        >
          <Link to={"/"}> go back to login screen </Link>{" "}
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
