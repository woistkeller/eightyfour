import React, { useState } from "react";

import styled from "styled-components";

import {
  Button,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";

import { IoLogOutOutline } from "react-icons/io5";

import User from "../components/pages/home/User";
import Search from "../components/pages/home/Search";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { unSetUser } from "../features/user/userSlice";

import { BsSearch, BsFillPersonFill } from "react-icons/bs";

export default function Home() {
  const [activeScreen, setActiveScree] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //activeScreen 0 = search; activeScreen 1 = user;

  function handleChange(e, newScreen) {
    setActiveScree(newScreen);
  }

  function handleLogout() {
    dispatch(unSetUser());
    navigate("/");
  }

  return (
    <Container>
      <Authenticated>
        <Button
          fullWidth
          variant="contained"
          size="small"
          startIcon={<IoLogOutOutline color="black" />}
          onClick={handleLogout}
          style={{
            backgroundColor: "#fc7272",
            color: "#141414",
          }}
        >
          {" "}
          Logout
        </Button>
        {activeScreen === 0 && <Search />}
        {activeScreen === 1 && <User />}
        <BottomNavigation
          style={{ width: "100%", height: "2.5rem", borderRadius: "5px" }}
          showLabels
          value={activeScreen}
          onChange={(event, newScreen) => {
            handleChange(event, newScreen);
          }}
        >
          <BottomNavigationAction icon={<BsSearch color="black" />} />
          <BottomNavigationAction icon={<BsFillPersonFill color="black" />} />
        </BottomNavigation>
      </Authenticated>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Authenticated = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 80%;
  width: 100%;
  max-width: 500px;
  background: linear-gradient(180deg, #5834eb, #5146f0);
  border-radius: 15px;
  padding: 1rem;
`;
