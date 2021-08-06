import {
  Avatar,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
import { ProfileModal } from "../../ProfileModal";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { OnlineUser } from "../../OnlineUser";

export const ChatHeader = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [myFriend, setMyFriend] = useState([]);
  const [friend, setFriend] = useState({});
  const getConversation = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/conversations/c/` +
            getConversation?.conversationId
        );
        localStorage.setItem(
          `friend/${getConversation?.conversationId}`,
          JSON.stringify(res.data)
        );
        setFriend(res.data);
      } catch (error) {
        const offlineFriend = JSON.parse(
          localStorage.getItem(`friend/${getConversation?.conversationId}`)
        );
        setFriend(offlineFriend);
      }
    };
    getFriends();
  }, [getConversation.conversationId]);

  useEffect(() => {
    const findFriend = async () => {
      const friendId = friend[0]?.members.find((member) => member !== user._id);
      if (friendId !== undefined) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/users?userId=` + friendId
          );
          localStorage.setItem(
            `conversation/friend/user/${friendId}`,
            JSON.stringify(res.data)
          );
          setMyFriend(res.data);
        } catch (error) {
          const offlineConversationFriend = JSON.parse(
            localStorage.getItem(`conversation/friend/user/${friendId}`)
          );
          setMyFriend(offlineConversationFriend);
        }
      }
    };
    findFriend();
  }, [friend, user._id]);

  return (
    <>
      <Flex
        pos="fixed"
        p={3}
        bg={bg}
        w={["100%", "100%", "65%"]}
        top="0"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="link"
          outline="none"
          leftIcon={<MdKeyboardArrowLeft fontSize="27px" />}
          onClick={() => history.goBack()}
          d={["block", "block", "none"]}
        ></Button>
        <Flex w="full">
          <Avatar src={myFriend?.profileUrl} />
          <Flex w="full" flexDir="column" mx={4}>
            <Text as="b">{myFriend?.name}</Text>
            <OnlineUser friendId={myFriend?._id} />
          </Flex>
        </Flex>
        <Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              icon={<MdMoreVert fontSize="27px" />}
              borderRadius="full"
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>View Profile</MenuItem>
              <MenuItem>Delete Chat</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <ProfileModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};
