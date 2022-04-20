const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
//middleware
app.use(cors())
app.use(express.json())

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

app.post("/", async (req, res) =>{
    try
    {
        const { username, password } = req.body;
        const userInfo = await pool.query(
        "SELECT username, password FROM users WHERE username = $1 AND password = $2", [username, password])    

    if (userInfo.rowCount == 0)
        res.send({ message: "Invalid credentials, please try again"})
    else res.json(userInfo.rows)
    }
    catch (err){
        console.error(err.message)
    }
})

app.post("/register", async (req, res) => {
    try {
      const { username, password, fname, lname, DOB, favoriteTeam, favoritePlayer } = req.body;
      // Only insert a new user if there aren't any other users with the same username
      const existingUser = await pool.query(
        "SELECT username FROM users WHERE username = $1",
        [username]
      );
      if (existingUser.rowCount == 0) {
        const newUser = await pool.query(
          "INSERT INTO users(username, password, fname, lname, DOB, favoriteTeam, favoritePlayer) VALUES($1, $2, $3, $4, $5, $6, $7)",
          [username, password, fname, lname, DOB, favoriteTeam, favoritePlayer]
        );
        res.send("added user to database");
      } else res.send({ message: "The username is already taken" });
    } catch (err) {
      console.error(err.message);
    }
  });
app.get("/getFavoriteTeam/:username", async (req, res) => 
{
  try
  {
    const {username} = req.params
    const favoriteTeam = await pool.query("SELECT favoriteTeam FROM users WHERE username = $1", [username])
    res.json(favoriteTeam.rows[0])
  } 
  catch(err)
  {
    console.error(err.message)
  }
})
app.get("/getFavoritePlayer/:username", async (req, res) => 
{
  try
  {
    console.log()
    const {username} = req.params
    const favoritePlayer = await pool.query("SELECT favoritePlayer FROM users WHERE username = $1", [username])
    res.json(favoritePlayer.rows[0])
  } 
  catch(err)
  {
    console.error(err.message)
  }
})

app.get("/userinfo/:username", async (req, res) => 
{
  try
  {
    const {username} = req.params
    const userinfo = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    res.json(userinfo.rows[0])
  } 
  catch(err)
  {
    console.error(err.message)
  }
})
app.put("/setFavoritePlayer", async (req, res) => {
  try{
    const {username, favoritePlayer} = req.body
    const setFavoritePlayer = await pool.query(
      "UPDATE users SET favoritePlayer = $1 WHERE username = $2",
      [favoritePlayer, username]
    )
    res.send("updated favorite player")
  }
  catch(err){
    console.error(err.message)
  }
})
app.put("/setFavoriteTeam", async (req, res) => {
  try{
    const {username, favoriteTeam} = req.body
    const setFavoriteTeam = await pool.query(
      "UPDATE users SET favoriteTeam = $1 WHERE username = $2",
      [favoriteTeam, username]
    )
    res.send("updated favorite team")
  }
  catch(err){
    console.error(err.message)
  }
})