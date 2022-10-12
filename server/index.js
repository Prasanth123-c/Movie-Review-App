

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const Axios = require("axios")

const app = express();
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"movie_app",

});
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
        
    })
);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
function message(props){
  console.log(props);
        
}
app.get('http://localhost:3000/login', (req, res) => {
    res.send('This has CORS enabled ')
})

app.use(express.json());

//

app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 db.execute(
     "SELECT * FROM admin WHERE email = ? AND password = ?",
     [username, password],
     (err, result)=> {
       // console.log(result);
         if (err) {
            console.log(err);
             res.send({err: err});   
         }
         if (result.length > 0) {
           // message("success")
           console.log("Logged")
             }
        if(result.length <= 0)
        {
            console.log("Wrong input");
        }
       
         }
     
 );
});

//movie


app.post('/movie', (req, res) => {
    const moviename  = req.body.moviename;
    const year = req.body.year;
    const casting = req.body.year;
    const genre = req.body.genre;
    const rating =0;
    const url = req.body.url;
    db.execute(
        "INSERT INTO movie (name,year,genre,casting,rating,url) values(?,?,?,?,?,?) ",
        [moviename,year,genre,casting,rating,url],
        (err, result)=> {
          // console.log(result);
            if (err) {
               console.log(err);
                res.send({err: err});   
            }
            if (result.length > 0) {
              // message("success")
              console.log(result);
                }
           if(result.length <= 0)
           {
               console.log("Wrong input");
           }
          
            }
        
    );
   });

//movie details 
app.get('/mymovies', (req, res) => {
    db.query("SELECT * FROM movie", (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});
 
app.listen(3001, () => {
    console.log("running server");
}); 