import { useDispatch } from "react-redux";
import { logout } from "../Store/userSlice";

const ParticipantPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());
  return (
    <div className="App">
      <div className="container">Participant</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default ParticipantPage;
