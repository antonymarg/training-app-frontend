import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PublicPage = () => {
  return (
    <div className="App">
      <div className="container">Public</div>
      <Button>
        <Link to="/login">Login</Link>
      </Button>
      <Button>
        <Link to="/signup">Signup</Link>
      </Button>
    </div>
  );
};

export default PublicPage;
