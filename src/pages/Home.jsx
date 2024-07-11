import React from "react";
import { useSocket } from "../providers/Socket";

const Home = () => {
  const { socket } = useSocket();
  socket.emit("join-room", { roomID: "1", emailID: "abhi@gmail.com" });
  return (
    <>
      <h2 className="text-white text-5xl font-medium m-4 p-4">
        Try video call...
      </h2>
      <div>
        <input
          type="email"
          placeholder="Enter your email here..."
          className="p-2 m-2 rounded-lg"
        />
        <input
          type="text1"
          placeholder="Enter Room ID..."
          className="p-2 m-2 rounded-lg"
        />
        <button type="submit" className="m-2">
          Enter Room
        </button>
      </div>
    </>
  );
};

export default Home;
