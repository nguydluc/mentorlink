import { Link } from "react-router-dom";
import Logo from "../assets/favicon.svg";

const Def = () => {
  return (
    <div className="min-w-xs max-w-screen-2xl w-screen mx-auto flex flex-col gap-4 justify-around items-center mt-[9rem] h-[100%]">
      <img src={Logo} alt="Mentorlink's wordmark" width="200" height="auto" />
      <Link
        to="/login"
        className="mb-2 mt-10 text-white bg-mentorlink-black hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[80%] md:w-[40%]"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="mb-6 text-white bg-mentorlink-black hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[80%] md:w-[40%]"
      >
        Register
      </Link>
    </div>
  );
};

export default Def;
