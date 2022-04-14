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
import './App.css';
import Axios from "axios"

function App() 
{
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    username: "jeff"
  })
  const [teamName, setTeamName] = useState('')
  const [teamLogo, setTeamLogo] = useState('')
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [favoritePlayer, setFavoritePlayer] = useState('')

  useEffect(() => {
    getFavorites()
  }, [])
  const getFavorites = async () =>{
    getFavoriteTeam()
    getFavoritePlayer()
  }

  const getFavoriteTeam = async () =>{
    const response = await Axios.get(`http://localhost:5000/getFavoriteTeam/${userInfo.username}`)
    const favoriteTeam = response.data.favoriteteam
    setFavoriteTeam(favoriteTeam)
  }

  const getFavoritePlayer = async () =>{
    const response = await Axios.get(`http://localhost:5000/getFavoritePlayer/${userInfo.username}`)
    const favoritePlayer = response.data.favoriteplayer
    setFavoritePlayer(favoritePlayer)
  }
  
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login setUser={setUserInfo}/>} />
        <Route path = "/teams" element = {<Teams setTeamName={setTeamName} setTeamLogo={setTeamLogo}/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/teaminfo" element = {<TeamInfo 
                                              teamName = {teamName} 
                                              teamLogo = {teamLogo} 
                                              favoriteTeam = {favoriteTeam} 
                                              setFavoriteTeam = {setFavoriteTeam}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
