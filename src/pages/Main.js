import styled from "styled-components";
import { useState } from "react";

import Register from "../components/pages/main/Register";
import Login from "../components/pages/main/Login";

import Button from "@mui/material/Button";

export default function Main() {
  const [typeRequest, setTypeRequest] = useState("login");

  var invertedTypeRequest = typeRequest === "login" ? "register" : "login";

  function handleTypeRequestChange() {
    setTypeRequest(typeRequest === "login" ? "register" : "login");
  }

  return (
    <Container>
      <Authentication>
        {typeRequest === "login" ? (
          <Login selected={typeRequest} />
        ) : (
          <Register selected={typeRequest} />
        )}
        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={handleTypeRequestChange}
          style={{ backgroundColor: "white", color: "#141414" }}
        >
          I want to {invertedTypeRequest}
        </Button>
      </Authentication>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Authentication = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 80%;
  width: 100%;
  max-width: 500px;
  background: linear-gradient(180deg, #5834eb, #5146f0);
  border-radius: 15px;
  padding: 1rem;
`;
