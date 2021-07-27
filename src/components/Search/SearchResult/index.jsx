import {
  Flex,
  LinkBox,
  Box,
  Heading,
  Avatar,
  useColorModeValue,
  LinkOverlay,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const bg = useColorModeValue("gray.100", "gray.700");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(result);
  }, [result]);

  return (
    <>
      <Flex
        flexDir="column"
        bg={bg}
        position="fixed"
        left="0px"
        top="70px"
        h="full"
        w={["100%", "100%", "35%"]}
      >
        <Divider orientation="horizontal" />
        {searchResult.map((r) => (
          <LinkBox key={r._id} _hover={{ hoverBg }}>
            <LinkOverlay as={Link} to={"/chats/users/" + r._id} />
            <Flex alignItems="center" p="10px">
              <Flex alignItems="center">
                <Avatar src={r?.profileUrl} />
                <Box p={4} maxW="100%">
                  <Heading size="md">{r?.name}</Heading>
                  <Text size="md" isTruncated={true}>
                    {r?.email}
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Divider orientation="horizontal" />
          </LinkBox>
        ))}
      </Flex>
    </>
  );
};
