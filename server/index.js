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