import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContextProvider";

export const IsOnline = (userId) => {
  const socket = useContext(SocketContext);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socket.on("setOnlineUsers", (users) => {
      setIsOnline(users.map((of) => of.userId).includes(userId));
    });
  }, [socket, userId]);

  return isOnline;
};
