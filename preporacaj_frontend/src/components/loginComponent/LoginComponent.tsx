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

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const loginProfileDTO = {
      email: event.target.email?.value,
      password: event.target.password?.value,
    };

    try {
      await authService.login(loginProfileDTO);

      setError("");
      setSuccess("Успешно се најавивте!");
      setTimeout(function () {
        navigate("/home");
      }, 100);
    } catch (error) {
      setSuccess("");
      setError("Неуспешна најава!");
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
            Препорачај
          </Typography>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Најави се
            </Button>
          </form>
          <Typography variant="body1" className="text-center !mt-2">
            Не сте регистрирани?{" "}
            <Link to="/signup" color="secondary">
              Регистрирај се
            </Link>
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

export default LoginComponent;
