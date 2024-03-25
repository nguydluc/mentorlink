import { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import { getUsers } from "../api/UserApi";

const Feed = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users

  useEffect(() => {
    // Fetch all users initially
    getUsers().then((data) => {
      setAllUsers(data);
      setFilteredUsers(data); // Initially, no filter is applied
    });
  }, []);

  useEffect(() => {
    if (filter === "") {
      setFilteredUsers(allUsers); // No filter applied
    } else {
      // Apply filter
      const filtered = allUsers.filter((user) => user.looking === filter);
      setFilteredUsers(filtered);
    }
  }, [filter, allUsers]); // Depend on filter and allUsers
  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-screen-2xl w-screen">
      <form className=" max-w-xs mx-auto flex gap-4 px-6 items-center justify-center mt-[5rem]">
        <label htmlFor="filterOptions" className="font-bold">
          Filter
        </label>
        <select
          id="filterOptions"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mentorlink-blue focus:border-mentorlink-blue block w-full p-2.5"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="mentor">Looking for a mentor</option>
          <option value="mentee">Looking for a mentee</option>
          <option value="not looking">Not looking</option>
        </select>
      </form>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.user_id}>
            <InfoCard user={user} />
          </li> // Fixed: Use parentheses to immediately return the `InfoCard`
        ))}
      </ul>
    </div>
  );
};

export default Feed;
