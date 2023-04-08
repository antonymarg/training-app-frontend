import { useState } from "react";
import { Alert, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, setUserRole } from "../userSlice";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { getDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";
import { redirect } from "react-router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const onLoginClick = () => {
    //validate
    signInWithEmailAndPassword(auth, email, password)
      .then((e) => getDoc(doc(db, "users", e.user.uid)))
      .then((e) => dispatch(setUserRole(e.data()?.role)))
      .then((e) => dispatch(login()))
      .then((e) => redirect("/"))
      .catch((e) => setAlertVisible(true));
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
