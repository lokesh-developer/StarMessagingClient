import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  useColorModeValue,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { SideBarProfile } from "./SideBarProfile";
import { SideBarButton } from "./SideBarButton";
import { MdSettings, MdNotifications, MdPersonAdd } from "react-icons/md";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Logo } from "../Logo";
import { SettingModal } from "../SettingModal";

export const Sidebar = ({ Open, Close }) => {
  const value = useColorModeValue("dark", "light");
  const bg = useColorModeValue("gray.100", "gray.800");
  const history = useHistory();
  const logoutinSuccess = () => {
    localStorage.removeItem("profile");
    history.push("/");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Drawer isOpen={Open} placement="left" onClose={Close}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader p={0} bg={bg}>
            <SideBarProfile />
          </DrawerHeader>
          <Divider orientation="horizontal" />
          <DrawerBody p={0}>
            <SideBarButton
              label="Notifications"
              icon={<MdNotifications fontSize="26px" />}
            />
            <SideBarButton
              label="Chat requests"
              icon={<MdPersonAdd fontSize="26px" />}
              onClick={() => history.push("/chats/chats-requests")}
            />
            <SideBarButton
              label="Settings"
              icon={<MdSettings fontSize="26px" />}
              onClick={onOpen}
            />
            <Divider orientation="horizontal" />
            <Flex mt={4} w="full" alignItems="center" justifyContent="center">
              <GoogleLogout
                theme={value}
                buttonText="Logout"
                clientId="1045205020440-m237oug228ipsn2ro025hjlb8148ggge.apps.googleusercontent.com"
                onLogoutSuccess={logoutinSuccess}
              />
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Logo width="70px" height="70px" />
            <Text>
              <Text as="b">&copy; Star</Text> messaging app{" "}
              <Text as="b">v22.05.2003</Text>
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <SettingModal Open={isOpen} Close={onClose} />
    </>
  );
};
