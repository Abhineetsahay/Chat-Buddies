import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Avatar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageBox from "./MessageBox";
import FriendAccount from "./popup/FrientAccount";
import { io } from "socket.io-client";
import "./MessageHeader.css";

const socket = io("http://localhost:4000");

const MessageHeader = () => {
  const { currentFriend } = useSelector((state) => state.friendData);
  const [chatWith, setChatWith] = useState(null);
  const [status, setStatus] = useState("online");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [showFriendDetails, setShowFriendDetails] = useState(false);

  useEffect(() => {
    if (currentFriend) {
      localStorage.setItem("currentFriend", JSON.stringify(currentFriend));
    }
    const savedFriend = localStorage.getItem("currentFriend");
    if (savedFriend) {
      setChatWith(JSON.parse(savedFriend));
    }
  }, [currentFriend]);

  useEffect(() => {
    const statusHandler = () => {
      if (document.visibilityState === "visible") {
        socket.emit("status", "online");
      } else {
        socket.emit("status", "offline");
      }
    };
    socket.on("status", (data) => {
      setStatus(data.status);
    });

    document.addEventListener("visibilitychange", statusHandler);

    return () => {
      document.removeEventListener("visibilitychange", statusHandler);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleFriendDetails = () => {
    setShowFriendDetails(true);
    handleMenuClose();
  };

  const handleDeleteAccount = () => {
    // Handle deleting account here
    handleMenuClose();
  };

  return (
    <div className="chat-with-friend">
      {chatWith && (
        <nav className="chat-header">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ padding: "0.75rem" }}>
            <Avatar
              src={chatWith.image}
              sx={{ height: "4.25rem", width: "4.25rem", objectFit: "cover" }}
            />
            <div className="friend-info">
              <Typography color={"white"}>{chatWith.name}</Typography>
              <Typography variant="body2" color={"lightgray"} className={status === "offline" ? "offlineStatus" : "onlineStatus"}>
                {status}
              </Typography>
            </div>
            <div className="chat-actions">
              <IconButton aria-label="more options" onClick={handleMenuOpen}>
                <MoreVertIcon sx={{ color: "white" }} />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleFriendDetails}>Friend ACCOUNT details</MenuItem>
                <MenuItem onClick={handleDeleteAccount}>Delete account</MenuItem>
                <MenuItem>Close chat</MenuItem>
              </Menu>
            </div>
          </Stack>
          <FriendAccount 
            friend={chatWith} 
            open={showFriendDetails} 
            onClose={() => setShowFriendDetails(false)} 
          />
        </nav>
      )}
      <MessageBox />
    </div>
  );
};

export default MessageHeader;
