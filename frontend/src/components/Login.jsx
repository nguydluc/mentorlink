//import { useAuthenticationContext } from "../providers/AuthenticationProvider";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { loginUser } from "../api/UserApi";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state

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
          setCurrentUser(loggedInUser.user);
          console.log(loggedInUser.user);
          navigate("/");
        }
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="py-[15vh]">
      <form
        className="max-w-xs mx-auto my-auto"
        onSubmit={(e) => {
          handleLogin(e);
        }}
        method="post"
      >
        <h1 className="font-bold text-2xl mb-6">Login</h1>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="text-red-500 text-center mt-2 mb-2">{error}</p>

        <button
          type="submit"
          className="mb-6 text-white bg-mentorlink-black hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
      <p className="text-center text-mentorlink-gray">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-mentorlink-blue hover:underline hover:cursor-pointer"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
