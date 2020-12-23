import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  FormLabel,
  FormControl,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { languages, themes } from "./codeEditorConstants.js";
import AceEditor from "react-ace";
function SettingsModal({
  state,
  setMode,
  setTheme,
  setFontSize,
  setBoolean,
  setPlaceholder,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<SettingsIcon mb={0.75} />}>
        Editor Settings
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Code Editor Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="column">
              <div className="field">
                <label>Mode:</label>
                <p className="control">
                  <span className="select">
                    <Select name="mode" onChange={setMode} value={state.mode}>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </Select>
                  </span>
                </p>
              </div>

              <div className="field">
                <label>Theme:</label>
                <p className="control">
                  <span className="select">
                    <Select
                      name="Theme"
                      onChange={setTheme}
                      value={state.theme}
                    >
                      {themes.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </Select>
                  </span>
                </p>
              </div>

              <div className="field">
                <label>Font Size:</label>
                <p className="control">
                  <span className="select">
                    <Select
                      name="Font Size"
                      onChange={setFontSize}
                      value={state.fontSize}
                    >
                      {[14, 16, 18, 20, 24, 28, 32, 40].map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </Select>
                  </span>
                </p>
              </div>

              <FormControl>
                <FormLabel>Placeholder:</FormLabel>

                <Input
                  className="input"
                  type="text"
                  onChange={setPlaceholder}
                  value={state.placeholder}
                />
              </FormControl>

              <Stack mt={1} spacing={1}>
                <Checkbox
                  isChecked={state.enableBasicAutocompletion}
                  onChange={(e) =>
                    setBoolean("enableBasicAutocompletion", e.target.checked)
                  }
                >
                  Enable Basic Autocomplete
                </Checkbox>

                <Checkbox
                  isChecked={state.enableLiveAutocompletion}
                  onChange={(e) =>
                    setBoolean("enableLiveAutocompletion", e.target.checked)
                  }
                >
                  Enable Live Autocomplete
                </Checkbox>

                <Checkbox
                  isChecked={state.showGutter}
                  onChange={(e) => setBoolean("showGutter", e.target.checked)}
                >
                  Show Gutter
                </Checkbox>

                <Checkbox
                  isChecked={state.highlightActiveLine}
                  onChange={(e) =>
                    setBoolean("highlightActiveLine", e.target.checked)
                  }
                >
                  Highlight Active Line
                </Checkbox>

                <Checkbox
                  isChecked={state.showPrintMargin}
                  onChange={(e) =>
                    setBoolean("showPrintMargin", e.target.checked)
                  }
                >
                  Show Print Margin
                </Checkbox>

                <Checkbox
                  isChecked={state.showLineNumbers}
                  onChange={(e) =>
                    setBoolean("showLineNumbers", e.target.checked)
                  }
                >
                  Show Line Numbers
                </Checkbox>
              </Stack>

              <Accordion allowMultiple mt={3}>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      See the Code
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AceEditor
                      mode="jsx"
                      theme="monokai"
                      style={{ width: "100%" }}
                      readOnly={true}
                      value={`<AceEditor
placeholder="${state.placeholder}"
mode="${state.mode}"
theme="${state.theme}"
name="blah2"
onLoad={onLoad}
onChange={onChange}
fontSize={${state.fontSize}}
showPrintMargin={${state.showPrintMargin}}
showGutter={${state.showGutter}}
highlightActiveLine={${state.highlightActiveLine}}
value={\`${state.value}\`}
setOptions={{
enableBasicAutocompletion: ${state.enableBasicAutocompletion},
enableLiveAutocompletion: ${state.enableLiveAutocompletion},
enableSnippets: ${state.enableSnippets},
showLineNumbers: ${state.showLineNumbers},
tabSize: 2,
}}/>
`}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <div className="column"></div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SettingsModal;
