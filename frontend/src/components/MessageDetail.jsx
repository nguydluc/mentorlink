import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import {
  getMessages,
  myMessages,
  sendMessages,
  getUserDetail,
} from "../api/UserApi";

function MessageDetail() {
  const [messages, setMessages] = useState([]); // Stores all messages for the user
  const [message, setMessage] = useState([]); // Stores messages for the specific conversation
  let [newMessage, setNewMessage] = useState("");
  const { id } = useParams(); // Destructuring to get id directly
  const user_id = localStorage.getItem("id");
  const [userDetail, setUserDetail] = useState();
  const messagesEndRef = useRef(null); // Add this line

  useEffect(() => {
    // Fetch all messages for the logged-in user
    myMessages(user_id).then(setMessages);
  }, [user_id]);

  useEffect(() => {
    // Fetch user details initially
    getUserDetail(id).then((data) => {
      setUserDetail(data);
    });
  }, []);

  useEffect(() => {
    // Poll for new messages in the conversation every second
    const interval = setInterval(() => {
      getMessages(user_id, id).then(setMessage);
    }, 1000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [user_id, id]);

  useEffect(() => {
    // Scroll to bottom whenever messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessage = () => {
    // Implement your send message functionality here
    const formdata = {
      user: user_id,
      sender: user_id,
      receiver: id,
      message: newMessage,
      is_read: false,
    };
    sendMessages(formdata);
    setNewMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Chat window */}
      <div className="h-16 w-screen max-w-screen-2xl bg-mentorlink-white flex items-center shadow-lg px-4 mb-6 fixed top-20">
        <div className="flex gap-4">
          <Link to="/inbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <p className="font-bold text-lg">
            {userDetail?.firstname} {userDetail?.lastname}
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl">
        <div className=" h-[65vh] mt-[9rem] p-4 flex-grow overflow-auto">
          {/* Messages will be shown here */}
          {message.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col mb-6 ${
                msg.sender == user_id
                  ? "text-right text-mentorlink-white bg-mentorlink-blue w-[80%] md:w-[40%] ml-auto rounded-lg p-2 mb-4"
                  : "text-left bg-[#D9D9D9] w-[80%] md:w-[40%] p-2 rounded-lg mb-4 "
              } pb-4`}
            >
              <div className={msg.sender != user_id ? "flex gap-4" : ""}>
                {msg.sender != user_id ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                ) : null}
                <div>
                  <p className="font-light">
                    {moment.utc(msg.date).local().startOf("seconds").fromNow()}
                  </p>

                  <p className="">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-mentorlink-black flex h-20 w-screen max-w-screen-2xl items-center justify-center px-2 fixed bottom-0">
        <input
          type="text"
          className="w-[80%] h-10 m-4 p-4 rounded-lg"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevents the default action of inserting a newline
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-mentorlink-white"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MessageDetail;
