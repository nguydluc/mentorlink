import { useContext } from "react";
import Logo from "../assets/logo.svg";
import { UserContext } from "../providers/UserContext";
import { logoutUser } from "../api/UserApi";
import { useNavigate, Link } from "react-router-dom";

// Assuming currentUser is passed as a prop to Header

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitLogout(event) {
    event.preventDefault();
    await logoutUser();
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  const id = localStorage.getItem("id");

  return !currentUser ? (
    <header className="bg-mentorlink-offwhite flex items-center justify-center py-6 fixed top-0 w-screen max-w-screen-2xl mx-auto">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-[150px] h-auto"
        src={Logo}
        alt="mentorlink's logo"
      />
    </header>
  ) : (
    <header className="flex flex-row justify-between items-center px-6 py-6 bg-mentorlink-offwhite fixed w-screen max-w-screen-2xl top-0 mx-auto">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-[150px] h-auto"
        src={Logo}
        alt="mentorlink's logo"
      />

      <div className="flex items-center gap-2">
        <form method="get" onSubmit={(event) => submitLogout(event)}>
          <button className="hover:underline" type="submit">
            Log out
          </button>
        </form>
        <Link to={`/${id}`}>
          <svg
            className="w-8 h-8 text-gray-800 hover:scale-105"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <Link to="/inbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 hover:scale-105"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
