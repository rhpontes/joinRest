var Q = require( "q" );
var fs = require("fs");
var appError = require('../models/error.model.js').createAppError;
var users = [];

exports.listAll = listAll;
exports.getUser = getUser;

function listAll() {
    var deferred = Q.defer();
    
    if (users.length > 0)
    {
        deferred.resolve(users);
        return(deferred.promise);
    }
        
    fs.readFile('./persistence/users.json','utf8',function(err, data) {
        if (err) {
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        } else {
            users = JSON.parse(data);     
            deferred.resolve(users);
        }    
    });
    
    return(deferred.promise);
};

function getUser(id) {
    var deferred = Q.defer();
    
    getUsers(function(err, _users) {
        
        if (err)
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        
        _users.forEach(function(user){
            if (user.id == id) {
                deferred.resolve(user);
            }
        });
    });
    
    return (deferred.promise);
}

function getUsers(callback) {
    if (users.length > 0)
        callback(null,users);
    else
        listAll().then(
            function(result){
                callback(null, result);
            },
            function(reason){
                callback(reason);
            });
}