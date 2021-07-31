import { Box, Spinner, Flex } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Box
      as={Flex}
      h="full"
      w="full"
      bg={{ color: "white", opacity: 0.5 }}
      alignItems="center"
      justifyContent="center"
      pos="fixed"
    >
      <Spinner size="xl" />
    </Box>
  );
};
