import { useState } from "react";
import "./Pop.css";
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Pop = ({ togglePopup, setFriendDetails }) => {
  const [friendNumber, setFriendNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const searchHandler = async () => {
    if (friendNumber.length < 10) {
      return toast.error("Phone number must be at least 10 digits.");
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/searchFriend/search", { friendNumber });
      const result = response.data;
      console.log(result);
      const newFriendDetails = {
        name: result.FriendDetails.name,
        phone: result.FriendDetails.phone,
        id: result.FriendDetails.id,
        image:result.FriendDetails.image
      };
      
      let friendDetailsArray = JSON.parse(localStorage.getItem("friendDetails")) || [];
      friendDetailsArray.push(newFriendDetails);
      localStorage.setItem("friendDetails", JSON.stringify(friendDetailsArray));
      setFriendDetails(friendDetailsArray);  // Pass details back to the Friend component
      toast.success("User found successfully!");
    } catch (error) {
          console.log(error);
      toast.error(error.response.data.message || "An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pop-up">
      <Typography variant="h5" className="pop-header">
        Enter the number you want to add
      </Typography>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          id="number-input"
          label="Enter the phone number of your friend"
          type="number"
          variant="outlined"
          className="input-pop"
          sx={{ mb: 2 }}
          value={friendNumber}
          onChange={(e) => setFriendNumber(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 1, flex: 1 }}
            onClick={searchHandler}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
          <Button
            variant="contained"
            onClick={togglePopup}
            sx={{ ml: 1, flex: 1 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Pop;
