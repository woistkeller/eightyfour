//utilities
import { useState } from "react";

//styles
import styled from "styled-components";
import {
  Button,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";

//icons
import { IoLogOutOutline } from "react-icons/io5";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";

//components
import User from "../components/pages/home/User";
import Search from "../components/pages/home/Search";

//redux stuff
import { useDispatch } from "react-redux";
import { unSetUser } from "../features/user/userSlice";

//router
import { useNavigate } from "react-router";

export default function Home() {
  const [activeScreen, setActiveScree] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //activeScreen 0 = search; activeScreen 1 = user;

  return (
    <Container>
      <Button
        fullWidth
        variant="contained"
        startIcon={<IoLogOutOutline />}
        onClick={() => {
          dispatch(unSetUser());
          navigate("/");
        }}
        color="error"
      >
        Logout
      </Button>
      {activeScreen === 0 && <Search />}
      {activeScreen === 1 && <User />}
      <BottomNavigation
        style={{ width: "100%", height: "2.5rem", borderRadius: "5px" }}
        value={activeScreen}
        showLabels
        onChange={(event, newScreen) => {
          setActiveScree(newScreen);
        }}
      >
        <BottomNavigationAction icon={<BsSearch color="black" />} />
        <BottomNavigationAction icon={<BsFillPersonFill color="black" />} />
      </BottomNavigation>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  height: 90vh;
  width: 100%;
  max-width: 500px;
  padding: 1rem;

  background: linear-gradient(180deg, #5834eb, #5146f0);
  border-radius: 15px;

  @media (max-width: 530px) {
    height: 100%;
    border-radius: 0;
    padding: 0.7rem;
  }
`;
