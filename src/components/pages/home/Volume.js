import { useState, useEffect } from "react";

import styled from "styled-components";

import { Stack, Slider } from "@mui/material";

export default function Volume({ propsVolume }) {
  const [volume, setVolume] = useState(50);
  const [activing, setActiving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  function handleVolume(e, newVolume) {
    setVolume(newVolume);
    propsVolume(volume / 100);
  }

  return (
    <Container actived={activing}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: "100%" }}
        alignItems="center"
      >
        <Slider
          aria-label="Volume"
          size="small"
          style={{ color: "#5834eb" }}
          value={volume}
          onChange={handleVolume}
        />
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  width: 7rem;
  margin: 0 0.5rem;

  top: ${(props) => (props.actived ? "0m" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;
`;
