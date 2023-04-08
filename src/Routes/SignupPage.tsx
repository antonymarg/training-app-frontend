import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { UserRole } from "../types";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const addUserData = async (userInfo: any) => {
  setDoc(doc(db, "users", userInfo.userId), userInfo)
    .then((e) => e)
    .catch((e) => console.log(e));
};

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("participant");

  const onSignUp = async () => {
    let user = { name, email, role };
    registerUser({ email, password })
      .then((e) => addUserData({ userId: e.user.uid, ...user }))
      .then((e) => redirect("/login"))
      .catch((e) => console.log(e));
  };
  return (
    <form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "20px",
        }}
      >
        <div>
          <Typography variant="h2">Signup</Typography>
          <hr />
        </div>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(v) => setName(v.target.value)}
        />
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
        <InputLabel id="role-label">User role</InputLabel>
        <Select
          id="userRole"
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <MenuItem value={"participant"}>Participant</MenuItem>
          <MenuItem value={"trainer"}>Trainer</MenuItem>
        </Select>
        <Button
          variant="contained"
          size="large"
          style={{ borderRadius: "50px", alignSelf: "center" }}
          onClick={onSignUp}
        >
          Sign now!
        </Button>
      </div>
    </form>
  );
};

export default SignupPage;
