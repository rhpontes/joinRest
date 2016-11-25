var ObjectID = require( "mongodb" ).ObjectID;
var Q = require( "q" );
var mongoGateway = require( "./mongo-connection.js" );
var appError = require( "../models/error.model.js" ).createAppError;

exports.listAll = listAll;
exports.getUser = getUser;

// I get all the friends. Returns a promise.
function listAll() {
    var deferred = Q.defer();
	getDatabase().then(
		function handleDatabaseResolve( mongo ) {
			mongo.collection( "users" )
				.find()
				.toArray( deferred.makeNodeResolver());
		});
	return( deferred.promise );
};

function getUser( id ) {
	 var deferred = Q.defer();
     getDatabase().then(
        function handleDatabaseResolve( mongo ) {
            mongo.collection( "users" )     
                .find({"id": id})
                .toArray( deferred.makeNodeResolver());				
        });
	return (deferred.promise);
};

// I get a MongoDB connection from the resource pool. Returns a promise.
function getDatabase() {

	return( mongoGateway.getResource() );

}