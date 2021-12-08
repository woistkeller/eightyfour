import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Home from "./pages/Home";

import PrivateRoute from "./pages/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path="/home" element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
