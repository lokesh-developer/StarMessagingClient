import {
  LinkBox,
  Box,
  Text,
  LinkOverlay,
  Heading,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdBookmark } from "react-icons/md";

export const SavedMessages = () => {
  const lastseen = useColorModeValue("gray.600", "gray.500");
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");

  return (
    <>
      <LinkBox _hover={{ bg }}>
        <LinkOverlay as={Link} to="/chat/saved-messages/" />
        <Flex alignItems="center" p="10px">
          <Box p={3} borderRadius="full" bg={bg}>
            <Icon as={MdBookmark} fontSize="30px" />
          </Box>
          <Box p={3}>
            <Heading size="md">Saved Messages</Heading>
            <Text color={lastseen}>
              Bookmarked messages will be shown here...
            </Text>
          </Box>
        </Flex>
      </LinkBox>
    </>
  );
};
