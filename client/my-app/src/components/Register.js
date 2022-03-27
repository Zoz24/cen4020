import React, { useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router";
import { Button, Box, TextField, Grid, Container} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import format from 'date-fns/format'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [DOB, setDOB] = useState(null);
    const [favoritePlayer, setFavoritePlayer] = useState('')
    const [favoriteTeam, setFavoriteTeam] = useState('')
    const [errorMsg, setErrorMsg] = useState('');

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
            <Container
                maxWidth="sm"               
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",                       
                    }}
                    component="form"
                    noValidate onSubmit={registerUser}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={6} lg={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={e => setfname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} md={6} lg={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                onChange={e => setlname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} md={12} lg={12}>
                            <small id="errorMsg" class="text-danger">{errorMsg}</small>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} md={12} lg={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} md={6} lg={6} >
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, marginX: 5 }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Box>
            </Container >
        )
    }
    export default Register;