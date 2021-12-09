import { useEffect, useState } from "react";

import styled from "styled-components";
import { Rating } from "@mui/material";

import { useAuth } from "../../../hooks/useAuth";

import Song from "./Song";

export default function Login() {
  const [activing, setActiving] = useState(false);

  const user = useAuth().user;

  useEffect(() => {
    setTimeout(() => {
      setActiving(true);
    }, 20);
  }, []);

  return (
    <Container actived={activing}>
      <User>
        <FirstLine>
          {user.name}
          <Rating
            name="read-only"
            value={user.rating}
            precision={0.1}
            readOnly
          />
        </FirstLine>
        <Bio>{user.bio}</Bio>
      </User>

      {typeof user.song.title !== "undefined" && <Song song={user.song} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  top: ${(props) => (props.actived ? "0" : "5rem")};
  opacity: ${(props) => (props.actived ? "1" : "0")};
  transition: all ease-out 100ms;
`;

const User = styled.div`
  width: 100%;
  font-weight: bold;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Bio = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: justify;
  background-color: #cfcfcf;
  border-radius: 10px;
`;
