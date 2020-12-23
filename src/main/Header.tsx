import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";

function Header() {
  return (
    <Box bg={"gray.100"} textAlign={"left"} p={15}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Link as={ReactRouterNavLink} to="/" mr={6}>
          <Heading letterSpacing={2}>JAMBIN</Heading>
        </Link>

        <Box>
          <Link
            as={ReactRouterNavLink}
            to="/view"
            mr={6}
            activeStyle={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            View
          </Link>

          <Link
            as={ReactRouterNavLink}
            to="/create"
            activeStyle={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Create
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
