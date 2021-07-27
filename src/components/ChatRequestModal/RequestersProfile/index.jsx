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
import axios from "axios";

export const RequestersProfile = ({ request }) => {
  const sentColor = useColorModeValue("gray.400", "gray.400");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [receiverProfile, setReceiverProfile] = useState([]);
  const [senderProfile, setSenderProfile] = useState([]);

  const acceptRequest = () => {};
  const rejectRequest = () => {};

  useEffect(() => {
    const getReciever = async () => {
      try {
        const res = await axios.get("/users?userId=" + request.receiversId);
        setReceiverProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSender = async () => {
      try {
        const res = await axios.get("/users?userId=" + request.sendersId);
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
      {request.receiversId === user._id ? (
        <Flex p={4} justifyContent="space-between" w="full">
          <Flex>
            <Avatar src={senderProfile.profileUrl} />
            <Flex flexDir="column" ml={4}>
              <Text as="b">{senderProfile.name}</Text>
              <Text as="i">{senderProfile.email}</Text>
            </Flex>
          </Flex>
          <Flex>
            {request.status === "PENDING" ? (
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
              </>
            ) : (
              <></>
            )}
            <Text color={sentColor} ml={4} fontSize="x-small">
              {format(request.createdAt, "UTC:mmmm dS, h:MM TT")}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex p={4} justifyContent="space-between" w="full">
            <Flex>
              <Avatar src={receiverProfile.profileUrl} />
              <Flex flexDir="column" ml={4}>
                <Text as="b">{receiverProfile.name}</Text>
                <Text as="i">{receiverProfile.email}</Text>
              </Flex>
            </Flex>
            <Flex>
              <Text color={sentColor} ml={4} fontSize="small">
                You sent request on{" "}
                {format(request.createdAt, "UTC:mmmm dS, h:MM TT")}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
      <Divider orientation="horizontal" />
    </>
  );
};
