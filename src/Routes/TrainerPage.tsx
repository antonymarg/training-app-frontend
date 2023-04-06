import { useDispatch } from "react-redux";
import { logout } from "../userSlice";

const TrainerPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());
  return (
    <div className="App">
      <div className="container">Trainer</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default TrainerPage;
