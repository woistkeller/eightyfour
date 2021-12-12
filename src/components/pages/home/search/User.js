import { useState } from "react";

import styled from "styled-components";

import { Rating, Button } from "@mui/material";

import Song from "../Song";

import searchAPI from "../../../../api/search.api";

import { useAuth } from "../../../../hooks/useAuth";

export default function User({ user }) {
  const [rating, setRating] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ status: false });

  const loggedUser = useAuth().user;

  function handleChange(e, newRating) {
    setRating(newRating);
  }

  var handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await searchAPI.rating(
        rating,
        user._id,
        loggedUser.token
      );
      if (response.status === true)
        setResponse({ message: response.message, status: true });
      else setResponse({ message: "users hasn't found", status: false });
    } catch (er) {
      setResponse({ message: "an error occur, sorry", status: false });
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <div>
        <FirstLine>
          {user.username}
          <div>
            <Rating
              name="read-only"
              value={user.rating}
              precision={0.1}
              readOnly
            />
          </div>
        </FirstLine>
        <Bio>{user.bio}</Bio>
      </div>
      {user.userRating.alreadyRated || response.status ? (
        <Card>
          Rate User
          <Rating
            name="read-only"
            value={user.userRating.rating}
            precision={0.1}
            readOnly
            value={
              user.userRating.alreadyRated ? user.userRating.rating : rating
            }
          />
          <Button margin="normal" disabled size="small" variant="contained">
            User rated
          </Button>
        </Card>
      ) : (
        <Card>
          Rate User
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Rating
              value={rating}
              onChange={(e, newRating) => handleChange(e, newRating)}
            />
            <Button
              type="submit"
              margin="normal"
              size="small"
              variant="contained"
            >
              Rate
            </Button>
          </form>
        </Card>
      )}
      {typeof user.song.title !== "undefined" && <Song song={user.song}></Song>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* background: linear-gradient(180deg, #5834eb, #5146f0); */
  background-color: white;
  font-weight: bolder;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.5rem;
  }
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  width: 100%;
  > * {
    margin: 0.5rem 0;
  }
`;

const Bio = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: justify;
  background-color: #cfcfcf;
  border-radius: 10px;
`;
