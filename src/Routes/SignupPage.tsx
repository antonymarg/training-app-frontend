import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { UserRole } from "../types";
import { createUser } from "../userSlice";
import firebase, { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("participant");

  const onSignUp = async () => {
    //validate
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {}
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
