import {
  Box,
  Avatar,
  useColorModeValue,
  Flex,
  Text,
  Heading,
  Button,
  Tag,
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
  const [requested, setRequested] = useState(false);
  const bg = useColorModeValue("gray.100", "gray.700");
  const history = useHistory();

  useEffect(() => {
    const getFriendDetails = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_SERVER_URL}/users?userId=` + getUser?.userId
        );
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
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/requests/`,
        request
      );
      setRequest([res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_SERVER_URL}/requests?userId=` +
            getUser?.userId
        );
        setRequest(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRequests();
  }, [getUser?.userId]);

  useEffect(() => {
    const filteredRequests = request
      ?.filter((req) => req.sendersId === user._id)
      .map((req) => req.sendersId === user._id);
    setRequested(filteredRequests);
  }, [request, user._id]);

  return (
    <>
      {thatUser ? (
        <>
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

            {requested.length !== 0 ? (
              <Button
                variant="outline"
                colorScheme="telegram"
                onClick={sendRequest}
                isDisabled
              >
                Requested
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="telegram"
                onClick={sendRequest}
              >
                Request
              </Button>
            )}
            <Button
              mt={4}
              variant="link"
              outline="none"
              onClick={() => history.push("/chats")}
              d={["block", "block", "none"]}
            >
              Back
            </Button>
          </Box>
        </>
      ) : (
        <Box
          as={Flex}
          flexDir="column"
          pos="fixed"
          top="0"
          ml="35%"
          d={["none", "none", "flex"]}
          w="65%"
          alignItems="center"
          justifyContent="center"
          h="full"
          bg={bg}
        >
          <Tag size="md">No such user found...</Tag>
        </Box>
      )}
    </>
  );
};
