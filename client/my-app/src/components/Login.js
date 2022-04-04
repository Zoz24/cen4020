import Axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState('')
    
    let navigate = useNavigate()
    
    const userLogin = async e =>{
        e.preventDefault();

        Axios.post(`http://localhost:5000`,
        {
            username: username,
            password: password
        }
        )
        .then((response) => {
            console.log(response);
            if (response.data.message)
                setInvalidLogin(response.data.message)             
            else
            {
                setInvalidLogin('');
                props.setUser({isLoggedIn:true, username:username})
                navigate("/teams")               
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
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="username"
                  onChange={e => setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={userLogin}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  href="/register"               
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
    )
}

export default Login