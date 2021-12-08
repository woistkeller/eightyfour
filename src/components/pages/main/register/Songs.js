import styled from "styled-components";

import Song from "./Song";

export default function Songs({ songs, propsSong, propsClose }) {

  return (
    <Container>
      <SongList>
        {songs.map((song, key) => {
          return (
            <Song
              key={key}
              song={song}
              propsSong={propsSong}
              propsClose={propsClose}
            />
          );
        })}
      </SongList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
  display: none;
}
`;
