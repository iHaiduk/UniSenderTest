/**
 * Created by igor on 14.02.17.
 */
const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', function (req, res) {
    res.sendFile(path.join(__dirname, 'data.json'));
});

app.listen(3000);
