import React, { useEffect, useState } from "react";
import "./Setting.css";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Stack, Avatar, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = ({ visible, toggleSidebar }) => {
  const navigate=useNavigate();
  const [userName, setuserName] = useState("");
  const [phone, Setphone] = useState("");
  const [userPicture, setUserPicture] = useState(null);
  
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      console.log(event.target.files[0]);
      console.log(((event.target.files[0].size)/1024)/1024);
      reader.onload = async(e) => {
        const imageSrc = e.target.result;
        // console.log(e.target);
        setUserPicture(imageSrc);
        localStorage.setItem("selectedImage", imageSrc); // Save to local storage
        updatePicture(imageSrc)
        };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const updatePicture=async(imageSrc)=>{
              try {
                    const token=localStorage.getItem("refreshToken")
                    const updataPicture=await axios.post("http://localhost:4000/auth/update-picture",{imageSrc},{
                              headers: {
                                        Authorization: `Bearer ${token}`, // Assuming a Bearer token
                                        "Content-Type": "application/json",
                              },
                    });
                    console.log(updataPicture.data);
              } catch (error) {
                    console.log(error);
                     toast.error(error.response.data.message || "An error occurred while searching.");
              }
  }
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    const savedImage = localStorage.getItem("selectedImage");
    if (savedImage) {
      setUserPicture(savedImage);
    }
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setuserName(decodedToken.username);
        Setphone(decodedToken.phone);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, []);
  const logoutHandler=()=>{
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken");
          navigate("/auth");
  }
  return (
    <div className={`sidebar ${visible ? "visible" : ""}`}>
      <div className="sidebar-container">
        <div className="profile-picture-name">
          <div className="picture">
            <div className="close-icon">
              <CloseIcon onClick={toggleSidebar} className="close-" />
            </div>
            <Stack position={"relative"} spacing={0} width="auto">
              <Avatar
                src={userPicture}
                sx={{ height: "4.25rem", width: "4.25rem", objectFit: "cover" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  left: "50px",
                  top: "40px",
                  color: "black",
                }}
                component="label"
              >
                <CameraAlt />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Stack>
          </div>
          <div>
          <TextField
          disabled
          id="outlined-disabled"
          label="User-Name"
          value={userName}
          margin="normal"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Phone Number"
          value={`+91 ${phone}`}
          margin="normal"
        />
          </div>
        <Button variant="contained" href="#contained-buttons" color="secondary" onClick={logoutHandler}>
        LogOut 
      </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
