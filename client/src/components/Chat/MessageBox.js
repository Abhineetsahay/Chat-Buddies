import "./MessageBox.css";
import {
  Stack,
  TextField,
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useState, useEffect, useRef } from "react";
import {jwtDecode} from "jwt-decode";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../utils/Loader";

const socket = io("http://localhost:4000");

const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverImage, setReceiverImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [userImage, setUserImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredMessageIndex, setHoveredMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const [seeEmoji, setSeeEmoji] = useState(false);
  let typingTimeout;

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("typing", (data) => {
      if (data.sender === receiver) {
        setIsTyping(true);
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, [receiver]);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    const image = localStorage.getItem("selectedImage");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("sender", decodedToken.username);
        setSender(decodedToken.username);
        setUserImage(image);
      } catch (error) {
        toast.error("Error while decoding token");
      }
    }
  }, []);

  useEffect(() => {
    const currentFriend = localStorage.getItem("currentFriend");
    const parsedFriend = JSON.parse(currentFriend);
    if (currentFriend && parsedFriend) {
      localStorage.setItem("receiver", parsedFriend.name);
      localStorage.setItem("receiverPhone", parsedFriend.phone);
      setReceiver(parsedFriend.name);
      if (parsedFriend.image) {
        setReceiverImage(parsedFriend.image);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = () => {
    socket.emit("typing", { sender, receiver });
  };

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      message: inputValue,
      sender: sender,
      receiver: receiver,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", newMessage);
    setInputValue("");
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    } else {
      handleTyping();
    }
  };

  const handleMouseOver = (index) => {
    setHoveredMessageIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredMessageIndex(null);
  };

  const toggleEmojiPicker = () => {
    setSeeEmoji(!seeEmoji);
  };

  const addEmoji = (e) => {
    const symbol = e.native;
    setInputValue(inputValue + symbol);
  };

  const deleteChat = async (message) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/DeleteChatAccount/chats/${sender}/${receiver}/${message._id}/${message.timestamp}/${message.message}`
      );
      toast.success(response.data.message);
      setMessages(messages.filter((msg) => msg._id !== message._id));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const fetchChatHistory = async () => {
    if (!sender || !receiver) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/chatHistory/chats`,
        {
          params: { sender, receiver },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [sender, receiver,deleteChat]);

  return (
    <div className="message-box">
      <Box
        className={messages.length !== 0 ? "messages" : "chatheading"}
        component={Paper}
        elevation={3}
      >
        {messages.length !== 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === sender ? "user" : "friend"
              }`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              {hoveredMessageIndex === index && message.sender === sender && (
                <DeleteIcon
                  className="DeleteIcon"
                  onClick={() => deleteChat(message)}
                />
              )}
              <Avatar
                src={message.sender === sender ? userImage : receiverImage}
              />
              <div className="message-content">
                <Typography variant="body2">{message.message}</Typography>
                <Typography variant="caption">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
                <Typography variant="caption"> {message.sender}</Typography>
              </div>
              {isTyping && <Loader />}
            </div>
          ))
        ) : (
          <Typography variant="h3" color="white">
            Start chatting Now
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        className="message-input"
        padding="0.75rem"
        bgcolor="#1c1c1c"
      >
        <TextField
          id="message-input"
          placeholder="Type a message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            style: { color: "white" },
            endAdornment: (
              <IconButton onClick={sendMessage}>
                <SendIcon style={{ color: "white" }} />
              </IconButton>
            ),
          }}
        />
        <IconButton className="emoji-part" onClick={toggleEmojiPicker}>
          <SentimentSatisfiedAltIcon style={{ color: "white" }} />
        </IconButton>
      </Stack>
      {seeEmoji && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
