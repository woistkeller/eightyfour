import styled from "styled-components";
import { Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Typography variant="h5">Not Found</Typography>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
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
