import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router";
import { Button, Box, TextField, Grid, Container} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import format from 'date-fns/format'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [DOB, setDOB] = useState(null);
    const [favoritePlayer, setFavoritePlayer] = useState('')
    const [favoriteTeam, setFavoriteTeam] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    let navigate = useNavigate();
    
    // do this after clicking the register button
    const registerUser = async e => {
        e.preventDefault();
        setDOB(format(DOB, 'yyyy-MM-dd'));
        Axios.post('http://localhost:5000/register',
            {
                username: username,
                password: password,
                fname: fname,
                lname: lname,
                DOB: DOB,
                favoriteTeam: favoriteTeam,
                favoritePlayer: favoritePlayer
            }
            )
            .then((response) => {
                console.log(response);
                if (response.data.message)
                    setErrorMsg(response.data.message);
                else
                {
                    setErrorMsg('');
                    navigate("/");
                }                                      
            })
        }
            return (
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Register
                      </Typography>
                      <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="given-name"
                              name="firstName"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              onChange={(e) => setfname(e.target.value)}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              onChange={(e) => setlname(e.target.value)}
                              autoComplete="family-name"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              name="username"
                              onChange={(e) => setUsername(e.target.value)}
                              autoComplete="username"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="new-password"
                            />
                          </Grid>
                          <Grid item xs={12} md = {12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="DOB"
                                    disableFuture
                                    inputFormat="MM-dd-yyyy"
                                    value={DOB}
                                    onChange={(newDOB) => setDOB(newDOB)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
              );
    }
    export default Register;