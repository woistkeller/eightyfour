//router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";

//styles
import styled from "styled-components";

//components
import Main from "./pages/Main";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route exact path="/home" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
