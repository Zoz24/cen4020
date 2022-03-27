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
    userName: null,
  })
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login></Login>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
