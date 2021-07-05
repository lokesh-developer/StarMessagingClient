import React from "react";
import { Button, Text } from "@chakra-ui/react";

export const SideBarButton = ({ label, icon, onClick }) => {
  return (
    <Button
      isFullWidth
      borderRadius="none"
      variant="ghost"
      p={8}
      iconSpacing={4}
      leftIcon={icon}
      onClick={onClick}
      sx={{ alignItems: "center", justifyContent: "start" }}
    >
      <Text fontSize="lg">{label}</Text>
    </Button>
  );
};
