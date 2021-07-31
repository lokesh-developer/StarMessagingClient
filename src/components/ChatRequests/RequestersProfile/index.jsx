import {
  Flex,
  Avatar,
  Text,
  IconButton,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdDone, MdClear } from "react-icons/md";
import format from "dateformat";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const RequestersProfile = ({ request }) => {
  const sentColor = useColorModeValue("gray.400", "gray.400");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [receiverProfile, setReceiverProfile] = useState([]);
  const [senderProfile, setSenderProfile] = useState([]);
  const [requesting, setRequesting] = useState([]);
  const history = useHistory();

  const acceptRequest = async () => {
    const data = {
      requestId: request._id,
    };
    const conversationData = {
      sendersId: request.sendersId,
      recieversId: request.receiversId,
    };
    try {
      const req = await axios.all([
        axios.post(
          `${process.env.REACT_SERVER_URL}/conversations`,
          conversationData
        ),
        axios.post(`${process.env.REACT_SERVER_URL}/requests/accept`, data),
      ]);
      setRequesting(req[1].data);
      history.push(`/chats/conversations/${req[0].data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectRequest = () => {};

  useEffect(() => {
    setRequesting(request);
    const getReciever = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_SERVER_URL}/users?userId=` + request.receiversId
        );
        setReceiverProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSender = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_SERVER_URL}/users?userId=` + request.sendersId
        );
        setSenderProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSender();
    getReciever();
  }, [request]);

  return (
    <>
      {requesting.receiversId === user._id ? (
        <Flex
          p={4}
          justifyContent="space-between"
          flexDir={["column", "row"]}
          w="full"
        >
          <Flex>
            <Avatar src={senderProfile.profileUrl} />
            <Flex flexDir="column" ml={4}>
              <Text as="b">{senderProfile.name}</Text>
              <Text as="i">{senderProfile.email}</Text>
            </Flex>
          </Flex>
          <Flex>
            {requesting.status === "PENDING" ? (
              <>
                <IconButton
                  variant="ghost"
                  icon={<MdDone fontSize="27px" color="green" />}
                  onClick={acceptRequest}
                />
                <IconButton
                  variant="ghost"
                  icon={<MdClear fontSize="27px" color="red" />}
                  onClick={rejectRequest}
                  ml={4}
                />
                <Text
                  color={sentColor}
                  ml={4}
                  mt={["2", "0"]}
                  fontSize="x-small"
                >
                  {format(request.createdAt, "UTC:mmmm dS, h:MM TT")}
                </Text>
              </>
            ) : requesting.status === "ACCEPTED" ? (
              <>
                <Text color={sentColor} ml={4} mt={["2", "0"]} fontSize="small">
                  You accepted this request.
                </Text>
              </>
            ) : (
              <>
                <Text color={sentColor} ml={4} mt={["2", "0"]} fontSize="small">
                  You rejected this request.
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex
            p={4}
            justifyContent="space-between"
            flexDir={["column", "row"]}
            w="full"
          >
            <Flex>
              <Avatar src={receiverProfile.profileUrl} />
              <Flex flexDir="column" ml={4}>
                <Text as="b">{receiverProfile.name}</Text>
                <Text as="i">{receiverProfile.email}</Text>
              </Flex>
            </Flex>
            <Flex>
              {requesting.status === "PENDING" ? (
                <Text color={sentColor} ml={4} mt={["2", "0"]} fontSize="small">
                  You sent request on{" "}
                  {format(request.createdAt, "UTC:mmmm dS, h:MM TT")}
                </Text>
              ) : requesting.status === "ACCEPTED" ? (
                <Text color={sentColor} ml={4} mt={["2", "0"]} fontSize="small">
                  This request has been accepted.
                </Text>
              ) : (
                <Text color={sentColor} ml={4} mt={["2", "0"]} fontSize="small">
                  This request has been rejected.
                </Text>
              )}
            </Flex>
          </Flex>
        </>
      )}
      <Divider orientation="horizontal" />
    </>
  );
};
