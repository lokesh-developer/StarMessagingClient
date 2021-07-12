import React, { useEffect, useState } from "react";
import { Flex, Text, useColorModeValue, Divider } from "@chakra-ui/react";
import axios from "axios";
import { Loader } from "../../Loader";
import { Friend } from "./Friend";

export const FriendsList = ({ onlineUsers }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const text = useColorModeValue("gray.600", "gray.300");
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/conversations/" + user?._id);
        localStorage.setItem("friends", JSON.stringify(res.data));
        setFriends(res.data);
        setLoading(true);
      } catch (error) {
        const offlineFriends = JSON.parse(localStorage.getItem("friends"));
        setFriends(offlineFriends);
      }
    };
    getFriends();
  }, [user?._id]);

  useEffect(() => {
    const onlineFriends = onlineUsers.map((o) => o.userId);
    const onlineUser = onlineFriends.filter((of) => of !== user._id);
    const friendsList = friends.map((e) => e.members);
    // .find((friend) => friend !== user._id)
    // console.log(friendsList.map((e) => e));
    // onlineUser.find((o) => o === friendsList.map((e) => e)),
    const onlineFriendd = [];

    for (let index = 0; index < friendsList.length; index++) {
      const allFriend = friendsList[index];
      const RemovedMe = allFriend.find((member) => member !== user._id);
      const onlineFriend = onlineUser.find((e) => e === RemovedMe);
      if (onlineFriend !== undefined) {
        onlineFriendd.push(onlineFriend);
        setOnlineFriends(onlineFriendd);
      }
    }
  }, [friends, onlineUsers, user._id]);

  const myFriends = friends
    .map((f) => f.members.find((member) => member !== user._id))
  console.log(myFriends);
  return (
    <>
      {loading ? (
        <>
          <Flex p={4} flexDir="column">
            <Text color={text} as="b">
              Your Friends
            </Text>
          </Flex>
          <Divider orientation="horizontal" />
          {friends.length !== 0 ? (
            friends.map((f) => (
              <Friend key={f._id} conversation={f} onlineFriend={} />
            ))
          ) : (
            <Flex p={4} alignItems="center" justifyContent="center">
              <Text color={text} as="b">
                No Conversations found...
              </Text>
            </Flex>
          )}
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};
