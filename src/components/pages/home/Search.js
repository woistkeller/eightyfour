import { useEffect, useState, useRef } from "react";

import styled from "styled-components";

import { Alert, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { useAuth } from "../../../hooks/useAuth";
import searchAPI from "../../../api/search.api";

import User from "./search/User";

export default function Search() {
  const [response, setResponse] = useState({ status: "" });
  const [isLoading, setIsLoading] = useState();
  const [activing, setActiving] = useState(false);
  const search = useRef();

  const user = useAuth().user;

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await searchAPI.search(search.current.value, user.token);
      if (response.status === true) setResponse(response.message);
      else setResponse({ message: "users hasn't found", status: false });
    } catch (er) {
      setResponse({ message: "an error occur, sorry", status: false });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container actived={activing}>
        <Form>
          <form
            style={{
              width: "100%",
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              fullWidth
              required
              inputProps={({ maxLength: 30 }, { ref: search })}
              variant="outlined"
              size="small"
              label="user"
              margin="dense"
            />
            <LoadingButton
              fullWidth
              size="small"
              variant="contained"
              loading={isLoading}
              type="submit"
              color="primary"
            >
              search
            </LoadingButton>
          </form>
        </Form>
        {response.status !== "" && response.status !== false ? (
          <User user={response} />
        ) : (
          response.status !== "" && (
            <Alert variant="error" style={{ width: "100%" }}>
              {response.message}
            </Alert>
          )
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  right: ${(props) => (props.actived ? "0" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;
  overflow: hidden;
`;

const Form = styled.div`
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  background-color: white;
`;
