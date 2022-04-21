import React, {Fragment, useEffect, useState } from "react"
import 
{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Teams from "./components/Teams"
import TeamInfo from "./components/TeamInfo"
import PlayerInfo from "./components/PlayerInfo"
import './App.css';
import Axios from "axios"
import Navbar from "./components/NavBar";
import UserInfo from "./components/UserInfo"

function App() 
{
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    username: null
  })
  const [teamName, setTeamName] = useState('')
  const [teamLogo, setTeamLogo] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [playerID, setPlayerID] = useState('')
  const [playerPos, setPlayerPos] = useState('')
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [favoritePlayer, setFavoritePlayer] = useState('')

  useEffect(() => {
    getFavorites()
  }, [favoriteTeam, favoritePlayer])
  const getFavorites = async () =>{
    getFavoriteTeam()
    getFavoritePlayer()
  }

  const getFavoriteTeam = async () =>{
    const response = await Axios.get(`http://localhost:5000/getFavoriteTeam/${userInfo.username}`)
    const favoriteTeam = response.data.favoriteteam
    console.log("favorite team: " + favoriteTeam)
    setFavoriteTeam(favoriteTeam)
  }

  const getFavoritePlayer = async () =>{
    const response = await Axios.get(`http://localhost:5000/getFavoritePlayer/${userInfo.username}`)
    const favoritePlayer = response.data.favoriteplayer
    console.log("favorite player: " + favoritePlayer)
    setFavoritePlayer(favoritePlayer)
  }
  
  return (  
    <Router>
      <>
      {userInfo.isLoggedIn && <Navbar setUserInfo = {setUserInfo}/>}
        <Routes>
          <Route path = "/" element = {<Login setUser={setUserInfo}/>} />
          <Route path = "/teams" element = {<Teams setTeamName={setTeamName} setTeamLogo={setTeamLogo} />} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/teaminfo" element = {<TeamInfo
                                                username = {userInfo.username} 
                                                teamName = {teamName} 
                                                teamLogo = {teamLogo}
                                                setPlayerName = {setPlayerName}
                                                setPlayerID = {setPlayerID}
                                                setPlayerPos = {setPlayerPos}
                                                setFavoriteTeam = {setFavoriteTeam} 
                                                favoriteTeam = {favoriteTeam} />} />
          <Route path = "/playerinfo" element = {<PlayerInfo
                                                  username = {userInfo.username}
                                                  favoritePlayer = {favoritePlayer} 
                                                  setFavoritePlayer = {setFavoritePlayer}
                                                  playerName = {playerName}
                                                  playerID = {playerID}  
                                                  playerPos = {playerPos}/> } />
          <Route path = "/userinfo" element = {<UserInfo/>}/>
        </Routes>
      </>
    </Router>
    
  )
}

export default App;
