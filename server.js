console.log("start server.js");
const http = require('http');

const app = require("./app");


app.get("/", (req, res)=>{
    res.send("ok ça marche")
})
app.listen(3000);