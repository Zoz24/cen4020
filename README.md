# cen4020
Initial Setup:
1.  Ensure you have postgres installed.
2.  In postgres:
3.  setup a user and password (can use the postgres super user)
4.  Create a database called cen4020
5.  use "/c cen4020" to connect to the database
6.  Enter the following command:

CREATE TABLE users 
(
    username TEXT PRIMARY KEY, 
    password TEXT, 
    fname TEXT, 
    lname TEXT, 
    DOB DATE, 
    favoriteTeam TEXT, 
    favoritePlayer TEXT
);
7.   Close postgres
8.  Open terminal
9.  git clone the repository
10.  Go to the server folder
11.  Create a file named db.js
12.  Copy paste the following code into db.js

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "replaceWithYourPostgresUser",
  password: "replaceWithYourPostgresPassword",
  host: "localhost",
  port: 5432,
  database: "cen4020
});

module.exports = pool;

13.  Replace the postgres user/password with your own in the above copy pasted code
14.  Save db.js then close the file.
15.  Back in the terminal, still in the server folder, run "npm install"
16.  Then, run "node index.js"
17.  ****Keep this terminal open, open a second terminal****
18.  Go to the client/my-app folder
19.  Run "npm install"
20.  Run "npm start"
21.  The application should open in your web browser.

Running after initial setup:
1. Open terminal
2. Go to the server folder
3. run "node index.js"
4. ****Keep this terminal open, open a second terminal****
5. Go to the client/my-app folder
6. Run "npm start"
7. The application should open in your web browser.
