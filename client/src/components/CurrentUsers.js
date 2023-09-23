import React, { useEffect, useState} from "react";
import "./Styles.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { MessageOther as Message, User } from ".";
import { IconButton } from "@mui/material";
import axios from "axios";

const CurrentUsers = () => {

  const [users, setUsers] = useState(null)
  useEffect(() => {
    const baseURL = "/user";
    const userId = '650b4c4a02cd9f1002211628'; 
    const queryParams = {
      userId: userId,
    };
    const config = {
      baseURL: baseURL,
      params: queryParams,
    };

    axios
      .get("/fetchusers", config)
      .then((response) => {
        // Handle the successful response here
        // console.log("Data:", response.data);
        // setUsers(response.data)
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  }, []);


  return (
    <div className="currentUser-container">
      <div className="currentUser-header">
        <div className="currentUser-header-profile">
          <div className="currentUser-header-name">Online Users</div>
        </div>

        <div>
          <IconButton>
            <AddTaskIcon />
          </IconButton>
        </div>
      </div>

      <div className="currentUser-messages">
        <div className="currentUser-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search" />
        </div>
        {users?.map((user, index) => (
          <User
            index={index}
            key={index}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentUsers;
