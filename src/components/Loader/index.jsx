import { Spinner, Flex } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="999"
    >
      <Flex
        w="min-content"
        h="min-content"
        bg="whiteAlpha.400"
        borderRadius="full"
        p={1}
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Flex>
    </Flex>
  );
};
