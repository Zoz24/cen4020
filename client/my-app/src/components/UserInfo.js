import Axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CardContent, Card } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from "@mui/material/colors";
import ProfileIcon from './BaseballPlayer.jpg';


const theme = createTheme();
const UserInfo = () =>{

const [firstname, setfirstname] = useState('')
const [lastname, setlastname] = useState('')
const [bday, setbday] = useState('')
const [favteam, setfavteam] = useState('')
const [favplayer, setfavplayer] = useState('')



let uname = localStorage.getItem('USERNAME');

Axios.get(`http://localhost:5000/userinfo/${uname}`,
{
}
)
.then((response) => {
    setfirstname(response.data.fname)
    setlastname(response.data.lname)
    setbday(response.data.dob.slice(0,10))
    setfavteam(response.data.favoriteteam)
    setfavplayer(response.data.favoriteplayer)
}) 




return(
    
    <Card>
        <CardContent>
        <Avatar
        alt={firstname.toUpperCase()}
        src={ProfileIcon}
        sx={{width: 100 , height: 100 }}
        />
            <Typography variant="h4">{lastname}, {firstname}</Typography>
            <Typography variant="h4">Date of Birth: {bday}</Typography>
            <Typography variant="h4" align = 'center'>Username: {uname}</Typography>
            <Typography variant="h4" align = 'center'>Favorite Player: {favplayer}</Typography>
            <Typography variant='h4' align = 'center'>Favorite Team: {favteam}</Typography>
        </CardContent>
    </Card>
)
}

export default UserInfo;