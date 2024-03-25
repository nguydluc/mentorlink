import { useEffect, useState } from "react";
import { getUserDetail } from "../api/UserApi";

const InboxTag = ({ message, chatTo }) => {
  const currentId = localStorage.getItem("id");
  // Determine whom the tag is for based on the message sender and current user ID
  const tagFor = chatTo;

  // message.sender === currentId ? message.receiver : message.sender;

  //onsole.log(message.sender);
  const [tagUser, setTagUser] = useState({});

  useEffect(() => {
    // Fetch user details initially
    getUserDetail(tagFor).then((data) => {
      setTagUser(data);
    });
    // Including tagFor in the dependency array ensures the effect runs again if the tagFor value changes.
  }, [tagFor]);

  return (
    <div
      className={`px-2 py-4 ${
        message.sender != currentId && !message.is_read
          ? "bg-mentorlink-offwhite"
          : "bg-mentorlink-white"
      }`}
    >
      <div className="flex items-start gap-2 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <div className="w-full">
          <h1 className="font-bold text-lg">
            {tagUser?.firstname} {tagUser?.lastname}
          </h1>
          <p className="line-clamp-2">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default InboxTag;
