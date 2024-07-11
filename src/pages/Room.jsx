import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();

  const [myStream, setMyStream] = useState(null);

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailID } = data;
      console.log("New user joined room", emailID);
      const offer = await createOffer();
      socket.emit("call-user", { emailID, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incoming Call from", from, offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailID: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("Call got accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.on("call-accepted", handleCallAccepted);
    };
  }, [handleIncomingCall, handleCallAccepted, handleNewUserJoined, socket]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  return (
    <div>
      <h1>RoomPage</h1>
      <ReactPlayer url={myStream} playing />
    </div>
  );
};

export default Room;
