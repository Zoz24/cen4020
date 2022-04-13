import React, { Fragment, useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid'
import Axios from "axios";

const TeamInfo = (props) =>
{
    const columns = [
        // includes jersey num
        {
            field: "name_display_first_last",
            headerName: 'Full Name',
            width: 300
        },
        {
           field: "bats",
           headerName: "B/T",
           width: 150,
        },
        {
            field: "height_feet",
            headerName: "Height",
            width: 150,
        },
        {
            field: "weight",
            headerName: "Weight",
            width: 150,
        },
        {
            field: "position_txt",
            headerName: "Position",
            width: 150,
        },
        {
            field: "birth_date",
            headerName: "DOB",
            width: 150
        }
    ]
    
    const [teamRoster, setTeamRoster] = useState([])

    useEffect(() => {
        // call the functions here
         
        getTeamRoster() 
            
    }, [])
    
    
    // get info for each team (use current year)
    const getTeams = async () => 
    {
        const season = new Date().getFullYear().toString()
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

    // Get current 40 man roster for a specific team for the current year
    async function getTeamRoster()
    {
        let teams = await getTeams()
        console.log(teams)
        let teamID = getTeamID(teams, props.teamName)
        console.log(teamID)
        const url = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamID}'&roster_40.col_in=name_display_first_last,jersey_number,bats,throws,height_feet,height_inches,weight,position_txt,birth_date,player_id`
        const response = await Axios.get(url)
        const data = response.data.roster_40.queryResults.row
        console.log(data)
        setTeamRoster(data)     
    }

    function pushID(teams)
    {

    }

  

    return (
    <div style={{ height: 400, width: '100%' }}>
        <h2>{props.teamName}</h2>
        <DataGrid
            rows = {teamRoster}
            columns = {columns}
            getRowId = {(row) => row.player_id}
            
            />
    </div>
    
    
    )
}

export default TeamInfo