import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "./Customer.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Customer = ({ name, status, messages, customerId, currentUserId }) => {
  const lastMessage = messages[0]["message body"];
  const time = messages[0]["timestamp (utc)"];
  const [conversation, setConversation] = useState(null);



  let className = 'status';

  if (status==="progress") {
    className += ' progress';
  } else if(status==="complete") {
    className += ' complete';
  }

  const navigate = useNavigate();

  //   useEffect(() => {
  //       console.log(messages);
  //   }, []);

  const handleSendButtonClick = async (message, currentChatId) => {
    // Create a message object
    console.log("handleSendButtonClick Clicked " + currentChatId);
    const newMessage = {
      sender: customerId,
      text: message["message body"],
      conversationId: currentChatId,
      timestamp: message["timestamp (utc)"],
    };

    try {
      // Send the message to your server
      console.log("Entering in try catch bloc");
      const response = await axios.post(
        "/messages/",
        newMessage
      );
      console.log(response.data);
      //   setMessages([...messages, response.data]);
      //   setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const createMessages = async (currentChatId) => {
    messages.forEach((message) => {
      handleSendButtonClick(message, currentChatId);
    });
    const data = {
      currentConversation: conversation,
      currentUserId: currentUserId,
    };
    navigate("/main/chat", { state: data });
  };

  // update the user status

  const updateUserStatus = async (newStatus) => {
    const userId = customerId;
    try {
      const response = await axios.patch(
        "/user/update/" + userId,
        {
          status: newStatus,
        }
      );
      return response.data; // This will contain the updated user object
      console.log(response.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error;
    }
  };

  //
  const handleClick = async () => {
    if (status !== "new") {
      toast("Issue is Already picked up");
    } else {
      try {
        const response = await axios.post(
          "/conversations/",
          {
            senderId: customerId,
            receiverId: currentUserId,
          }
        );
        // setcurrentChatId(response.data._id);
        setConversation(response.data);
        createMessages(response.data._id);
        const newStatus = "progress";
        updateUserStatus(newStatus);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="customer-bar"
    >
      <div className="status-date">
        <div className={className}>{status.toUpperCase()}</div>

        <div className="date">{moment(time).format("MMM Do YY")}</div>
      </div>

      <div className="id-message">
        {/* <div className="customer-id">{`USER ID ${name}`}</div> */}
        <div className="customer-id">{`USER ID ${name}`}</div>

        <div className="customer-message">{lastMessage}</div>
      </div>

      <div className="pick-agent">
        {status === "new" ? "Not Picked" : "Picked"}
      </div>
    </div>
  );
};

export default Customer;
