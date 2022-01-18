//ux
import { useState } from "react";

//styles
import styled from "styled-components";
import { Stack, Slider } from "@mui/material";

export default function Volume({ handleVolume }) {
  const [volume, setVolume] = useState(50);
  return (
    <Container>
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
          onChange={(value, newValue) => {
            setVolume(newValue);
            handleVolume(newValue / 100);
          }}
        />
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  width: 7rem;
  margin: 0 0.5rem;
`;
