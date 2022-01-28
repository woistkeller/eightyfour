//utilities
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
import { AiFillHeart } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";

//components
import Volume from "./Volume";

export default function Song({ song, handleSong }) {
  const player = useRef();
  const [isPlaying, setIsplaying] = useState(false);
  const [percentage, setPercentage] = useState();
  const [isOpen, setIsopen] = useState(false);

  var handleVolume = (volume) => {
    console.log(volume);
    player.current.volume = volume;
  };

  useEffect(() => {
    setIsplaying(false);
    setPercentage(0);
    setIsopen(false);
  }, [song]);

  useEffect(() => {
    var interval;

    interval = setInterval(() => {
      try {
        const percentageTemp = (player.current.currentTime / 30) * 100;
        console.log(percentageTemp);
        if (percentageTemp > 100) {
          player.current.pause();
          player.current.currentTime = 0;
          setIsplaying(false);
          setPercentage(0);
          clearInterval(interval);
        }
        setPercentage(percentageTemp);
      } catch (e) {
        clearInterval(interval);
      }
    }, 1000);
  }, [isPlaying]);

  var handlePlayer = () => {
    if (isPlaying) {
      player.current.currentTime = 0;
      player.current.pause();
      setIsplaying(false);
      setPercentage(0);
    } else {
      setIsplaying(true);
      player.current.play();
    }
  };

  useEffect(() => {
    player.current.load();
    player.current.currentTime = 0;
    player.current.pause();
    setIsplaying(false);
  }, [song]);

  return (
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
        {song.preview_url !== null && (
          <IconButton size="small" onClick={() => setIsopen(!isOpen)}>
            <HiVolumeUp color="black" />
          </IconButton>
        )}
        <Volume handleVolume={handleVolume} isOpen={isOpen} />
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
            handleSong({
              title: song.name,
              artist: song.artists[0].name,
              preview: song.preview_url,
              cover: song.album.images[1].url,
            });
          }}
        >
          <AiFillHeart color="red" />
        </IconButton>
      </Controller>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.5rem;
  background-color: #dedede;
  border-radius: 10px;
  width: 100%;
  margin: 0.5rem 0;
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
