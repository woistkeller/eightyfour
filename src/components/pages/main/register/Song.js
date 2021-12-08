import { useRef, useState, useEffect } from "react";

import styled from "styled-components";

import Volume from "./Volume";

import { HiVolumeUp } from "react-icons/hi";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";

import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

export default function Song({ song, propsSong, propsClose }) {
  const player = useRef();
  const [isPlaying, setIsplaying] = useState(false);
  const [percentage, setPercentage] = useState();
  const [intervalId, setIntervalId] = useState();
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    setIsplaying(false)
    setPercentage(0)
    setIsopen(false)
    player.current.volume = 0.5;
  }, [song])

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

  useEffect(() => {
    handleProgress();
  }, [isPlaying]);

  function handlePlayer() {
    player.current.volume = 0.5;

    if (isPlaying) {
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
    player.current.pause();
    setIsplaying(false);
  }, [song]);

  return (
    <>
      <Container>
        <audio ref={player}>
          <source src={song.preview_url} />
        </audio>
        <img alt="" src={song.album.images[1].url} height="40" width="40" />
        <Info>
          <Title>
            <Typography noWrap>{song.name}</Typography>
          </Title>
          <Artist>
            <Typography noWrap>{song.artists[0].name}</Typography>
          </Artist>
        </Info>
        <Controller>
          {song.preview_url !== null ? (
            <IconButton size="small" onClick={handleOpen}>
              <HiVolumeUp color="black" />
            </IconButton>
          ) : null}
          {isOpen && <Volume propsVolume={handleVolume} />}
          {song.preview_url == null ? (
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
          <IconButton
            size="small"
            onClick={() => {
              propsSong({
                title: song.name,
                artist: song.artists[0].name,
                preview: song.preview_url,
                cover: song.album.images[1].url,
              });
              player.current.pause();
              setIsplaying(false);
              propsClose();
            }}
          >
            <AiFillHeart color="red" />
          </IconButton>
        </Controller>
      </Container>
    </>
  );
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.01rem 0.8rem;
  overflow: hidden;
  background-color: #dedede;
  border-radius: 10px;
  margin: 0.5rem 0;
`;

const Info = styled.div`
  text-indent: 0.7rem;
  width: 70%;
  text-align: left;
  overflow: hidden;
`;

const Title = styled.div`
  font-weight: bolder;
  overflow: hidden;
`;

const Artist = styled.div`
  font-weight: light;
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
