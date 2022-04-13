import React, {Fragment, useState } from "react"
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

function App() 
{
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    username: null
  })
  const [teamName, setTeamName] = useState('')
  
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login setUser={setUserInfo}/>} />
        <Route path = "/teams" element = {<Teams setTeamName={setTeamName}/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/teaminfo" element = {<TeamInfo teamName = {teamName}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
