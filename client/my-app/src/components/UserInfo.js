import Axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
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

const UserInfo = () =>{

  

    return(
    <Fragment>
    <table align = "center">
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Username</th>
    <th>Date of Birth</th>
    <th>Favorite Team</th>
    <th>Favorite Player</th>
  </tr>
  <tr>
    <td>Jesus</td>
    <td>Christ</td>
    <td>jChrist</td>
    <td>0000-12-25</td>
    <td>Bethlehem Badgers</td>
    <td>Judas Iscariot</td>
  </tr>
</table></Fragment>)
}

export default UserInfo;