import { useState } from "react";
import { TextField, Button, Typography, Select, MenuItem } from "@mui/material";

const Login = ({ setUserType }: any) => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [userType, setUserTypeLocally] = useState<String>();

  const onLoginClick = () => {
    //validate form
    setUserType(userType);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        gap: "20px",
      }}
    >
      <div>
        <Typography variant="h2">Login</Typography>
        <hr />
      </div>
      <TextField
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={(v) => setEmail(v.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(v) => setPassword(v.target.value)}
      />
      <Select
        id="userRole"
        value={userType}
        label="Login as"
        onChange={(v) => setUserTypeLocally(v.target.value)}
      >
        <MenuItem value="participant">Participant</MenuItem>
        <MenuItem value="trainer">Trainer</MenuItem>
      </Select>
      <Button
        variant="contained"
        size="large"
        style={{ borderRadius: "50px", alignSelf: "center" }}
        onClick={onLoginClick}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
