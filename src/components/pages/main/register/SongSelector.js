import { useState, useRef } from "react";

import styled from "styled-components";

import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import spotifyAPI from "../../../../api/spotify.api.js";

import Songs from "./Songs";

export default function SongSelector({ propsClose, status, propsSong }) {
  const search = useRef();
  const [songs, setSongs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await spotifyAPI.getSpotifyContent(search.current.value);
    setSongs(results);
    setIsLoading(false);
  };

  return (
    <Container status={status}>
      <form
        style={{ width: "100%" }}
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
          label="track, album or artist"
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
      {songs.length > 0 ? (
        <Songs songs={songs} propsSong={propsSong} propsClose={propsClose} />
      ) : null}

      <Button
        fullWidth
        size="small"
        variant="outlined"
        style={{
          background: "#141414",
          color: "white",
        }}
        onClick={propsClose}
      >
        close
      </Button>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: ${(props) => (!props.status ? "40rem" : "-1rem")};
  opacity: ${(props) => (!props.status ? "0" : "1")};
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  z-index: 1;
  transition: all ease-out 150ms;
`;
