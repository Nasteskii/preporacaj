import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    role: "ROLE_USER",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event: any) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSuccess("");
      setError("Лозинките не се совпаѓаат!");
      return;
    }

    const registerProfileDTO = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      surname: formData.surname,
      role: formData.role,
    };

    try {
      await authService.signup(registerProfileDTO);

      setError("");
      setSuccess("Успешно се регистриравте!");
      setTimeout(function () {
        navigate("/home");
      }, 100);
    } catch (error) {
      setSuccess("");
      setError("Неуспешна регистрација!");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-silver">
      <Card className="w-80 sm:w-96">
        <CardContent>
          <Typography
            variant="h4"
            color="secondary"
            className="text-center !mb-4"
          >
            <Link to="/home" className="text-purple hover:text-purple">
              Препорачај
            </Link>
          </Typography>
          <form onSubmit={handleSignup} className="space-y-4">
            <TextField
              label="Емаил"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              color="secondary"
            />
            <TextField
              label="Лозинка"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              color="secondary"
            />
            <TextField
              label="Повторете ја лозинката"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              color="secondary"
            />
            <TextField
              label="Име"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              color="secondary"
            />
            <TextField
              label="Презиме"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              fullWidth
              color="secondary"
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Регистрирај се
            </Button>
          </form>
          <Typography variant="body1" className="text-center !mt-2">
            Веќе сте регистрирани? <Link to="/login">Најави се</Link>
          </Typography>
        </CardContent>
      </Card>
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" variant="filled">
          {success}
        </Alert>
      )}
    </div>
  );
}

export default SignupComponent;
