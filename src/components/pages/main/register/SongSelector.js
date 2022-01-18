import { useState, useRef } from "react";

import styled from "styled-components";

import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import spotifyAPI from "../../../../api/spotify.api.js";

import Songs from "./Songs";

export default function SongSelector({ open, handleSong }) {
  const search = useRef();
  const [songs, setSongs] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const temp = await spotifyAPI.getSpotifyContent(search.current.value);
    setSongs(temp);
    setIsLoading(false);
  };

  return (
    <Container open={open}>
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
          variant="contained"
          loading={isLoading}
          type="submit"
          color="primary"
        >
          search
        </LoadingButton>
      </form>
      {typeof songs !== "undefined" ? (
        <Songs songs={songs} handleSong={handleSong} />
      ) : null}

      <Button
        fullWidth
  
        variant="outlined"
        style={{
          background: "#141414",
          color: "white",
        }}
        onClick={() => {
          handleSong();
        }}
      >
        close
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${(props) => (!props.open ? "40rem" : "-1rem")};
  opacity: ${(props) => (!props.open ? "0" : "1")};
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  z-index: 56;
  transition: all ease-out 150ms;
`;
