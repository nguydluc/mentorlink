import { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import Feed from "./Feed";
import Def from "./Def";

const Body = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? (
    <main className="py-6 max-w-screen-xl">
      <Feed />
    </main>
  ) : (
    <main className="py-6 max-w-screen-xl">
      <Def />
    </main>
  );
};

export default Body;
