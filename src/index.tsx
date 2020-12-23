import React from "react";
import ReactDOM from "react-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./main/Header";
import CreatePage from "./pages/create/CreatePage";
import ViewPage from "./pages/view/ViewPage";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Box maxWidth="550px" margin="auto" p={2}>
          <Route path="/view/:binId?" exact>
            <ViewPage />
          </Route>

          <Route path="/create" exact>
            <CreatePage />
          </Route>

          <Route path="/" exact>
            Home page
          </Route>
        </Box>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
