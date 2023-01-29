import React, { useState, useEffect,useContext } from "react";
import{useNavigate} from 'react-router-dom'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {useForm} from 'react-hook-form'

function Registration() {

  const navigate = useNavigate()
  const [state, setState] = useState({});


  const { register, handleSubmit,  formState: { errors } } = useForm();

  const{user} = useContext(AuthContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  
  const RegisterSubmit = (e) => {
    axios
      .post(" http://127.0.0.1:8000/register/", {
        name: e.name,
        address: e.address,
        city: e.city,
        state: e.state,
        email: e.email,
        phone: e.phone,
        company_name: e.cmp_name,
        describeTeam: e.tm_bg,
        describeProduct: e.cmp_pro, 
        applicant :user.user_id
      })
      .then((e) => {
        console.log(e.data);
        navigate('/home')
      });
  };
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              REGISTER YOUR COMPANY
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((e) => RegisterSubmit(e))}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    defaultValue={state.name}
                    onChange={handleChange}
                    {...register("name", {
                      required: true,
                    })}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="address"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    defaultValue={state.address}
                    onChange={handleChange}
                    {...register("address", {
                      required: true,
                    })}
                  />
                  {errors.address && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    defaultValue={state.city}
                    onChange={handleChange}
                    {...register("city", {
                      required: true,
                    })}
                  />
                  {errors.city && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="state"
                    required
                    fullWidth
                    id="state"
                    label="State"
                    defaultValue={state.state}
                    onChange={handleChange}
                    {...register("state", {
                      required: true,
                    })}
                  />
                  {errors.state && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    defaultValue={state.email}
                    onChange={handleChange}
                    {...register("email", {
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    })}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>Enter valid Email</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    defaultValue={state.phone}
                    onChange={handleChange}
                    {...register("phone", {
                      required: true,
                    })}
                  />
                  {errors.phone && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="cmp_name"
                    label="Company Name"
                    name="cmp_name"
                    defaultValue={state.cmp_name}
                    onChange={handleChange}
                    {...register("cmp_name", {
                      required: true,
                    })}
                  />
                  {errors.cmp_name && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="tm_bg"
                    label="Describe Your Team and Background"
                    name="tm_bg"
                    autoComplete="team and background"
                    defaultValue={state.tm_bg}
                    onChange={handleChange}
                    {...register("tm_bg", {
                      required: true,
                    })}
                  />
                  {errors.tm_bg && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cmp_pro"
                    label="Describe Your Company and Product"
                    id="cmp_pro"
                    autoComplete="company and product"
                    defaultValue={state.cmp_pro}
                    onChange={handleChange}
                    {...register("cmp_pro", {
                      required: true,
                    })}
                  />
                  {errors.cmp_pro && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Registration;
