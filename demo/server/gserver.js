/**
 * Author : Bill Gooch
 * Socket server example
 *
 */
// modules =================================================
var express = require('express');
var app     = express();
//---------------------
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http           = require('http');
var io             = require('socket.io');

// configuration ===========================================

app.use(express.static(__dirname + './../client/src'));
app.use(require('connect-logger')());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'))

//==============================================================================
// start app
// =============================================================================


//:::::::: Create HTTP server
var server = http.createServer(app);

//:::::::: Create fx price server
var trueFXConfig = {
    userName:'goochie',
    password:'DanPorter1',
    curPairs : 'EUR/CAD,GBP/USD,EUR/JPY,GBP/JPY,GBP/AUD,EUR/AUD,USD/JPY,EUR/GBP,USD/CHF,USD/CAD,AUD/USD,AUD/CAD',
    trueFXID : 'goochie:DanPorter1:fxrates:1402866774752'
};

io = io.listen(server);

io.on('connection', function (socket) {

    console.log('ON CONNECT ------------');

    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

        socket.emit('broadcast', {
            payload: msg,
            source: from
        });

    });



    if(!fxServiceInitiated){

        setInterval(function () {
            requestFXprices(socket);
        }, 250)

    }


    //===============================
    //Handle diconnection
    //===============================
    socket.on('disconnect', function () {
        socket.emit('disconnected');
    });

});

exports = module.exports = app;

