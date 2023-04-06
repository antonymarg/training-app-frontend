import { useState } from "react";
import { Alert, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, setUserRole } from "../userSlice";

const ACCEPTED_EMAIL = ["trainer@app.com", "participant@app.com"];

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const onLoginClick = () => {
    setAlertVisible(false);
    if (!ACCEPTED_EMAIL.includes(email) || password !== "1234")
      return setAlertVisible(true);
    let userType = email.split("@")[0];
    dispatch(login());
    dispatch(setUserRole(userType));
  };

  return (
    <>
      {isAlertVisible && <Alert severity="error">Wrong user data!</Alert>}
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
          <Typography variant="body1">
            For trainer use the email <b>trainer@app.com</b>. For participant
            use the email <b>participant@app.com</b>. Password is <b>1234</b>.
          </Typography>
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
        <Button
          variant="contained"
          size="large"
          style={{ borderRadius: "50px", alignSelf: "center" }}
          onClick={onLoginClick}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
