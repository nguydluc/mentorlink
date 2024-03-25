import { useContext, useState } from "react";
import { registerUser, loginUser } from "../api/UserApi";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [registrationError, setRegistrationError] = useState([]);
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // event.preventDefault();

    try {
      const userLogin = { username: username, password: password };
      const loggedInUser = await loginUser(userLogin);

      console.log(loggedInUser);

      if (loggedInUser.token) {
        localStorage.setItem("token", loggedInUser.token);
        localStorage.setItem("user", loggedInUser.user);
        localStorage.setItem("id", loggedInUser.id);

        console.log(localStorage);
        const token = localStorage.getItem("token");

        if (token) {
          loggedInUser.isAuthenticated = true;
          loggedInUser.user = username;
          const id = loggedInUser.id;
          setCurrentUser(loggedInUser.user);
          console.log(loggedInUser.id);
          navigate(`/${id}/edit`);
        }
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  const submitRegistration = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 8) {
      alert("Your password must be longer than 8 characters.");
    }

    const userData = {
      email: email,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };
    try {
      const response = await registerUser(userData);
      if (response) {
        //navigate("login");
        handleLogin();
      }
    } catch (errorDetails) {
      setRegistrationError(
        "Either your email or username existed. Please try again."
      );
    }
  };
  return (
    <div className="py-[15vh]">
      <form
        onSubmit={(e) => submitRegistration(e)}
        className="max-w-xs mx-auto my-auto"
        method="post"
      >
        <h1 className="font-bold text-2xl mb-6">Register</h1>
        <div className="mb-5">
          <label
            htmlFor="firstname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="lastname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5 "
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmpassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmpassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className="text-red-500 text-center mt-2 mb-2">
          {registrationError}
        </p>
        <button
          type="submit"
          className="mb-6 text-white bg-mentorlink-black hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
        >
          Register
        </button>
      </form>
      <p className="text-center text-mentorlink-gray">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-mentorlink-blue hover:underline hover:cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
