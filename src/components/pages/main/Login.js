//react
import { useEffect, useState } from "react";

//styles
import styled from "styled-components";
import { Button, Alert, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//redux and rtk
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../../features/user/userSlice";
import { useAuthMutation } from "../../../app/api/user.api";
import { useAuth } from "../../../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    if (username.length === 0 || password.length === 0) {
      setError({
        message: "Please enter a username and password",
        error: "true",
      });
      setIsLoading(false);
    }

    const { data, error } = await auth({ username, password });

    if (typeof error !== "undefined")
      if (error.status !== 200)
        setError({
          message: error.data.message,
          error: "true",
        });

    if (typeof data !== "undefined") {
      if (data.ok) {
        dispatch(
          setUser({
            username: data.user.username,
            rating: data.user.rating,
            bio: data.user.bio,
            song: data.user.song,
            token: data.token,
          })
        );
        navigate("/home");
      }

      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <Container actived={activing}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Typography variant="h5">Login</Typography>
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
          required
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
          required
          inputProps={{ maxLength: 32 }}
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          style={{
            marginTop: "1rem",
          }}
          loading={isLoading}
        >
          Login
        </LoadingButton>
        {user.name.length > 0 && (
          <Link to="/home">
            <Button
              fullWidth
              color="success"
              variant="contained"
              style={{
                marginTop: "1rem",
              }}
            >
              Continue as {user.name}
            </Button>
          </Link>
        )}
      </form>
      <div>
        {error && (
          <Alert
            variant="filled"
            severity="error"
            style={{
              marginTop: "1rem",
            }}
          >
            {error.message}
          </Alert>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  left: ${(props) => (props.actived ? "0" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};

  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  transition: all ease-out 100ms;

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.7rem;
  }
`;
