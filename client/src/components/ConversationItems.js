import "./Styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment";

const ConversationItems = ({ conversation, currentUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(conversation);

    const _id = conversation?.members.find((m) => m !== currentUser.data.id);

    const baseURL = "/user";

    const queryParams = {
      userId: _id,
    };
    const config = {
      baseURL: baseURL,
      params: queryParams,
    };

    if (conversation) {
      const getUser = async () => {
        try {
          const response = await axios.get(
            "/fetchoneuser",
            config
          );
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [conversation]);


  if (user) {
    return (
      <div
        onClick={() => {
          const data = {
            currentConversation: conversation,
            currentUserId: currentUser.data.id,
          };
          navigate("chat", { state: data });
        }}
        className="chat-item"
      >
        <div className="profile-picture">
          <div className="picture">
          <AccountCircleIcon />
          </div>
        </div>
        <div className="chat-details">
          <div className="name">{user.name}</div>

           <div className="recent-message">
            {moment(user?.messages[0]["timestamp (utc)"]).format("LLL")}{" "}
          </div> 
        </div>
        <div className="time">{user.isAgent}</div>
      </div>
    );
  }
};

export default ConversationItems;
