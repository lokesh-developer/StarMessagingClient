import {
  Box,
  Avatar,
  useColorModeValue,
  Flex,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

export const UserProfile = () => {
  const getUser = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [thatUser, setThatUser] = useState();
  const [request, setRequest] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.700");
  const history = useHistory();

  useEffect(() => {
    const getFriendDetails = async () => {
      try {
        const res = await axios("/users?userId=" + getUser?.userId);
        setThatUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriendDetails();
  }, [getUser?.userId]);

  const sendRequest = async () => {
    const request = {
      sendersId: user._id,
      receiversId: getUser?.userId,
    };
    try {
      const res = await axios.post("/requests/", request);
      setRequest(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios("/requests?userId=" + getUser?.userId);
        setRequest(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRequests();
  }, [getUser?.userId]);
  console.log(request);

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
          <Avatar size="xl" src={thatUser?.profileUrl} />
          <Flex p={4} flexDir="column" alignItems="center">
            <Heading>{thatUser?.name}</Heading>
            <Text>{thatUser?.email}</Text>
          </Flex>
          <Button
            variant="outline"
            colorScheme="telegram"
            onClick={sendRequest}
          >
            Request
          </Button>
          <Button
            mt={4}
            variant="link"
            outline="none"
            onClick={() => history.goBack()}
            d={["block", "block", "none"]}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
};
