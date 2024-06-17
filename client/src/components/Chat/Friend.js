import { useState, useEffect } from "react";
import { TextField, Box, Typography, Avatar } from "@mui/material";
import "./Friend.css";
import friend from "../../assets/addFriend.png";
import Pop from "./popup/Pop";
import { useDispatch } from "react-redux";
import { get } from "../../redux/Slices/ActivateFriend";

const Friend = () => {
  const dispatch = useDispatch();
  const [addFriend, setAddFriend] = useState(false);
  const [friendDetails, setFriendDetails] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedFriendDetails = localStorage.getItem("friendDetails");
    if (savedFriendDetails) {
      setFriendDetails(JSON.parse(savedFriendDetails));
    }
  }, []);

  const togglePopup = () => {
    setAddFriend(!addFriend);
  };
  const selectFriend=()=>{
    dispatch(get(friend));
    
  }
  const handleFriendDetails = (details) => {
    setFriendDetails(details);
    togglePopup();
  };

//   const deleteFriendDetails = (index) => {
//     const updatedFriendDetails = friendDetails.filter((_, i) => i !== index);
//     setFriendDetails(updatedFriendDetails);
//     localStorage.setItem("friendDetails", JSON.stringify(updatedFriendDetails));
//   };

  const filteredFriends = friendDetails.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase()) ||
    friend.phone.includes(search)
  );
  
  return (
    <>
      <div className="Friend-input-container">
          <div className="input">
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"        
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        <div className="add-a-friend" onClick={togglePopup}>
          <img src={friend} alt="" />
        </div>
      </div>
      {addFriend && <Pop togglePopup={togglePopup} setFriendDetails={handleFriendDetails} />}
      {filteredFriends.length > 0 ? (
        <Box sx={{ mt: 2, textAlign: "center", color: "black" }}>
          {filteredFriends.map((friend, index) => (
            <div key={index} className="friends" onClick={selectFriend}>
              <Avatar src={friend.image} />
              <div>
                <Typography variant="body1" color={"white"}>{friend.name}</Typography>
                <Typography variant="caption" color={"white"}>Typing...</Typography>
              </div>
              {/* <Button
                variant="contained"
                sx={{ backgroundColor: "#ff6f61", color: "#fff", width: "auto", "&:hover": { backgroundColor: "#ff4f3f" } }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering selectFriend on button click
                  deleteFriendDetails(index);
                }}
              >
                Delete
              </Button> */}
            </div>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No results found</Typography>
      )}
    </>
  );
};

export default Friend;
