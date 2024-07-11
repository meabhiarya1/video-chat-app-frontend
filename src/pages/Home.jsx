import React, { useEffect, useState, useCallback } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { socket } = useSocket();
  const [emailID, setEmailID] = useState();
  const [roomID, setRoomID] = useState();

  const navigate = useNavigate();

  const handleRoomJoined = useCallback(
    ({ roomID }) => {
      navigate(`/room/${roomID}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [handleRoomJoined, socket]);

  const handleRoomJoin = () => {
    socket.emit("join-room", { emailID, roomID });
  };

  return (
    <>
      <h2 className="text-white text-5xl font-medium m-4 p-4">
        Try video call...
      </h2>
      <div>
        <input
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          placeholder="Enter your email here..."
          className="p-2 m-2 rounded-lg"
        />
        <input
          type="text1"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          placeholder="Enter Room ID..."
          className="p-2 m-2 rounded-lg"
        />
        <button type="submit" className="m-2" onClick={handleRoomJoin}>
          Enter Room
        </button>
      </div>
    </>
  );
};

export default Home;
