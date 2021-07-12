import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const ChatRequestModal = () => {
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
        <ModalBody p={0}></ModalBody>
      </ModalContent>
    </Modal>
  );
};
