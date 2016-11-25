// **************************************************************
// Main file
// **************************************************************
var path = require('path');
var bodyParser = require('body-parser');
var mongoGateway  = require( "./server/persistence/mongo-connection.js" );
var express = require('express');
var configServer = require('./server/configs/config-server.js');
var configPersistence = require('./server/configs/config-persistence.js');
var server = express();



// Inclui os cabecalhos de CROS para todas as chamadas
server.use(function(req, res, next) {

    // Always set the CORS (Cross-Origin Resource Sharing) headers so that our client-
    // side application can make AJAX calls to this node app (I am letting Apache serve
    // the client-side app so as to keep this demo as simple as possible).
    // Seta cabecalhos padrões
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-CSRFToken, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    }

    next();

});

// Responde ok para as requisições de OPTIONS
server.options('*', function(req, res, next) {    
    res.status(200).send('ok');
});

server.use(express.static(path.join(__dirname, './public')));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

// Function for process error
function processError( response, error ) {
    
    // Define language to return
    var lang = response.req.headers["accept-language"].split(',')[0];
    var i18n = require('i18n-nodejs')(lang,path.join(__dirname, configServer.langErrorFile));
    var messageError = i18n.__(error.errorCode);

    response.setHeader( "Content-Type", "application/json" );
    switch ( error.type ) {
        case "App.Unauthorized":        
                response.writeHead( 401, i18n.__("401") );
        break;
        case "App.InvalidArgument":
            response.writeHead( 400, i18n.__("400") );
        break;
        case "App.NotFound":
            response.writeHead( 404, i18n.__("404") );
        break;
        default:
            response.writeHead( 500, i18n.__("500") );
        break;
    }

    response.end( 
        JSON.stringify({
            type: ( error.type || "" ),
            code: ( error.errorCode || "" ),
            message: ( messageError || error.message )
        })
    );
}

// Function for process response api
function processResponse(response, apiResponse) {
    
    apiResponse
        .then(
            function handleApiResolve( result ) {
                console.log("RESULT >>");
                console.log(result);
                var serializedResponse = JSON.stringify( result );
                console.log("RESULT JSON >>");
                console.log(serializedResponse);
                response.writeHead(
                    200,
                    "OK",
                    {
                        "Content-Type": "application/json",
                        "Content-Length": serializedResponse ? Buffer.byteLength(serializedResponse) : null
                    }
                );
                response.end( serializedResponse );
            }
        )
        .catch(function(reason){
            processError(response, reason);
        }).done();

       
}

// REST SERVICES
require("./server/services/user.service.js")(server, processResponse);
require("./server/services/widget.service.js")(server, processResponse);

// Try connection MongoDb
mongoGateway.connect( configPersistence.url )
	.then(
		function handleConnectResolve( mongo ) {

			server.listen(configServer.port, function () {
                console.log('%s listening at %s with MongoDB', server.name, server.url);
            });

		},
		function handleConnectReject( error ) {
            if (configPersistence.persistenceMode != 0) {
                server.listen(configServer.port, function () {
                    console.log('%s listening at %s without DataBase', server.name, server.url);
                });
            } else {
                console.log( "Connection to MongoDB failed." );
			    console.log( error );
            }
		}
	);




