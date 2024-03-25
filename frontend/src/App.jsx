import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Message from "./components/Message";
import MessageDetail from "./components/MessageDetail";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/:id" element={<Profile />} />
          <Route path="/:id/edit" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inbox" element={<Message />} />
          <Route path="/inbox/:id" element={<MessageDetail />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
