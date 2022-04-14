import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TeamInfo from './TeamInfo';
import { useNavigate } from "react-router-dom";


const teams = [
    {name: "Arizona Diamondbacks", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Arizona_Diamondbacks.png"},
    {name: "Atlanta Braves", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Atlanta_Braves.png"},
    {name: "Baltimore Orioles", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Baltimore_Orioles.png"},
    {name: "Boston Red Sox", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Boston_Redsox.png"},
    {name: "Chicago White Sox", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Chicago_White_Sox.png"},
    {name: "Chicago Cubs", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Chicago_Cubs.png"},
    {name: "Cincinnati Reds", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Cincinnati_Reds.png"},
    {name: "Cleveland Indians", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Cleveland_Indians.png"},
    {name: "Colorado Rockies", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Colorado_Rockies.png"},
    {name: "Detroit Tigers", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Detroit_Tigers.png"},
    {name: "Houston Astros", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Houston_Astros.png"},
    {name: "Kansas City Royals", img: "http://www.capsinfo.com/images/MLB_Team_Logos/KansasCity_Royals.png"},
    {name: "Los Angeles Angels", img: "http://www.capsinfo.com/images/MLB_Team_Logos/LosAngeles_Angels.png"},
    {name: "Los Angeles Dodgers", img: "http://www.capsinfo.com/images/MLB_Team_Logos/LosAngeles_Dodgers.png"},
    {name: "Miami Marlins", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Miami_Marlins.png"},
    {name: "Milwaukee Brewers", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Milwaukee_Brewers.png"},
    {name: "Minnesota Twins", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Minnesota_Twins.png"},
    {name: "New York Yankees", img: "http://www.capsinfo.com/images/MLB_Team_Logos/NewYork_Yankees.png"},
    {name: "New York Mets", img: "http://www.capsinfo.com/images/MLB_Team_Logos/NewYork_Mets.png"},
    {name: "Oakland Athletics", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Oakland_Athletics.png"},
    {name: "Philadelphia Phillies", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Philadelphia_Phillies.png"},
    {name: "Pittsburgh Pirates", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Pittsburgh_Pirates.png"},
    {name: "San Diego Padres", img: "http://www.capsinfo.com/images/MLB_Team_Logos/SanDiego_Padres.png"},
    {name: "San Francisco Giants", img: "http://www.capsinfo.com/images/MLB_Team_Logos/SanFrancisco_Giants.png"},
    {name: "Seattle Mariners", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Seattle_Mariners.png"},
    {name: "St. Louis Cardinals", img: "http://www.capsinfo.com/images/MLB_Team_Logos/StLouis_Cardinals.png"},
    {name: "Tampa Bay Rays", img: "http://www.capsinfo.com/images/MLB_Team_Logos/TampaBay_Rays.png"},
    {name: "Texas Rangers", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Texas_Rangers.png"},
    {name: "Toronto Blue Jays", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Toronto_Blue_Jays.png"},
    {name: "Washington Nationals", img: "http://www.capsinfo.com/images/MLB_Team_Logos/Washington_Nationals.png"},   
];

const theme = createTheme();

export default function Teams({setTeamName, setTeamLogo}) 
{
  let navigate = useNavigate()

  const handleClick = (teamName, teamLogo) => 
  {
    setTeamName(teamName)
    setTeamLogo(teamLogo)
    navigate('/teaminfo')
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Sportsball Statistics LLC
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Please pick a team below
            </Typography>           
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {teams.map((team) => (
              <Grid item key={team} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <Button
                  onClick={() => handleClick(team.name, team.img)}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={team.img} 
                    alt="random"
                  />
                </Button>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {team.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}