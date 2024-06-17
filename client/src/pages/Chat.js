import "./Chat.css"
import Header from "../components/Chat/Header";
import MessageHeader from "../components/Chat/MessageHeader";
// import { useState } from "react";
// import { useEffect,useState } from "react";

const Chat=()=>{
  // const [showMessageBox,setMessageBox]=useState(false);       
  // useEffect(()=>{
  //      const currentFriend=localStorage.getItem("currentFriend");
  //      if (currentFriend) {
  //         setMessageBox(true);
  //         }
  //         else{
  //           setMessageBox(false);
  //           }
  //           },[showMessageBox])   
  //         console.log(showMessageBox);
          return (
                   <>
                   <div className="Header-Message">
                     <Header/>
                     <MessageHeader/>
                     {/* {showMessageBox?<MessageHeader/>:(<h1>Start Chatting With Your Friends</h1>)} */}
                     </div>
                   </>
          )
}
export default Chat;