import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Routes";

const USER_TYPES = {
  PUBLIC: "public",
  TRAINER: "trainer",
  PARTICIPANT: "participant",
};

function App() {
  const [userType, setUserType] = useState(USER_TYPES.PUBLIC);

  return (
    <div className="container">
      <p>
        Your current status is <b>{userType}</b>
      </p>
      <Routes>
        <Route
          path="/"
          element={<Home userType={userType} setUserType={setUserType} />}
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
