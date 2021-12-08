import { useEffect, useState } from "react";

import styled from "styled-components";

import { Button, Alert,TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { setUser } from "../../../features/user/userSlice";
import { useAuthMutation } from "../../../app/api/user.api";
import { useAuth } from "../../../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activing, setActiving] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth] = useAuthMutation();

  const user = useAuth().user;

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  var handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth({ username, password });
      console.log(response);
      if (response.data.ok) {
        console.log(response.data);
        dispatch(
          setUser({
            username: response.data.user.username,
            rating: response.data.user.rating,
            bio: response.data.user.bio,
            song: response.data.user.song,
            token: response.data.token,
          })
        );
        navigate("/home");
      } else {
        setError({ message: response.error.data.message, error: true });
      }
    } catch (er) {
      setError({ data: "a general error occurs", error: true });
    }
  };

  return (
    <Container actived={activing}>
      {user.name.length > 0 && (
        <Link to="/home">
          <Button size="small" fullWidth variant="contained">
            Progress as {user.name}
          </Button>
        </Link>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {error && (
          <Alert
            variant="filled"
            severity="error"
            style={{
              margin: "0.2rem 0",
              color: "#141414",
              backgroundColor: "#ff4f4f",
            }}
          >
            {error.message}
          </Alert>
        )}
        <TextField
          fullWidth
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          variant="outlined"
          size="small"
          label="password"
          type="password"
          margin="dense"
          inputProps={{ maxLength: 32 }}
        />
        <Button
          fullWidth
          type="submit"
          size="small"
          variant="outlined"
          style={{
            background: "linear-gradient(180deg, #5834eb, #5146f0)",
            color: "white",
          }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  left: ${(props) => (props.actived ? "0" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;

  button {
    margin: 0.4rem 0;
  }
`;
