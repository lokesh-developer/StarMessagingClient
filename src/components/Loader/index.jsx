import { Progress, Box } from "@chakra-ui/react";
export const Loader = () => {
  return (
    <Box w="100vw" pos="fixed" left="0px" top="0px">
      <Progress w="full" size="xs" colorScheme="purple" isIndeterminate />
    </Box>
  );
};
