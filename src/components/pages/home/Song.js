//ux
import { useRef, useState, useEffect } from "react";

//styles
import styled from "styled-components";
import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

//icons
import { HiVolumeUp } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoMdAlert } from "react-icons/io";

//components
import Volume from "./Volume";

//looking for the progress bar? thatF is in the futher

export default function Song({ song }) {
  const player = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [percentage, setPercentage] = useState();
  const [intervalId, setIntervalId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  var handleVolume = (volume) => {
    player.current.volume = volume;
  };

  function handleProgress() {
    if (isPlaying === true) {
      var intervalIdtemp = setInterval(() => {
        try {
          const percentageTemp = (player.current.currentTime / 30) * 100;
          if (percentageTemp > 100) {
            player.current.pause();
            player.current.currentTime = 0;
            setIsPlaying(false);
            setPercentage(0);
          }
          setPercentage(percentageTemp);
        } catch (e) {
          clearInterval(intervalId);
        }
      }, 1000);
      setIntervalId(intervalIdtemp);
    } else clearInterval(intervalId);
  }

  function handlePlayer() {
    if (isPlaying) {
      handleProgress();
      player.current.currentTime = 0;
      player.current.pause();
      setIsPlaying(false);
      setPercentage(0);
    } else {
      player.current.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    player.current.load();
    player.current.currentTime = 0;
    player.current.volume = 0.5;
    player.current.pause();
    setIsPlaying(false);
    setPercentage(0);
  }, [song]);

  return (
    <Container>
      <audio ref={player}>
        <source src={song.preview} />
      </audio>
      <img alt="" src={song.cover} height="40" width="40" />
      <Info>
        <Title>
          <Typography noWrap>{song.title}</Typography>
        </Title>
        <Artist>
          <Typography noWrap>{song.artist}</Typography>
        </Artist>
      </Info>
      <Controller>
        {typeof song.preview !== "undefined" && (
          <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
            <HiVolumeUp color="black" />
          </IconButton>
        )}
        {isOpen && <Volume handleVolume={handleVolume} />}
        {typeof song.preview === "undefined" ? (
          <Tooltip title="some previews are not available">
            <IoMdAlert color="red" />
          </Tooltip>
        ) : (
          <IconButton size="small" onClick={handlePlayer}>
            <CircularProgressWithLabel
              isPlaying={isPlaying}
              value={percentage}
            />
          </IconButton>
        )}
      </Controller>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.5rem;
  background-color: #dedede;
  border-radius: 10px;
  width: 100%;
`;

const Info = styled.div`
  text-indent: 0.5rem;
  width: 100%;
  text-align: left;
  overflow: hidden;
`;

const Title = styled.div``;

const Artist = styled.div`
  color: grey;
`;

const Controller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CircularProgressWithLabel({ isPlaying, value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        style={{ padding: "10px" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isPlaying ? (
          <BsFillPauseFill color="black" />
        ) : (
          <BsFillPlayFill color="black" />
        )}
      </Box>
    </Box>
  );
}
