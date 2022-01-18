import styled from "styled-components";
import { useState } from "react";

import Register from "../components/pages/main/Register";
import Login from "../components/pages/main/Login";

import Button from "@mui/material/Button";

export default function Main() {
  const [page, setPage] = useState("login");

  return (
    <Container>
      {page === "login" ? (
        <Login selected={page} />
      ) : (
        <Register selected={page} />
      )}
      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setPage(page === "login" ? "register" : "login");
        }}
      >
        I want to {page}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
