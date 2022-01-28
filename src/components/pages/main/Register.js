//utilities
import { useState, useEffect } from "react";

//styles
import styled from "styled-components";
import { Button, Alert, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//icons
import { BsSpotify } from "react-icons/bs";

//api
import registerAPI from "../../../api/register.api.js";

//components
import SongSelector from "./register/SongSelector";

export default function Register() {
  const [surePassword, setSurepassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState(false);

  const [song, setSong] = useState();
  const [songSelector, setSongSelector] = useState(false);

  const [activing, setActiving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  //select and close function. Pass no value to just close, without really choosing something
  var handleSong = async (e) => {
    setSong(e);
    setSongSelector(false);
  };

  var submit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await registerAPI.register(
        username,
        password,
        bio,
        song
      );
      response.status === true
        ? setResponse({ message: "successfully registered", status: true })
        : setResponse({ message: response.message, status: false });
    } catch (er) {
      setResponse({ message: "An error occurred", status: false });
    }

    setIsloading(false);
  };

  return (
    <Container actived={activing}>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <Typography variant="h5">Register</Typography>
        <TextField
          fullWidth
          required
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase());
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
                bio.length - 120 === 0 ? { color: "red" } : { color: "black" }
              }
            >{`you have ${
              120 - bio.length !== 0 ? 120 - bio.length : "no"
            } chacteres left`}</b>
          }
        />
        <Button
          fullWidth
          style={{ backgroundColor: "#1DB954", marginTop: "1rem" }}
          startIcon={<BsSpotify />}
          onClick={() => {
            setSongSelector(!songSelector);
          }}
        >
          {typeof song !== "undefined"
            ? song.title
            : "Pick your favourite song"}
        </Button>
        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          style={{ marginTop: "1rem" }}
          loading={isLoading}
        >
          Register
        </LoadingButton>
      </form>
      <div>
        {response && (
          <Alert
            variant="filled"
            severity={response.status ? "success" : "error"}
            style={{
              marginTop: "1rem",
            }}
          >
            {response.message}
          </Alert>
        )}
      </div>
      {songSelector && (
        <SongSelector open={songSelector} handleSong={handleSong} />
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
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;

  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.7rem;
  }
`;
