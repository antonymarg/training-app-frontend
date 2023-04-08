import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "./Routes";
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
