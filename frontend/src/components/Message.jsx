import { useState, useEffect } from "react";
import { myMessages, markRead } from "../api/UserApi";
import InboxTag from "./InboxTag";
import { Link, useNavigate } from "react-router-dom";

function Message() {
  const [messages, setMessages] = useState([]);
  const user_id = localStorage.getItem("id");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = () => {
      myMessages(user_id).then((data) => {
        setMessages(data);
      });
    };
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [user_id]);

  console.log(messages);
  const [processedMessages, setProcessedMessages] = useState([]);

  useEffect(() => {
    const validateMap = new Map();
    const filteredMessages = messages.filter((message) => {
      // Creating a unique key for each sender-receiver pair
      const key = `${message.sender}-${message.receiver}`;
      const reverseKey = `${message.receiver}-${message.sender}`;

      // Check if we've already processed this sender-receiver pair
      if (!validateMap.has(key) && !validateMap.has(reverseKey)) {
        // Mark this pair as processed
        validateMap.set(key, true);
        validateMap.set(reverseKey, true);
        return true;
      }
      return false;
    });

    setProcessedMessages(filteredMessages);
  }, [messages]);

  const handleMarkAsReadAndNavigate = (e, message, chatTo) => {
    e.preventDefault(); // Prevents the default link behavior

    // Call your function to mark the message as read
    if (user_id !== message.sender && !message.is_read) {
      markRead(message.id)
        .then(() => {
          navigate(`/inbox/${chatTo}`);
        })
        .catch((error) => {
          console.error("Failed to mark the message as read:", error);
          // Handle the error state here. Maybe navigate anyway or show an error message.
        });
    } else {
      navigate(`/inbox/${chatTo}`);
    }
  };

  //console.log(processedMessages);
  return (
    <div className="min-w-xs w-screen max-w-screen-2xl rounded-xl">
      <form className="flex justify-between w-full gap-4 px-6 items-center mt-[5rem] bg-black py-4">
        <label
          htmlFor="filterOptions"
          className="font-bold text-mentorlink-white"
        >
          Search
        </label>
        <input
          id="filterOptions"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="This is just a placeholder"
        />
      </form>
      <ul className="min-w-full max-w-sm mx-auto">
        {processedMessages.map((message) => {
          const chatTo =
            message.sender != user_id ? message.sender : message.receiver;
          console.log(chatTo);
          return (
            <li key={message.id}>
              <Link
                to={`/inbox/${chatTo}`}
                onClick={(e) => {
                  handleMarkAsReadAndNavigate(e, message, chatTo);
                }}
              >
                <InboxTag message={message} chatTo={chatTo} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Message;
