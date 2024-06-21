import { useState, useEffect, useCallback } from "react";
import { TextField, Box, Typography, Avatar } from "@mui/material";
import "./Friend.css";
import friend from "../../assets/addFriend.png";
import Pop from "./popup/Pop";
import { useDispatch } from "react-redux";
import { get } from "../../redux/Slices/ActivateFriend";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const Friend = () => {
  const dispatch = useDispatch();
  const [addFriend, setAddFriend] = useState(false);
  const [friendDetails, setFriendDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [latestChat, setLatestChat] = useState([]);

  const receiver = localStorage.getItem("receiver");
  const sender = localStorage.getItem("sender");
  const currentFriend = JSON.parse(localStorage.getItem("currentFriend"));
  const receiverPhone = localStorage.getItem("receiverPhone");
 let  typingTimeout;


  const handleTyping = useCallback((data) => {
    if (data.sender === receiver && Number(receiverPhone) === Number(currentFriend.phone)) {
      setIsTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  }, [receiver, receiverPhone, currentFriend]);

  useEffect(() => {
    if (!receiver || !sender) {
      console.log("Receiver or sender not set");
    }

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [receiver, sender, handleTyping]);

  const togglePopup = () => {
    setAddFriend(!addFriend);
  };

  const selectFriend = (friend) => {
    dispatch(get(friend));
    window.location.reload();
  };

  const handleFriendDetails = (details) => {
    setFriendDetails(details);
    togglePopup();
  };
 
  
  const fetchFriends = async () => {
    const token = localStorage.getItem("refreshToken");
    try {
      const response = await axios.get("http://localhost:4000/searchFriend/get-friend", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const friends = response.data.contacts;
      const friendChats = friends.map(friend => friend.chats);
      setFriendDetails(friends);
      const lastMessages = friendChats.map(chats => chats[chats.length - 1]?.message || "No messages");
      setLatestChat(lastMessages);
      // window.location.reload();
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  const filteredFriends = friendDetails.filter(friend => 
    friend.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <>
      <div className="Friend-input-container">
        <div className="input">
          <TextField
            id="standard-search"
            label="Search Friend by Name"
            type="search"
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="add-a-friend" onClick={togglePopup}>
          <img src={friend} alt="Add Friend" />
        </div>
      </div>
      {addFriend && <Pop togglePopup={togglePopup} setFriendDetails={handleFriendDetails} />}
      {filteredFriends.length > 0 ? (
        <Box sx={{ mt: 2, textAlign: "center", color: "black" }}>
          {filteredFriends.map((friend, index) => (
            <div key={index} className="friends" onClick={() => selectFriend(friend)}>
              <Avatar src={friend.image} />
              <div>
                <Typography variant="body1" color="white">{friend.name}</Typography>
                {isTyping && Number(friend.phone) === Number(currentFriend.phone) ? (
                  <Typography variant="caption" color="white">Typing...</Typography>
                ) : (
                  <Typography variant="caption" color="white">{latestChat[index].split(' ').slice(0, 7).join(' ')+'...'}</Typography>
                )}
              </div>
            </div>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No Contact found</Typography>
      )}
    </>
  );
};

export default Friend;
