import React, { useEffect, useState } from "react";
import { Flex, Text, useColorModeValue, Divider } from "@chakra-ui/react";
import axios from "axios";
import loadable from "@loadable/component";
import { Friend } from "./Friend";

export const FriendsList = () => {
  const Loader = loadable(() =>
    import("../../Loader").then((mod) => mod.Loader)
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const text = useColorModeValue("gray.600", "gray.300");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/conversations/` + user?._id
        );
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
            friends.map((f) => <Friend key={f._id} conversation={f} />)
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
