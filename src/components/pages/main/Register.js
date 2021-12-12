import { useState, useEffect } from "react";

import styled from "styled-components";

import { Button, Alert, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { BsSpotify } from "react-icons/bs";

import registerAPI from "../../../api/register.api.js";

import SongSelector from "./register/SongSelector";

export default function Register() {
  const [surePassword, setSurepassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState(false);

  const [handleSongSelector, setHandleSongSelector] = useState(false);
  const [handleSong, setHandleSong] = useState(false);

  const [activing, setActiving] = useState(false);

  function closingSongSelector() {
    setHandleSongSelector(false);
  }

  function choosingSong(e) {
    setHandleSong(e);
  }

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await registerAPI.register(
        username,
        password,
        bio,
        handleSong
      );
      if (response.status === true) {
        setResponse({ message: "successful registrered", status: true });
      } else {
        setResponse({ message: response.message, status: false });
      }
    } catch (er) {
      setResponse({ message: "an error occur, sorry", status: false });
    }
    setIsloading(false);
  };

  return (
    <Container actived={activing}>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {response && (
          <Alert
            variant="filled"
            severity={response.status ? "success" : "error"}
            style={{
              margin: "0.2rem 0",
              color: "#141414",
              backgroundColor: `${response.status ? "#1DB954" : "#ff4f4f"}`,
            }}
          >
            {response.message}
          </Alert>
        )}
        <TextField
          fullWidth
          required
          autoComplete="off"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          variant="outlined"
          size="small"
          label="Username"
          margin="dense"
          inputProps={{ maxLength: 12 }}
        />
        <TextField
          fullWidth
          required
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          error={
            password.length !== 0 &&
            (password.length < 8 ||
              password.length > 32 ||
              surePassword !== password)
          }
          variant="outlined"
          size="small"
          label="Password"
          type="password"
          margin="dense"
          helperText={
            password.length < 7 && password.length !== 0
              ? "password must have at least 8 characters"
              : surePassword !== password &&
                "password and confirm password don't match"
          }
          inputProps={{ maxLength: 32 }}
        />
        <TextField
          fullWidth
          required
          autoComplete="off"
          onChange={(e) => {
            setSurepassword(e.target.value);
          }}
          value={surePassword}
          error={
            (password.length !== 0 && password.length < 8) ||
            password.length > 32 ||
            surePassword !== password
          }
          variant="outlined"
          size="small"
          label="Confirm Password"
          type="password"
          margin="dense"
          helperText={
            surePassword !== password &&
            "password and confirm password doesn't match"
          }
          inputProps={{ maxLength: 32 }}
        />
        <TextField
          fullWidth
          autoComplete="off"
          onChange={(e) => {
            setBio(e.target.value);
          }}
          value={bio}
          margin="dense"
          variant="outlined"
          label="Bio"
          minRows={3}
          maxRows={4}
          inputProps={{ maxLength: 120 }}
          multiline
          helperText={
            <b
              style={
                bio.length - 120 === 0
                  ? { color: "orange" }
                  : { color: "black" }
              }
            >{`you have ${
              120 - bio.length !== 0 ? 120 - bio.length : "no"
            } chacteres left`}</b>
          }
        />
        <Button
          fullWidth
          variant="outlined"
          style={{ backgroundColor: "#1DB954", color: "black" }}
          onClick={() => {
            setHandleSongSelector(!handleSongSelector);
          }}
        >
          <BsSpotify />
          {"\u00A0"}
          {handleSong !== false
            ? `${handleSong.title} - ${handleSong.artist}`
            : "pick your favourite song"}
        </Button>
        <LoadingButton
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          loading={isLoading}
        >
          register
        </LoadingButton>
      </form>
      <SongSelector
        status={handleSongSelector}
        propsSong={choosingSong}
        propsClose={closingSongSelector}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.5rem;
  }

  right: ${(props) => (props.actived ? "0" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;

  &:after {
    content: "";
  }

  button {
    margin: 0.4rem 0;
  }
`;
