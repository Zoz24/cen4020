import React, {Fragment, useState } from "react"
import 
{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import './App.css';

function App() 
{
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    username: null
  })
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login setUser={setUserInfo}/>} />
        <Route path = "/teams"/>
        <Route path = "/register" element = {<Register/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
