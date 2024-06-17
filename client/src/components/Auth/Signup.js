import "./Signup.css";
import { useState, useEffect } from "react";
import { Stack, Avatar, IconButton, Button, TextField } from "@mui/material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = ({ toggleAuth }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { register, handleSubmit, setError, formState: { errors } } = useForm(); // Destructure setError and errors from useForm

  // Load the image from local storage when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("selectedImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  // Save the image to local storage when it changes
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setSelectedImage(imageSrc);
        localStorage.setItem("Image", imageSrc); // Save to local storage
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Handle form submission
  const saveUser = async (data) => {
    // Validate phone number
    const phoneNumber = data.phone;
    if (!/^\d+$/.test(phoneNumber)) {
      setError("phone", {
        type: "manual",
        message: "Please enter a valid phone number (digits only)",
      });
      return;
    }
    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password should be at least 8 characters long",
      });
      return;
    }
    // console.log(data);
    try {
      const Image = localStorage.getItem("Image");
      data.image = Image;
      console.log(data);
      const postData = await axios.post("http://localhost:4000/auth/signup", data);
      const result = postData.data;
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      toast.success("Signup successful!");
      navigate("/chat");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log(error);
      return error
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(saveUser)}>
      <div className="form-container">
        <h1 className="signup-heading">Signup</h1>
        <Stack position={"relative"} spacing={0} width="3rem">
          <Avatar
            src={selectedImage}
            sx={{ height: "4rem", width: "4rem", objectFit: "cover" }}
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
        <p className="Details-heading">Please Enter your Details</p>
        <div className="inputs-tags">
          <TextField
            id="name"
            label="Enter your name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            id="phone"
            label="Enter your phone number"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid phone number (digits only)",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
          <TextField
            id="password"
            label="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </div>

        <div>
          <Button type="submit" variant="outlined">Signup</Button>
        </div>

        <div className="flex justify-center">
          <p>
            Already have an account?{" "}
            <span className="Login" onClick={toggleAuth}>Login</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
