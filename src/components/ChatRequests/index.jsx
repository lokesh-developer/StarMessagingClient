import {
  Box,
  IconButton,
  Flex,
  Heading,
  useColorModeValue,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import loadable from "@loadable/component";
import { useEffect, useState } from "react";
import axios from "axios";

export const ChatRequests = () => {
  const RequestersProfile = loadable(() =>
    import("./RequestersProfile").then((mod) => mod.RequestersProfile)
  );
  const bg = useColorModeValue("gray.100", "gray.700");
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const text = useColorModeValue("gray.600", "gray.300");
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const requests = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/requests?userId=` + user._id
        );
        setAllRequests(requests.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequests();
  }, [user._id]);

  return (
    <Box
      pos="fixed"
      top="0"
      d="flex"
      ml={["0%", "0%", "35%"]}
      w={["100%", "100%", "65%"]}
      h="full"
      flexDir="column"
      overflowY="scroll"
      bg={bg}
    >
      <Flex p={4} alignItems="center">
        <IconButton
          icon={<MdKeyboardArrowLeft fontSize="27px" />}
          variant="ghost"
          outline="none"
          mr={4}
          alignItems="center"
          justifyContent="center"
          onClick={() => history.push("/chats")}
          d={["block", "block", "none"]}
        />
        <Heading size="md">Chat Requests</Heading>
      </Flex>
      <Divider orientation="horizontal" />
      {allRequests.length > 0 ? (
        allRequests.map((request, index) => (
          <RequestersProfile key={index} request={request} />
        ))
      ) : (
        <Flex p={4} alignItems="center" justifyContent="center">
          <Text color={text} as="b">
            No Requests found...
          </Text>
        </Flex>
      )}
    </Box>
  );
};
