((express, http, bodyParser, methodOverride, mongoose) => {
    var app = express(),
        server = http.createServer(app);
    var db = mongoose.connect('mongodb://localhost:27017/Occupapp', { useNewUrlParser: true });
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static(__dirname + '/public'));
    var server_port = process.env.PORT || 5000;

    // app.use('/', (req,res)=>{
    //     res.send('Api Occupap');
    // });

    var routerUser = require("./routes/userRoutes");
    app.use('/api', routerUser);

    // var routerBudget = require("./config/budgetRoutes");
    // app.use('/api', routerBudget);


    app.listen(server_port, function () {
        console.log("Node server running on port - " + server_port);
    });
})
    (require("express"),
    require("http"),
    require("body-parser"),
    require("method-override"),
    require('mongoose')
    )