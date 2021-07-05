import {
  Box,
  Avatar,
  useColorModeValue,
  Flex,
  Text,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const UserProfile = () => {
  const getUser = useParams();
  const [user, setUser] = useState();
  const bg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const getFriendDetails = async () => {
      try {
        const res = await axios("/users?userId=" + getUser?.userId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriendDetails();
  }, [getUser?.userId]);

  return (
    <>
      {user ? (
        <Box
          pos="fixed"
          top="0"
          d="flex"
          ml={["0%", "0%", "35%"]}
          w={["100%", "100%", "65%"]}
          alignItems="center"
          justifyContent="center"
          h="full"
          flexDir="column"
          bg={bg}
        >
          <Avatar size="xl" src={user.profileUrl} />
          <Flex p={4} flexDir="column" alignItems="center">
            <Heading>{user.name}</Heading>
            <Text>{user.email}</Text>
          </Flex>
          <Button variant="outline" colorScheme="telegram">
            Request
          </Button>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
};
