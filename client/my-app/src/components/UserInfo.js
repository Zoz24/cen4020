import Axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Avatar, Box, Typography, Grid } from "@mui/material";
import ProfileIcon from './batter.png'

const UserInfo = () => {

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
            setbday(response.data.dob.slice(0, 10))
            setfavteam(response.data.favoriteteam)
            setfavplayer(response.data.favoriteplayer)
        })

    return (
        <Box sx=
            {{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Card sx={{ minWidth: 500 }}>
                <Grid
                    container spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs="auto">
                        <Avatar
                            alt="baseball"
                            src={ProfileIcon}
                            sx={{ width: 200, height: 200 }}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Typography variant = "h4" component="div">{uname}</Typography>
                    </Grid>                   
                </Grid>
                {/*define a box */}
                <Box sx = 
                {{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 500,
                    
                }}
                >
                    <Grid
                        container spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs="auto">
                            <Typography variant = "h6" component="div">First name:</Typography>
                            <Typography variant = "h6" component="div">Last name:</Typography>
                            <Typography variant = "h6" component="div">DOB:</Typography> 
                            <Typography variant = "h6" component="div">Favorite Team: </Typography> 
                            <Typography variant = "h6" component="div">Favorite Player:</Typography>    
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs="auto">
                            <Typography variant = "h6" component="div">{firstname}</Typography>
                            <Typography variant = "h6" component="div">{lastname}</Typography>
                            <Typography variant = "h6" component="div">{bday}</Typography> 
                            <Typography variant = "h6" component="div">{favteam == null ? "N/A" : favteam} </Typography> 
                            <Typography variant = "h6" component="div">{favplayer == null ? "N/A" : favplayer}</Typography>    
                        </Grid>
                    </Grid>
                </Box>                
            </Card>
        </Box>

    )
}

export default UserInfo;