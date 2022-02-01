import styled from "styled-components";
import { Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Box>
        <Typography variant="h5">Are you lost?</Typography>
        <Link to="/">
          <Button variant="contained" size="small">
            back to surface
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  width: 100%;
  max-width: 500px;

  background: linear-gradient(180deg, #5834eb, #5146f0);
  border-radius: 15px;
  padding: 1rem;

  @media (max-width: 530px) {
    height: 100%;
    border-radius: 0;
    padding: 0.7rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  transition: all ease-out 100ms;
`;
