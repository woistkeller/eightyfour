import { useRef, useState, useEffect } from "react";

import styled from "styled-components";

import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import { HiVolumeUp } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoMdAlert } from "react-icons/io";

import Volume from "./Volume";

export default function Song({ song }) {
  const player = useRef();
  const [isPlaying, setIsplaying] = useState(false);
  const [percentage, setPercentage] = useState();
  const [intervalId, setIntervalId] = useState();
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    player.current.volume = 0.5;
  });

  function handleOpen() {
    setIsopen(!isOpen);
  }

  function handleVolume(volume) {
    player.current.volume = volume;
  }

  function handleProgress() {
    if (isPlaying === true) {
      var intervalIdtemp = setInterval(() => {
        try {
          const percentageTemp = (player.current.currentTime / 30) * 100;
          if (percentageTemp > 100) {
            player.current.pause();
            player.current.currentTime = 0;
            setIsplaying(false);
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
    player.current.volume = 0.1;

    if (isPlaying) {
      handleProgress();
      player.current.currentTime = 0;
      player.current.pause();
      setIsplaying(false);
      setPercentage(0);
    } else {
      player.current.play();
      setIsplaying(true);
    }
  }

  useEffect(() => {
    player.current.load();
    player.current.currentTime = 0;
    player.current.volume = 0.5;
    player.current.pause();
    setIsplaying(false);
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
        {song.preview !== null ? (
          <IconButton size="small" onClick={handleOpen}>
            <HiVolumeUp color="black" />
          </IconButton>
        ) : null}
        {isOpen && <Volume propsVolume={handleVolume} />}
        {song.preview == null ? (
          <Tooltip title="some previews are not available">
            <IconButton>
              <IoMdAlert color="red" />
            </IconButton>
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.8rem;
  margin-top: 1rem;
  overflow: hidden;
  background-color: #dedede;
  border-radius: 10px;
  width: 100%;
  font-weight: bolder;
`;

const Info = styled.div`
  text-indent: 0.7rem;
  width: 100%;
  text-align: left;
  overflow: hidden;
`;

const Title = styled.div`
  overflow: hidden;
`;

const Artist = styled.div`
  color: grey;
  overflow: hidden;
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
