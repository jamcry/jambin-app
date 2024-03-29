import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CopyIcon, ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Divider,
  Alert,
  AlertIcon,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { getBinUrlFromId } from "../../utils/binUtils";
import { createBin } from "../../api/api";

function CreatePage() {
  const history = useHistory();
  const [body, setBody] = useState("");
  const [password, setPassword] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [binData, setBinData] = useState<{
    error?: string;
    id?: string;
    body?: string;
  } | null>(null);
  const binIdTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (shouldFetch) {
      setIsFetching(true);

      createBin(body, password)
        .then((res) => res.json())
        .then((j) => {
          setBinData(j);
          setIsFetching(false);
          setShouldFetch(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  return (
    <>
      <Box p={1}>
        <Box textAlign="center">
          <Heading size={"lg"}>New Bin</Heading>
        </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShouldFetch(true);
          }}
        >
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <FormLabel>Content</FormLabel>

              <Textarea
                placeholder={"content of the bin"}
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
                minHeight="250px"
                isRequired
              />

              <Text
                fontSize="sm"
                color={body.length ? "gray.700" : "gray.500"}
                mt={2}
              >
                * Content will be encrypted
                <Tooltip
                  label="Content will be encrypted, but adding a password will make it more secure"
                  fontSize="md"
                >
                  <QuestionIcon ml={2} />
                </Tooltip>
              </Text>
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
              colorScheme={"blue"}
              mt={4}
              isLoading={isFetching}
              loadingText={"Saving"}
              type={"submit"}
              isDisabled={!body.length}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>

      {binData?.error && (
        <Alert status="error" borderRadius={"lg"}>
          <AlertIcon />
          {binData.error}
        </Alert>
      )}

      <Divider mb={5} />

      {
        //  SUCCESS VIEW BELOW
      }

      {binData?.id && (
        <Box>
          <Alert status="success" borderRadius={"lg"}>
            <AlertIcon />
            Bin was created!
          </Alert>

          <Box mt={6} pb={56}>
            <Heading size={"small"} mb={2} textAlign={"left"}>
              Sharable Link
            </Heading>

            <Textarea
              ref={binIdTextAreaRef}
              value={getBinUrlFromId(binData.id, password)}
              readOnly
            />

            <Flex mt={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                onClick={() => {
                  if (binIdTextAreaRef.current) {
                    binIdTextAreaRef.current!.select();
                    document.execCommand("copy");
                    window.alert("Copied!");
                  }
                }}
                mr={16}
                leftIcon={<CopyIcon />}
                colorScheme={"teal"}
              >
                Copy to clipboard
              </Button>

              <Button
                onClick={() => {
                  history.push({
                    pathname: `/view/${binData.id}`,
                    search: password ? `?password=${password}` : undefined,
                  });
                }}
                rightIcon={<ArrowForwardIcon />}
                variant={"outline"}
                colorScheme={"teal"}
              >
                Go to bin
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CreatePage;
