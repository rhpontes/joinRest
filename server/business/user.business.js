var Q = require( "q" );
var userModel = require('../models/user.model.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var userPersistence = require('../persistence/factory.persistence.js')("user"); 

exports.listUsers = listUsers;
exports.getUser = getUser;

function listUsers(req, res) {
    var deferred = Q.defer();
    userPersistence.listAll()
        .then(function(result){
            deferred.resolve(result);
        },
        function(reason){
            deferred.reject(reason);
        });
        
    return(deferred.promise);
}

function getUser(req, res) {
    var deferred = Q.defer();
    userPersistence.getUser(parseInt(req.params.id))
        .then(function(result){
            if (result.length > 0)
                deferred.resolve(result[0]); 
        },
        function(reason){
            deferred.reject(reason);
        });
    return(deferred.promise);
}