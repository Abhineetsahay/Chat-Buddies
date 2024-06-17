import { Stack, TextField, Box, Paper, Avatar, Typography, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useEffect, useRef } from "react";
import "./MessageBox.css";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from '../utils/Loader';

const socket = io("http://localhost:4000");

const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverImage, setReceiverImage] = useState("https://via.placeholder.com/150");
  const [userImage, setUserImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
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
        setSender(decodedToken.username);
        setUserImage(image);
      } catch (error) {
        toast.error("Error while decoding token");
      }
    }
  }, []);

  useEffect(() => {
    const currentFriend = localStorage.getItem("currentFriend");
    if (currentFriend) {
      const parsedFriend = JSON.parse(currentFriend);
      if (parsedFriend) {
        setReceiver(parsedFriend.name);
        if (parsedFriend.image) {
          setReceiverImage(parsedFriend.image);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!sender || !receiver) {
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/chatHistory/chats`, {
          params: { sender, receiver }
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [sender, receiver]);

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

  return (
    <div className="message-box">
      <Box className={messages.length !== 0 ? "messages" : "chatheading"} component={Paper} elevation={3}>
        {messages.length !== 0 ? messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === sender ? 'user' : 'friend'}`}>
            <Avatar src={message.sender === sender ? userImage : receiverImage} />
            <div className="message-content">
              <Typography variant="body2">{message.message}</Typography>
              <Typography variant="caption">{new Date(message.timestamp).toLocaleTimeString()}</Typography>
              <Typography variant="caption">{" "}{message.sender}</Typography>
            </div>
          </div>
        )) : (
          <Typography variant="h3" color="white">Start chatting Now</Typography>
        )}
        {isTyping && (
          <Loader />
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} className="message-input" padding="0.75rem" bgcolor="#1c1c1c">
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
            )
          }}
        />
        <IconButton>
          <AttachFileIcon style={{ color: "white" }} />
        </IconButton>
      </Stack>
    </div>
  );
};

export default MessageBox;
