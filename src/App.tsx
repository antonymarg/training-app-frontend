import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Routes";
import { useSelector } from "react-redux";
import { getUserRole } from "./userSlice";

function App() {
  const userType = useSelector(getUserRole);
  return (
    <div className="container">
      <p>
        Your current status is <b>{userType}</b>
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
