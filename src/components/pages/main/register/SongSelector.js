//utilities
import { useState, useRef } from "react";

//styles
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//api
import spotifyAPI from "../../../../api/spotify.api.js";

//components
import Songs from "./Songs";

export default function SongSelector({ open, handleSong }) {
  const search = useRef();
  const [songs, setSongs] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await spotifyAPI.getSpotifyContent(search.current.value);
      setSongs(result);
    } catch (er) {
      setSongs("error");
    }

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
          style={{ marginTop: "1rem" }}
        >
          search
        </LoadingButton>
      </form>
      {typeof songs !== "undefined" && songs !== "error" ? (
        <Songs songs={songs} handleSong={handleSong} />
      ) : (
        songs === "error" && "An unexpected error occurred"
      )}

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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: ${(props) => (!props.open ? "40rem" : "-1rem")};
  opacity: ${(props) => (!props.open ? "0" : "1")};

  width: 100%;
  height: 100%;
  background-color: white;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 10px;
  z-index: 56;
  transition: all ease-out 150ms;
`;
