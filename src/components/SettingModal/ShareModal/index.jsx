import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

export const ShareModal = ({ isOpen, onClose, content }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="xl"
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" justifyContent="center">
              <IconButton
                variant="outline"
                colorScheme="telegram"
                icon={<Icon as={FaTelegram} fontSize="25px" />}
                size="lg"
                borderRadius="full"
                as="a"
                href={`https://t.me/share/url?text=${content}&url=https://star-messaging-client.vercel.app/chats/users/${user._id}`}
                target="_blank"
                rel="noopenner"
              />
              <IconButton
                ml={5}
                borderRadius="full"
                variant="outline"
                colorScheme="whatsapp"
                icon={<Icon as={FaWhatsapp} fontSize="25px" />}
                size="lg"
                as="a"
                href={`whatsapp://send?text=${content}`}
                target="_blank"
                rel="noopenner"
              />
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
