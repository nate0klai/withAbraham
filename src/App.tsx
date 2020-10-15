import React from 'react';
import { Box, Container } from "@material-ui/core";
import { Abraham } from "./components/Abraham";

function App() {
  return (
      <Box className="App">
          <Container>
              <Box py={5}>
                  <Abraham />
              </Box>
          </Container>
      </Box>
  );
}

export default App;
