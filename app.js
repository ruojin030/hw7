var express = require('express');
const app = express()
var mysql = require('mysql')
var Memcached = require('memcached');

var memcached = new Memcached('localhost:11211');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password:'password',
    database:'hw7'
})
const port = 80;
connection.connect();
app.get("/hw7",function(req,res){
    var club =req.query.club
    var pos = req.query.pos
    var c = club+pos
    memcached.get(c,function(err,data){
        if(err) console.log(err);
        console.log("cache hit! data:"+data.player)
        return res.json(data)
    })
    /*var q = "SELECT Player, A, GS FROM assists WHERE Club=\""+req.query.club+"\" and POS=\""+req.query.pos+"\""
    console.log(q)
    connection.query(q,function(err,rows,fields){
        if (err) console.log(err);
        var high = -1
        var total = 0
        var Player = ""
        var count = 0
        var GS = -1
        for(var i in rows){
            total = total + rows[i].A
            if(rows[i].A >high||(rows[i].A ==high&&rows[i].GS >GS)){ 
                    Player = rows[i].Player
                    high = rows[i].A
                    GS = rows[i].GS
            }
            count++
        }
        var avg = total/count
        memcached.set(c,{'club':club,'pos':pos,'max_assists': high,'player':Player, 'avg_assists':avg},500,function(err){
            if (err) console.log("memcache:"+error);
            console.log("cache success")
            res.json({'club':club,'pos':pos,'max_assists': high,'player':Player, 'avg_assists':avg})
        })
        
    })*/
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;