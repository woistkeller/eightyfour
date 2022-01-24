//utilities
import { useState } from "react";

//styles
import styled from "styled-components";
import { Rating, Button, Alert } from "@mui/material";

//apis
import searchAPI from "../../../../api/search.api";

//reduxstuffF
import { useAuth } from "../../../../hooks/useAuth";

//components
import Song from "../Song";

export default function User({ person, handleRated }) {
  console.log(person);
  const [rating, setRating] = useState(3);
  const [response, setResponse] = useState({ status: false });

  const user = useAuth().user;

  var handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await searchAPI.rating(rating, person._id, user.token);
      result.status === true
        ? setResponse({ status: true })
        : setResponse({ message: "An error occurred", status: false });
    } catch (er) {
      setResponse({ message: "An error occurred", status: false });
    }
  };

  return (
    <Container>
      <div>
        <Profile>
          <FirstLine>
            {person.username}
            <Rating
              name="read-only"
              value={person.rating}
              precision={0.1}
              readOnly
            />
          </FirstLine>
          <Bio>{person.bio}</Bio>
        </Profile>

        {person.userRating.alreadyRated ? (
          <Card>
            Rate User
            <Rating
              name="read-only"
              precision={0.1}
              readOnly
              style={{ marginTop: "1rem" }}
              value={
                person.userRating.alreadyRated
                  ? person.userRating.rating
                  : rating
              }
            />
            <Button disabled variant="contained" style={{ marginTop: "1rem" }}>
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
            >
              <Rating
                value={rating}
                onChange={(e, newRating) => setRating(newRating)}
                style={{ marginTop: "1rem" }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleRated}
                style={{ marginTop: "1rem" }}
              >
                Rate user
              </Button>
            </form>
          </Card>
        )}
      </div>
      <div>
        {typeof person.song !== "undefined" && <Song song={person.song} />}
      </div>
      {response.status === false && (
        <Alert
          fullWidth
          variant="filled"
          severity="error"
          style={{
            marginTop: "1rem",
            width: "100%",
          }}
        >
          {response.message}
        </Alert>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  border-radius: 10px;
  background-color: white;
  font-weight: bold;

  @media (max-width: 530px) {
    height: 100%;
    padding: 0.5rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cfcfcf;
  border-radius: 10px;
  margin: 1rem 0;
  padding: 1rem;
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
