import React from "react";
import "./Styles.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import {ConversationItems } from ".";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slice/theme";




const Sidebar = ({ conversation, currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lightTheme = useSelector((e) => e.themeKey);


  return (
    <div className={"sidebar" + (lightTheme ? "" : " sidebar-dark")}>
      <div className={"sb-header" + (lightTheme ? "" : " header-dark")}>
        <div>
          <IconButton
            onClick={() => {
              navigate("/home");
            }}
          >
            <HomeIcon style={{ color: "white" }} />
          </IconButton>
        </div>

        <div>
          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {!lightTheme ? (
              <LightModeIcon style={{ color: "white" }} />
            ) : (
              <DarkModeIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
      </div>

      <div className={"sb-search" + (lightTheme ? "" : " search-dark")}>
        <IconButton>
          {!lightTheme ? (
            <SearchIcon style={{ color: "white" }} />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
        <input
          className={lightTheme ? "sb-search-input" : "search-input-dark"}
          type="text"
          placeholder={"Search from your ongoing chat"}
        />
      </div>

      <div className="sb-conversation">
        {conversation?.map((item, index) => (
          <ConversationItems
            conversation={item}
            currentUser={currentUser}
            key={index}
            name={"Ajeet"}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
