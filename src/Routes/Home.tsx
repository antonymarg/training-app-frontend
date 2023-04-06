import Login from "./Login";
import Participant from "./Participant";
import Trainer from "./Trainer";

const Home = ({
  userType,
  setUserType,
}: {
  userType: string;
  setUserType: (type: string) => void;
}) => {
  const logout = () => setUserType("public");
  if (userType === "participant") return <Participant logout={logout} />;
  if (userType === "trainer") return <Trainer logout={logout} />;
  return <Login setUserType={setUserType} logout={logout} />;
};

export default Home;
