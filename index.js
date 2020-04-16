var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.get('/',function(res,req){
//     req.send(__dirname+'/public/views/index.html');
// });

//statics
app.use(express.static(`${__dirname}/public/views`));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));

io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).sendFile('404.html',{root:`${__dirname}/public/views/`});
});
server.listen(3000,function(){
    console.log('listening to port 3000')
});