import React, { useEffect, useState } from "react";
import { Sidebar} from ".";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const Main = () => {
  const navigate = useNavigate();

  const [conversation, setConversation] = useState([]);

  const [user, setUser] = useState("");

  useEffect(() => {
    
    const data = localStorage.getItem("userData");
    console.log(JSON.parse(data));
    setUser(JSON.parse(data));
    if (!data) {
      navigate("/");
    }else{
      setUser(JSON.parse(data));
    }

  }, []);

  useEffect(() => {
    if(user){
      const getConversation = async () => {
        try {
          const response = await axios.get(
            "/conversations/"+user.data.id);
            setConversation(response.data);
            console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getConversation();
    }

  }, [user]);

  if(conversation){
    return (
      <div className="Main">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar conversation={conversation} currentUser={user}/>
        <Outlet />
      </div>
    );
  }else{
    return <h1>Please sign up.</h1>;
  }
 
};

export default Main;
