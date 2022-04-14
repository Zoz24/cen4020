import React, { Fragment, useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid'
import Axios from "axios";
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Grid} from "@mui/material";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const TeamInfo = (props) =>
{
    const columns = [
        {
            field: "name_display_first_last",
            headerName: 'Full Name',
            width: 300
        },
        {
           field: "bats",
           headerName: "Bats",
           width: 100,
        },
        {
            field: "throws",
            headerName: "Throws",
            width: 100,
        },
        {
            field: "height_feet",
            headerName: "Height (ft)",
            width: 100,
        },
        {
            field: "height_inches",
            headerName: "Height (in)",
            width: 100,
        },
        {
            field: "weight",
            headerName: "Weight",
            width: 100,
        },
        {
            field: "position_txt",
            headerName: "Position",
            width: 100,
        },
        {
            field: "birth_date",
            headerName: "DOB",
            width: 150
        }
    ]
    const currentSeason = new Date().getFullYear()
    const [teamRoster, setTeamRoster] = useState([])
    const [desiredSeason, setDesiredSeason] = useState(currentSeason)
    

    useEffect(() => {
        getTeamRoster()       
    }, [desiredSeason])
    
    
    // get info for each team (use current year)
    const getTeams = async () => 
    {
        const season = currentSeason
        const url = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='${season}'&team_all_season.col_in=name_display_full,team_id`
        const response = await Axios.get(url);
        const data = response.data.team_all_season.queryResults.row       
        return data;
    }
    
    // Get team id for a specific team
    const getTeamID = (teams, teamName) => 
    {
        for (let i = 0; i < teams.length; i++)
        {
            if (teams[i].name_display_full === teamName)
                return teams[i].team_id        
        }
    }

    const formatDate = (teams) => 
    {
        teams.forEach(team => {
            let dob = team.birth_date.substring(0,10)
            team.birth_date = dob          
        })
    }

    // This is just to have the fields match for the datagrid above since the properties returned by this api call are slightly different.
    const formatData = (teams) =>
    {
        for (let i = 0; i < teams.length; i++)
        {
            let obj = {}
            obj.name_display_first_last = teams[i].name_first_last
            obj.bats = teams[i].bats
            obj.throws = teams[i].throws
            obj.height_feet = teams[i].height_feet
            obj.height_inches = teams[i].height_inches
            obj.weight = teams[i].weight
            obj.position_txt = teams[i].primary_position
            obj.birth_date = teams[i].birth_date
            obj.player_id = teams[i].player_id

            teams[i] = obj
        }
    }

    async function getTeamRoster()
    {
        let teams = await getTeams()
        console.log(teams)
        let teamID = getTeamID(teams, props.teamName)

        // Gets all players on a team for a specific season (ex. desiredSeason = 2021, currentSeason = 2022)
        if (desiredSeason !== currentSeason)
        {
            const season = desiredSeason
            console.log("current season: " + currentSeason)
            console.log("desired season: " + season)
            console.log(teamID)
            const url = `http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${season}'&end_season='${season}'&team_id='${teamID}'`
            const response = await Axios.get(url)
            const data = response.data.roster_team_alltime.queryResults.row
            formatDate(data)
            formatData(data)
            console.log(data)
            setTeamRoster(data)  
        }
        else // gets 40 man roster for the current season
        {
            const url = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamID}'&roster_40.col_in=name_display_first_last,bats,throws,height_feet,height_inches,weight,position_txt,birth_date,player_id`
            const response = await Axios.get(url)
            const data = response.data.roster_40.queryResults.row
            formatDate(data)
            console.log(data)
            setTeamRoster(data)     
        }
        
    }
 
    return (
    //<div style={{ height: 400, width: '100%', textAlign: "center" }}>  
    <>
    <Box sx=
    {{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 2000,
        justifyContent: 'center'
    }}>  
    <div style={{ height: 400, width: '50%', textAlign: "center"}}>
        <h1>{props.teamName} Roster {desiredSeason}</h1>
        <Box
            component="img"
            sx={{height: 200, width: 200}}
            src= {props.teamLogo}
        />
        <Grid container spacing = {2}
            flex = "column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <FormControlLabel 
                    control={<Checkbox/>} 
                    label="Select as favorite team"
                    />
            </Grid>
        </Grid>   
        <Grid
            container spacing = {2}
            sx={{marginTop: 2}}
            flex = "row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs = {2}>
                <Button 
                variant = "contained" 
                startIcon={<ArrowBackIosNewIcon/>}
                onClick = {() => {setDesiredSeason(desiredSeason - 1)}}
                >
                    Season {desiredSeason - 1}</Button>
            </Grid>
            <Grid style = {{display: currentSeason === desiredSeason ? 'none' : undefined}} item xs = {2}>
                <Button 
                variant = "contained" 
                endIcon={<ArrowForwardIosIcon/>}
                onClick = {() => {setDesiredSeason(desiredSeason + 1)}}
                >Season {desiredSeason + 1}</Button>
            </Grid>            
        </Grid>
        
        <DataGrid
            sx={{marginTop: 2}}
            rows = {teamRoster}
            columns = {columns}
            getRowId = {(row) => row.player_id}
            autoHeight    
            />
        </div>
    </Box>
    </>
    //</div>
    
    
    )
}

export default TeamInfo