import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

import useQuery from "../../utils/useQuery";
import { getBin } from "../../api/api";

function ViewPage() {
  const { binId: binIdFromParams } = useParams<{ binId?: string }>();
  const searchQuery = useQuery();
  const history = useHistory();
  const location = useLocation();
  const [binId, setBinId] = useState("");
  const [password, setPassword] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [binData, setBinData] = useState<{
    error?: string;
    body?: string;
  } | null>(null);

  useEffect(() => {
    // FORMAT: .../view/BIN_ID?password=BIN_PW

    const passwordFromSearchQuery = searchQuery.get("password");

    if (binIdFromParams) {
      setBinId(binIdFromParams);
    }

    if (passwordFromSearchQuery) {
      setPassword(passwordFromSearchQuery);
    }

    if (binIdFromParams || passwordFromSearchQuery) {
      setShouldFetch(true);
    } else {
      // this occurs when clicked VIEW navlink when on a view page, should reset all details in this case
      setBinId("");
      setPassword("");
      setBinData(null);
      setShouldFetch(false);
    }
  }, [location]);

  useEffect(() => {
    if (shouldFetch) {
      setIsFetching(true);

      getBin(binId, password)
        .then((res) => res.json())
        .then((j) => {
          setBinData(j);
          setIsFetching(false);
          setShouldFetch(false);
        });
    }
  }, [shouldFetch]);

  return (
    <>
      <Box p={1}>
        <Box textAlign="center">
          <Heading size={"lg"}>View Bin</Heading>
        </Box>

        <Box my={4} textAlign="left">
          <FormControl>
            <FormLabel>Bin Id</FormLabel>

            <Input
              placeholder={"id of the bin"}
              value={binId}
              onChange={(e) => {
                console.log({ val: e.currentTarget.value });
                setBinId(e.currentTarget.value);
              }}
            />
          </FormControl>

          <FormControl mt={6}>
            <FormLabel>Password (optional)</FormLabel>

            <Input
              title="hello"
              placeholder={"password of the bin (if any)"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>

          <Button
            width="full"
            mt={4}
            isLoading={isFetching}
            loadingText={"Fetching"}
            colorScheme={"blue"}
            onClick={() => {
              history.push({
                pathname: `/view/${binId}`,
                search: password ? `?password=${password}` : undefined,
              });
            }}
            isDisabled={!binId.length}
          >
            Get
          </Button>
        </Box>
      </Box>

      {isFetching && <p>Loading...</p>}

      <Divider mb={5} />

      <Box>
        {binData?.error &&
          (binData.error === "Password is required" ? (
            <Alert status="warning" borderRadius={"lg"}>
              <LockIcon />
              This bin is password protected
            </Alert>
          ) : (
            <Alert status="error" borderRadius={"lg"}>
              <AlertIcon />
              {binData.error}
            </Alert>
          ))}

        {binData?.body && (
          <>
            <Heading size={"small"} mb={2} textAlign={"left"}>
              Bin Content
            </Heading>

            <Textarea value={binData.body} onChange={() => null} />
          </>
        )}
      </Box>
    </>
  );
}

export default ViewPage;
