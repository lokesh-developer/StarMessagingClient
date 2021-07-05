import { Text, Divider, Flex, useColorModeValue } from "@chakra-ui/react";

export const SettingLabel = ({ label, smallText }) => {
  const labelColor = useColorModeValue("blue.600", "blue.400");
  return (
    <>
      <Flex flexDir="column">
        <Text
          fontSize="lg"
          color={labelColor}
          as={Flex}
          alignItems="center"
          p={3}
        >
          <b>{label}</b>
        </Text>
        {smallText ? (
          <Text fontSize="sm" as={Flex} alignItems="center" pl={3} pb={3}>
            {smallText}
          </Text>
        ) : (
          <></>
        )}

        <Divider orientation="horizontal" />
      </Flex>
    </>
  );
};
