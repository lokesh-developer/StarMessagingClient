import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
export const ProfileModal = ({ isOpen, onClose }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="lg"
        scrollBehavior="outside"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={bg}>User Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
