import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Alert,
} from "@mui/material";
import { firebase } from "../../Firebase";
import { UserRole } from "../../lib/types";
import { SignUpFormData, SignUpFormErrors } from "./SignupPage.types";
import { useNavigate } from "react-router";

const defaultFormState: SignUpFormData = {
  name: "",
  email: "",
  password: "",
  role: "participant",
};

const SignupPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>(defaultFormState);
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
  }, []);

  const onSignUp = async () => {
    setErrors({});

    if (!formData.email || !formData.password || !formData.name) return;

    const { password, ...newUser } = formData;
    firebase.userModule
      .signUpUserWithEmailAndPassword({
        email: newUser.email,
        password,
      })
      .then(({ user }) => {
        return firebase.userModule.createUserData({
          userId: user.uid,
          ...newUser,
        });
      })
      .then(() => navigate("/login"))
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            setErrors({ emailError: "This email is invalid" });
            break;
          case "auth/weak-password":
            setErrors({ passwordError: "This password is weak" });
            break;
          default:
            setErrors({ genericError: "A sudden error occurred" });
        }
      });
  };
  return (
    <form>
      {errors.genericError && (
        <Alert severity="error">{errors.genericError}</Alert>
      )}
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
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v.target.value })}
          error={Boolean(errors.nameError)}
          helperText={errors.nameError}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v.target.value })}
          error={Boolean(errors.emailError)}
          helperText={errors.emailError}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(v) =>
            setFormData({ ...formData, password: v.target.value })
          }
          error={Boolean(errors.passwordError)}
          helperText={errors.passwordError}
        />
        <InputLabel id="role-label">User role</InputLabel>
        <Select
          id="userRole"
          labelId="role-label"
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value as UserRole })
          }
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
