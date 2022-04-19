import React, { useEffect } from "react"
import { useState } from "react"
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Axios from "axios"
import {DataGrid} from '@mui/x-data-grid'
import Button from "@mui/material/Button"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// props will have the player name, and the player id
const PlayerInfo = (props) => 
{ 
    const pitchingColumns = [
        {
            field: "season",
            headerName: 'Season',
            width: 75,         
        },
        {
           field: "team_abbrev",
           headerName: "Team",
           width: 50,
        },
        {
            field: "league",
            headerName: "LG",
            width: 50,
        },
        {
            field: "w",
            headerName: "W",
            width: 50,
        },
        {
            field: "l",
            headerName: "L",
            width: 50,
        },
        {
            field: "era",
            headerName: "ERA",
            width: 75,
        },
        {
            field: "g",
            headerName: "G",
            width: 50
        },
        {
            field: "gs",
            headerName: "GS",
            width: 50
        },
        {
            field: "cg",
            headerName: "CG",
            width: 50
        },
        {
            field: "sho",
            headerName: "SHO",
            width: 50
        },
        {
            field: "hld",
            headerName: "HLD",
            width: 50
        },
        {
            field: "sv",
            headerName: "SV",
            width: 50
        },
        {
            field: "svo",
            headerName: "SVO",
            width: 50
        },
        {
            field: "ip",
            headerName: "IP",
            width: 75
        },
        {
            field: "h",
            headerName: "H",
            width: 50
        },
        {
            field: "r",
            headerName: "R",
            width: 50
        },
        {
            field: "er",
            headerName: "ER",
            width: 50
        },
        {
            field: "hr",
            headerName: "HR",
            width: 50
        },
        {
            field: "np",
            headerName: "NP",
            width: 50
        },
        {
            field: "hb",
            headerName: "HB",
            width: 50
        },
        {
            field: "bb",
            headerName: "BB",
            width: 50
        },
        {
            field: "ibb",
            headerName: "IBB",
            width: 50
        },
        {
            field: "so",
            headerName: "SO",
            width: 50
        },
        {
            field: "avg",
            headerName: "AVG",
            width: 50
        },
        {
            field: "whip",
            headerName: "WHIP",
            width: 75
        },
        {
            field: "go",
            headerName: "GO",
            width: 50
        },
        {
            field: "ao",
            headerName: "AO",
            width: 50
        },
    ]

    const hittingColumns = [
        {
            field: "season",
            headerName: 'Season',
            width: 75,         
        },
        {
           field: "team_abbrev",
           headerName: "Team",
           width: 50,
        },
        {
            field: "league",
            headerName: "LG",
            width: 50,
        },        
        {
            field: "g",
            headerName: "G",
            width: 50
        },
        {
            field: "ab",
            headerName: "AB",
            width: 50
        },
        {
            field: "r",
            headerName: "R",
            width: 50
        },
        {
            field: "h",
            headerName: "H",
            width: 50
        },
        {
            field: "tb",
            headerName: "TB",
            width: 50
        },
        {
            field: "hr",
            headerName: "HR",
            width: 50
        },
        {
            field: "rbi",
            headerName: "RBI",
            width: 50
        },
        {
            field: "bb",
            headerName: "BB",
            width: 50
        },
        {
            field: "ibb",
            headerName: "IBB",
            width: 50
        },
        {
            field: "so",
            headerName: "SO",
            width: 50
        },
        {
            field: "sb",
            headerName: "SB",
            width: 50
        },
        {
            field: "cs",
            headerName: "CS",
            width: 50
        },
        {
            field: "avg",
            headerName: "AVG",
            width: 50
        },
        {
            field: "obp",
            headerName: "OBP",
            width: 50
        },
        {
            field: "slg",
            headerName: "SLG",
            width: 50
        },
        {
            field: "ops",
            headerName: "OPS",
            width: 60
        },

    ]
    const currentSeason = new Date().getFullYear()
    const [stats, setStats] = useState([])
    const [desiredSeason, setDesiredSeason] = useState(currentSeason)

    useEffect(() => {
       getPlayerStats(props.playerPos) 
    }, [desiredSeason])

    const formatData = (data) => 
    {
        let arr = []
        arr.push(data)
        setStats(arr)
    }

    const getPlayerStats = async (playerPosition) =>
    {       
        if (playerPosition === 'P')
        {
            console.log("pitching stats")
            const url = `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${desiredSeason}'&player_id='${props.playerID}'`
            const response = await Axios.get(url)
            const numberOfRows = response.data.sport_pitching_tm.queryResults.totalSize
            const data = response.data.sport_pitching_tm.queryResults.row
            if (numberOfRows == 1) // deals with scenario of the row prop being an object instead of an array
                formatData(data)
            else if (numberOfRows >= 2)
                setStats(data)  
            else if (numberOfRows == 0)
                setStats([])                
        }
        else
        {
            console.log("hitting stats")
            const url = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${desiredSeason}'&player_id='${props.playerID}'`
            const response = await Axios.get(url)
            const numberOfRows = response.data.sport_hitting_tm.queryResults.totalSize
            const data = response.data.sport_hitting_tm.queryResults.row
            if (numberOfRows == 1) // deals with scenario of the row prop being an object instead of an array
                formatData(data)
            else if (numberOfRows >= 2)
                setStats(data)
            else if (numberOfRows == 0)
                setStats([])
        }
    }  
    return (
        //<div style={{ height: 400, width: '100%', textAlign: "center" }}>  
        <Box sx=
        {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',           
            justifyContent: 'center'
        }}> 
        
            <h1>{props.playerName} Stats {desiredSeason}</h1>
            <Box
                component="img"
                sx={{height: 200, width: 200}}
                src= {props.teamLogo}
            />
            <Grid
                container spacing = {2}
                sx={{marginTop: 2}}
                flex = "row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs ="auto">
                    <Button
                    variant = "contained" 
                    startIcon={<ArrowBackIosNewIcon/>}
                    onClick = {() => {setDesiredSeason(desiredSeason - 1)}}
                    >
                        Season {desiredSeason - 1}</Button>
                </Grid>
                <Grid item xs = "auto" style = {{display: currentSeason === desiredSeason ? 'none' : undefined}}>
                    <Button 
                    variant = "contained" 
                    endIcon={<ArrowForwardIosIcon/>}
                    onClick = {() => {setDesiredSeason(desiredSeason + 1)}}
                    >Season {desiredSeason + 1}</Button>
                </Grid>            
            </Grid>
            <div style = {{display: props.playerPos == 'P' ? 'none' : undefined, height: 400, width: "52%"}}>
                <DataGrid
                    sx={{marginTop: 2}}
                    rows = {stats}
                    columns = {hittingColumns}
                    getRowId = {(row) => row.player_id}
                    autoHeight
                    />
            </div>
            
            <div style = {{display: props.playerPos != 'P' ? 'none' : undefined, height: 400, width: "76%"}}>
                <DataGrid
                    sx={{marginTop: 2}}
                    rows = {stats}
                    columns = {pitchingColumns}
                    getRowId = {(row) => row.player_id}
                    autoHeight
                    />
            </div>
        
        </Box>
        )
}

export default PlayerInfo