import React from "react";
import "./Home.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Customer } from "../components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProgressChart from "../components/Home/ProgressChart";

const Home = () => {
  const [fontSize, setFontSize] = useState(16); // Initial font size

  const [users, setUsers] = useState(null);

  const [customers, setCustomers] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [originalCustomer, setOriginalCustomer] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isHome, setIsHome] = useState(true);

  const [count, setCount] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the search query
    if (query.trim() === "") {
      // Clear the search query and show all items
      setCustomers(originalCustomer); // Simulate re-fetching data from the API
    } else {
      // Perform filtering
      if (customers) {
        const filteredItems = customers.filter((customer) =>
          customer.name.toLowerCase().includes(query.toLowerCase())
        );
        setCustomers(filteredItems);
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      // You can adjust the logic here based on your responsive requirements
      const newFontSize = window.innerWidth < 768 ? 12 : 16; // Example logic
      setFontSize(newFontSize);
    }

    window.addEventListener("resize", handleResize);

    // Initial font size calculation
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const baseURL = "/user";
    const userId = "650b4c4a02cd9f1002211628";
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
        setUsers(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  }, []);

  const logOut = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    console.log("Hello");
  };

  const goToChat = () => {
    navigate("/main/welcome");
  };

  useEffect(() => {
    const getCustomer = async () => {
      const nonAgentUsers = await users?.filter(
        (user) => user.isAgent === false
      );
      setOriginalCustomer(nonAgentUsers);
      setCustomers(nonAgentUsers);
    };
    getCustomer();

    const getCurrentUser = async () => {
      const data = await localStorage.getItem("userData");
      console.log(JSON.parse(data));
      setCurrentUser(JSON.parse(data));
    };
    getCurrentUser();
  }, [users]);

  useEffect(() => {
    const getCount = async () => {
      const statusCounts = await customers?.reduce((counts, obj) => {
        const status = obj.status;
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      }, {});

      if (statusCounts) {
        // Convert statusCounts into an array with counts at specific indices
        const statusArray = [
          statusCounts["new"] || 0, // Index 0 for 'new'
          statusCounts["progress"] || 0, // Index 1 for 'progress'
          statusCounts["completed"] || 0, // Index 2 for 'completed'
        ];

        setCount(statusArray);
      }
    };
    getCount();
  }, [customers]);

  const [user, setUser] = useState("");

  if (currentUser) {
    return (
      <div className="home">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="home-header">
          <div className="header-title">
            <div className="title" style={{ fontSize: `${fontSize}px` }}>
              Branch International
              <div className="verticleLine"></div>
              <h5>Customer Management</h5>
            </div>
            <IconButton onClick={logOut}>
              <LogoutIcon style={{ color: "white" }} />
            </IconButton>
          </div>
          <div className="sub-header">
            <div className="sub-header-button">
              <div
                onClick={() => {
                  setIsHome(!isHome);
                }}
                className={`home-btn ${isHome ? "text-underline" : "n"}`}
              >
                HOME
              </div>
              <div className="chat-btn" onClick={goToChat}>
                YOUR CHAT
              </div>
              <div
                className={`report-btn ${isHome ? "" : "text-underline"}`}
                onClick={() => {
                  setIsHome(!isHome);
                }}
              >
                ALL REPORTS
              </div>
            </div>
          </div>
        </div>

        {isHome ? (
          <div className="customer-container">
            <div className="search-container">
              <IconButton>
                <SearchIcon />
              </IconButton>
              <input
                className="customer-search"
                type="text"
                placeholder="Type to search"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="customers">
              {customers?.map((customer, index) => (
                <Customer
                  key={index}
                  name={customer.name}
                  status={customer.status}
                  messages={customer.messages}
                  customerId={customer._id}
                  currentUserId={currentUser.data.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="report-container">
            {count.length > 0 ? (
              <ProgressChart count={count} />
            ) : (
              <h1>Loading</h1>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Home;
