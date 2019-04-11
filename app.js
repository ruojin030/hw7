var express = require('express');
const app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password:'password',
    database:'hw7'
})
const port = 80;
connection.connect();
app.get("/hw7",function(req,res){
    req.query.club
    req.query.pos
    var q = "SELECT Player,A WHERE Club=\""+req.query.club+"\" and POS=\""+req.query.pos+"\""
    connection.query(q,function(err,rows,fields){
        if (err) console.log(err);
        var high = 0
        var total = 0
        var Player = ""
        var count = 0
        for(var i in rows){
            total = total + rows[i].A
            if(rows[i].A >high){
                Player = rows[i].Player
            }
            count++
        }
        var avg = total/count
        res.json({'club':req.quere.club,'pos':req.query.pos,'max_assists': high,'player':Player, 'avg_assists':avg})
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;