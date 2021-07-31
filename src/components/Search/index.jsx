import React, { useState } from "react";
import { Input, IconButton, Flex, Fade, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import { SearchResult } from "./SearchResult";
import { Loader } from "../Loader";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDisabled = searchQuery === "" ? true : false;
  const openClose = searchQuery === "" ? onClose : onOpen;
  const display = isOpen ? "block" : "none";

  const searchFriends = async (e) => {
    e?.preventDefault();
    try {
      const res =
        searchQuery.length > 23
          ? await axios.get("/users?userId=" + searchQuery)
          : await axios.get("/users?name=" + searchQuery);
      setResult(res.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={searchFriends}>
        <Flex ml={4}>
          <Input
            w="full"
            variant="filled"
            placeholder="Search friend name or id..."
            type="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              openClose();
              searchFriends();
            }}
            onKeyDownCapture={openClose}
            value={searchQuery}
            onClick={openClose}
          />
          <IconButton
            icon={<MdSearch fontSize="24px" />}
            variant="ghost"
            isDisabled={isDisabled}
            borderRadius={5}
            type="submit"
          />
        </Flex>
      </form>
      <Fade
        in={isOpen}
        style={{ position: "fixed", zIndex: "99", display: display }}
      >
        {loading ? <SearchResult result={result} /> : <Loader />}
      </Fade>
    </>
  );
};
