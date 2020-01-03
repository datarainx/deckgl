const express = require('express');
const app = express();
router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});


app.use(express.static(__dirname + '/dist/'));
app.use(express.static(__dirname + '/'));

router.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));

  });

var port =  process.env.PORT || 8081;

app.listen(port, function () {
    console.log('Express server listening on port ' + port + ' in ' + app.get('env') + ' mode');
});