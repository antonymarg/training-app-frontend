import LoginPage from "./LoginPage";
import ParticipantPage from "./ParticipantPage";
import TrainerPage from "./TrainerPage";
import { useSelector } from "react-redux";
import { getUserRole } from "../userSlice";

const HomePage = () => {
  const userType = useSelector(getUserRole);
  if (userType === "participant") return <ParticipantPage />;
  if (userType === "trainer") return <TrainerPage />;
  return <LoginPage />;
};

export default HomePage;
