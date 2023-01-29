import React, { useContext,useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import {useForm} from "react-hook-form"
import axios from "axios";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { AuthContext } from '../../Context/AuthContext';


function AdminLogin() {

    const { loginAdmin } = useContext(AuthContext);
    const theme = createTheme()

     const {
       register,
       handleSubmit,
       watch,
       formState: { errors },
     } = useForm();
     
     
    const [email,setEmail] = useState('')
    const[password, setPassword] = useState('')
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Welcome Admin
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((e) => loginAdmin(e))}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                {...register("password", { required: true })}
                id="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AdminLogin