//utilities
import { useEffect, useState, useRef } from "react";

//styles
import styled from "styled-components";
import { Alert, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

//api
import searchAPI from "../../../api/search.api";

//reduxstuff
import { useAuth } from "../../../hooks/useAuth";

//components
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

    //i make a init
    var initFetch = async () => {
      const result = await searchAPI.search("caian", user.token);
      result.status === true
        ? setResponse({ user: result.message })
        : setResponse({
            response: result.message.data.message,
            status: false,
          });
    };

    initFetch();
  }, [user.token]);

  var handleRated = async () => {
    const result = await searchAPI.search(search.current.value, user.token);
    result.status === true && setResponse({ user: result.message });
  };

  var submit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await searchAPI.search(search.current.value, user.token);
      result.status === true
        ? setResponse({ user: result.message })
        : setResponse({
            message: result.message.data.message,
            status: false,
          });
    } catch (er) {
      setResponse({ message: er.message, status: false });
    }

    setIsLoading(false);
  };

  return (
    <Container actived={activing}>
      <Form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <TextField
          fullWidth
          required
          inputProps={({ maxLength: 30 }, { ref: search })}
          size="small"
          label="User"
        />
        <LoadingButton
          fullWidth
          loading={isLoading}
          type="submit"
          variant="contained"
          style={{ marginTop: "0.5rem" }}
        >
          search
        </LoadingButton>
      </Form>
      {response.status !== "" && response.status !== false ? (
        <User person={response.user} handleRated={handleRated} />
      ) : (
        response.status !== "" && (
          <Alert
            variant="filled"
            severity="error"
            style={{
              marginTop: "1rem",
              width: "100%",
            }}
          >
            {response.message}
          </Alert>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  right: ${(props) => (props.actived ? "0" : "5rem")};

  width: 100%;
  height: 100%;
  margin: 1rem 0;
  border-radius: 10px;
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;
  overflow: hidden;
`;

const Form = styled.form`
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  background-color: white;
`;
