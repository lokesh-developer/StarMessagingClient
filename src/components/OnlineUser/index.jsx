import { useContext, useEffect, useState } from "react";
import { useColorModeValue, Text } from "@chakra-ui/react";
import { SocketContext } from "../../context/SocketContextProvider";

export const OnlineUser = ({ friendId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [onlineUser, setOnlineUser] = useState([]);
  const [friendOnline, setFriendOnline] = useState(false);
  const lastseen = useColorModeValue("gray.600", "gray.500");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket?.on("setOnlineUsers", (users) => {
      setOnlineUser(users);
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("addOnlineUsers", user._id);
  }, [user._id, socket]);

  useEffect(() => {
    const onlineFriends = onlineUser.map((o) => o.userId);
    const onlineUsers = onlineFriends.filter((of) => of !== user._id);
    setFriendOnline(onlineUsers.includes(friendId));
  }, [onlineUser, friendId, user._id]);

  return (
    <>
      {friendOnline ? (
        <Text color="telegram.600">Online</Text>
      ) : (
        <Text color={lastseen}>Offline</Text>
      )}
    </>
  );
};
