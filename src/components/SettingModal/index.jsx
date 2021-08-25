import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Avatar,
  Text,
  useClipboard,
  useColorMode,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { MdBrightnessHigh, MdShare, MdBrightness2 } from "react-icons/md";
import { SideBarButton } from "../Sidebar/SideBarButton";
import { SettingLabel } from "./SettingLabel";
import { ShareModal } from "./ShareModal";
import { IsUpdateAvailable } from "../../lib/hooks/IsUpdateAvailable";

export const SettingModal = ({ Open, Close }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const user = JSON.parse(localStorage.getItem("profile"));
  const { hasCopied, onCopy } = useClipboard(user._id);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateAvailable = IsUpdateAvailable();
  const updateApp = () => {
    window.location.reload(true);
  };
  return (
    <Modal
      scrollBehavior="inside"
      size="xl"
      motionPreset="slideInBottom"
      isOpen={Open}
      onClose={Close}
    >
      <ModalOverlay />
      <ModalContent
        mt={["0", "5%"]}
        rounded="none"
        minH={{ base: "100vh", sm: "96" }}
      >
        <ModalHeader bg={bg}>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          {user !== null ? (
            <>
              <Box bg={bg}>
                <SettingLabel label="Profile" />
                <Flex p={4}>
                  <Avatar src={user.profileUrl} />
                  <Box ml={3}>
                    <Text as="b">{user.name}</Text>
                    <Text>{user.email}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="Account" />

                <SideBarButton
                  onClick={onOpen}
                  label="Share your User Id"
                  icon={<MdShare fontSize="27px" />}
                />
                <InputGroup>
                  <Input m={3} placeholder={user?._id} isDisabled />
                  <InputRightElement m={3} width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={onCopy}>
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="Chats" />
                <SideBarButton
                  onClick={toggleColorMode}
                  label={colorMode === "light" ? "Light Theme" : "Dark Theme"}
                  icon={
                    colorMode === "light" ? (
                      <MdBrightnessHigh fontSize="27px" />
                    ) : (
                      <MdBrightness2 fontSize="27px" />
                    )
                  }
                />
              </Box>
              <Box p={3}></Box>
              <Box bg={bg}>
                <SettingLabel label="App Info" />
                <Flex p={3} alignItems="center" justifyContent="center">
                  <Text as="b">Star Messenger web v00.22.05.2003</Text>
                  {updateAvailable === true ? (
                    <Button size="md" m={3} onClick={updateApp}>
                      Update
                    </Button>
                  ) : (
                    <Button
                      isDisabled={true}
                      size="md"
                      m={3}
                      onClick={updateApp}
                    >
                      No Updates
                    </Button>
                  )}
                </Flex>
              </Box>
            </>
          ) : (
            <></>
          )}
        </ModalBody>
      </ModalContent>
      {user !== null ? (
        <ShareModal
          onClose={onClose}
          isOpen={isOpen}
          content={`Send me request on https://star-messaging-client.vercel.app/chats/users/${user._id} to start a conversation.`}
        />
      ) : null}
    </Modal>
  );
};
