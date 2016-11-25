var ObjectID = require( "mongodb" ).ObjectID;
var Q = require( "q" );
var mongoGateway = require( "./mongo-connection.js" );
var appError = require( "../models/error.model.js" ).createAppError;


exports.listAll = listAll;
exports.getWidget = getWidget;
exports.addWidget = addWidget;
exports.updateWidget = updateWidget;
exports.generateNewId = generateNewId;

function listAll() {
    var deferred = Q.defer();
	getDatabase().then(
		function handleDatabaseResolve( mongo ) {
			mongo.collection( "widgets" )
				.find()
				.toArray( deferred.makeNodeResolver());
		});
	return( deferred.promise );
};

function getWidget( id ) {
	 var deferred = Q.defer();
     getDatabase().then(
        function handleDatabaseResolve( mongo ) {
            mongo.collection("widgets")     
                .find({"id": id})
                .toArray( deferred.makeNodeResolver());				
        });
	return (deferred.promise);
};

function addWidget (newWidget) {
    var deferred = Q.defer();
    getDatabase().then(
        function handleDatabaseResolve( mongo ) {

            mongo.collection( "widgets" ).insert(
                newWidget,
                { w: 1 },
                deferred.makeNodeResolver());
        });
	return( deferred.promise );
}

function updateWidget (newWidget) {
	var deferred = Q.defer();
    var queryUpdate = {
        "id": newWidget.id
    };
    var mapField = {
        "name": newWidget.name,
        "color": newWidget.color,
        "price": newWidget.price,
        "iventory": newWidget.inventory,
        "melts": newWidget.melts
    };

    getDatabase().then(
        function handleDatabaseResolve( mongo ) {
            mongo.collection( "widgets" ).update(
                queryUpdate, 
                { $set: mapField },
                { w: 1 }, 
                deferred.makeNodeResolver());
        });
	return( deferred.promise );
}

function generateNewId() {
    var deferred = Q.defer();
    
    getDatabase().then(
        function handleDatabaseResolve( mongo ) {
            mongo.collection( "widgets" ).aggregate(
                [
                    {
                        $group:{
                            _id:"",
                            maxId:{
                                $max:"$id"
                            }
                        }
                    }]).toArray( function(err,result){
                        if(err)
                            deferred.reject(err);
                        else
                            deferred.resolve((result[0].maxId + 1));
                    });
            
    });
    
    return (deferred.promise);
}

// I get a MongoDB connection from the resource pool. Returns a promise.
function getDatabase() {
	return (mongoGateway.getResource());
}