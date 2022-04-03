import "./chats.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UserCard from "../../components/userCard/UserCard";

export default function Chats() {
  const [family, setFamily] = useState([]);
  let { user: auth } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/api/v1/users/family/${auth._id}`);
      setFamily(res.data);
    };
    fetchPosts();
  }, [auth._id]);
  return (
    <>
      <Topbar />
      <div className="chatsContainer">
        <Sidebar />
        <div className="chats">
          <div className="chatsHeader">
            <p className="mb-1">Get in Touch </p>
            <p> Start Chat Your Friends</p>
          </div>
          <div className="users">
            {family.length > 0 &&
              family.map((u) => <UserCard key={u.id} user={u} />)}
          </div>
        </div>
      </div>
    </>
  );
}