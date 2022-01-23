//utilities
import { useEffect, useState } from "react";

//syles
import styled from "styled-components";
import { Rating } from "@mui/material";

//api
import searchAPI from "../../../api/search.api";

//components
import Song from "./Song";

//redux stuff
import { useDispatch } from "react-redux";
import { updateUserRating } from "../../../features/user/userSlice";
import { useAuth } from "../../../hooks/useAuth";

export default function User() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const [activing, setActiving] = useState(false);

  const user = useAuth().user;

  useEffect(() => {

    //fetching user again to request and update current rating
    var fetching = async () => {
      const rating = await searchAPI.search(user.name, user.token);
      dispatch(updateUserRating(rating.message.rating));
    };

    fetching();

    setTimeout(() => {
      setActiving(true);
    }, 20);
  });

  return (
    <Container actived={activing}>
      <Profile>
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
      </Profile>

      {typeof user.song.title !== "undefined" && <Song song={user.song} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;

  top: ${(props) => (props.actived ? "0" : "5rem")};

  width: 100%;
  height: 100%;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  transition: all ease-out 100ms;

  opacity: ${(props) => (props.actived ? "1" : "0")};

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.5rem;
  }
`;

const Profile = styled.div`
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
  margin: 0.6rem 0;
  text-align: justify;
  background-color: #cfcfcf;
  border-radius: 10px;
`;
