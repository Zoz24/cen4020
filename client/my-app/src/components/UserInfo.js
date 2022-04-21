import Axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  <Fragment>
    <table align = "center">
    <tr>
        <th>First Name</th>
        <td>{firstname}</td>
    </tr>
    <tr>
        <th>Last Name</th>
        <td>{lastname}</td>
    </tr>
    <tr>
        <th>Username</th>
        <td>{uname}</td>
    </tr>
    <tr>
        <th>Birthday</th>
        <td>{bday}</td>
    </tr>
    <tr>
        <th>Favorite Team</th>
        <td>{favteam}</td>
    </tr>
    <tr>
        <th>Favorite Player</th>
        <td>{favplayer}</td>
    </tr>
</table></Fragment>
)
}

export default UserInfo;