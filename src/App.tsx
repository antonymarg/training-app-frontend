import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "./Routes";
import { useSelector } from "react-redux";
import { getUser } from "./Store/userSlice";

function App() {
  const user = useSelector(getUser);
  return (
    <div className="container">
      <p>
        Hey {user.profile?.name ?? "stranger"}! Your current status is{" "}
        <b>{user.role ?? "new user"}.</b>
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
