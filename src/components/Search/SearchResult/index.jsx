import {
  Flex,
  LinkBox,
  Box,
  Heading,
  Avatar,
  useColorModeValue,
  IconButton,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const bg = useColorModeValue("gray.100", "gray.700");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setSearchResult(result);
  }, [result]);

  const friendProfile = (e) => {
    const friend = e.target?.id;
    history.push("/chats/users/" + friend);
  };

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
            <Flex justifyContent="space-around" alignItems="center" p="10px">
              <Flex alignItems="center">
                <Avatar src={r?.profileUrl} />
                <Box p={4} maxW="100%">
                  <Heading size="md">{r?.name}</Heading>
                  <Text size="md" isTruncated={true}>
                    {r?.email}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                borderRadius="full"
                p={0}
                onClick={friendProfile}
                id={r._id}
                icon={<MdGroupAdd fontSize="25px" style={{ zIndex: "-1" }} />}
              />
            </Flex>
            <Divider orientation="horizontal" />
          </LinkBox>
        ))}
      </Flex>
    </>
  );
};
