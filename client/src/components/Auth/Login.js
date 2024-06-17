import "./Login.css";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleAuth }) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Use the hook to navigate

  const saveUser = async (data) => {
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
    try {
      const response = await axios.post("http://localhost:4000/auth/login", data);
      const result = response.data;
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      toast.success("Login successful");
      navigate("/chat"); // Navigate to the chat page
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(saveUser)}>
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <div className="inputs-tags">
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </div>

        <div>
          <Button type="submit" variant="outlined">Login</Button>
        </div>

        <div className="">
          <p>
            Didn't have an account?{" "}
            <span className="signup" onClick={toggleAuth}>Signup</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
