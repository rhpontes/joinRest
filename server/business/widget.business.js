var Q = require( "q" );
var widgetModel = require('../models/widget.model.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var appError = require('../models/error.model.js').createAppError;
var widgetPersistence = require('../persistence/factory.persistence.js')("widget");

exports.listWidgets = listWidgets;
exports.getWidget = getWidget;
exports.addWidget = addWidget;
exports.updateWidget = updateWidget;

function listWidgets(req, res) {
    var deferred = Q.defer();
    widgetPersistence.listAll()
        .then(function(result){
            deferred.resolve(result);
        },
        function(reason){
            deferred.reject(reason);
        });
    return(deferred.promise);
};

function getWidget(req, res) {
    var deferred = Q.defer();
    widgetPersistence.getWidget(parseInt(req.params.id))
        .then(function(result){
            if (result.length > 0)
                deferred.resolve(result[0]);                            
        },
        function(reason){
            deferred.reject(reason);
        });
    return(deferred.promise);
};

function addWidget(req, res) {
    var deferred = Q.defer();
    // Get last id
    widgetPersistence.generateNewId().then(
        function(newId){
            req.body.id = newId;
            // Do validate new object
            var resultValidate = v.validate(req.body,widgetModel);
            if(!resultValidate.valid)
            {
                deferred.reject(appError({
                    type: "Exception", 
                    errorCode: "b1"
                }));
                return(deferred.promise);
            }
            
            widgetPersistence.addWidget(req.body)
                .then(function(result){
                    deferred.resolve(result);
                },
                function(reason){
                    deferred.reject(reason);
                });
        }, 
        function(reason){
            deferred.reject(reason);
        });
        
    return(deferred.promise);
};

function updateWidget(req, res) {
    var deferred = Q.defer();
    
    // Only test
    req.body.price = parseFloat(req.body.price);

    // Do validate new object
    var result = v.validate(req.body,widgetModel);
    if(!result.valid)
    {
        deferred.reject(appError({
            type: "Exception", 
            errorCode: "b1"
        }));
        return(deferred.promise);
    }
    
    widgetPersistence.updateWidget(req.body)
        .then(function(result){
            deferred.resolve(result);
        },
        function(reason){
            deferred.reject(reason);
        });
        
    return(deferred.promise);
};