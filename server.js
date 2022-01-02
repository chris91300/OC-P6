const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const http = require('http');

const app = require("./app");


app.get("/", (req, res)=>{
    
    res.send("ok ça marche")
})
app.listen(PORT || 3000, ()=>{
    
    console.log("serveur à l'écoute sur le port "+ PORT)
});