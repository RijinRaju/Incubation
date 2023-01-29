import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate,Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SignUP() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
  
      console.log(e.firstName)
      axios
        .post(" http://127.0.0.1:8000/signup/", {
          first_name: e.firstName,
          last_name: e.lastName,
          email: e.email,
          password: e.password,
        })
        .then((e) => {
          if(e.status ==  200){
            navigate('/')    
          }
        });
    
  };
  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/business-incubator-abstract-concept_335657-4436.jpg?w=2000)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit((e)=>handleFormSubmit(e))}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      defaultValue={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      {...register("firstName", {
                        required: true,
                      })}
                      autoFocus
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      defaultValue={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      {...register("email", {
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      })}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/" >
                      {"already  have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default SignUP;
