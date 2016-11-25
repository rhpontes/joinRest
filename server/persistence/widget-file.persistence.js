var Q = require( "q" );
var fs = require("fs");
var extend = require('extend');
var appError = require('../models/error.model.js').createAppError;
var widgets = [];

exports.listAll = listAll;
exports.getWidget = getWidget;
exports.addWidget = addWidget;
exports.updateWidget = updateWidget;
exports.generateNewId = generateNewId;

function listAll() {
    var deferred = Q.defer();
    
    if (widgets.length > 0)
    {
        deferred.resolve(widgets);
        return (deferred.promise);
    }
    
    fs.readFile('./persistence/widgets.json','utf8',function(err, data) {

        if (err) {
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        } else {
            widgets = JSON.parse(data);     
            deferred.resolve(widgets);
        }    
    });
    
    
    return(deferred.promise);
};

function getWidget(id) {
    var deferred = Q.defer();
    
    getWidgets(function(err, _widgets) {
        
        if (err)
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        
        _widgets.forEach(function(widget){
            if (widget.id == id) {
                deferred.resolve(widget);
            }
        });
    });
    
    return (deferred.promise);
}

function addWidget(newWidget) {
    var deferred = Q.defer();
    
    getWidgets(function(err, _widgets) {
        
        if (err)
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        
        _widgets.push(newWidget);
        deferred.resolve(newWidget);
    });
    
    return (deferred.promise);
}

function updateWidget(newWidget) {
    var deferred = Q.defer();
    
    getWidgets(function(err, _widgets) {
        
        if (err)
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
        
        _widgets.forEach(function(widget){
            if (widget.id == newWidget.id) {
                extend(widget,newWidget);
                deferred.resolve(widget);
            }
        });
    });
    
    return (deferred.promise);
}

function generateNewId() {
    var deferred = Q.defer();
    
    getWidgets(function(err, _widgets) {
        
        if (err)
            deferred.reject(
                appError({
                    type: "Exception", 
                    errorCode: "p1"
                }));
                
        if(_widgets && _widgets.length > 0)
                deferred.resolve((_widgets[_widgets.length - 1].id + 1));
        else
            deferred.resolve(1);
            
    });
    
    return (deferred.promise);
}

function getWidgets(callback) {
    if (widgets.length > 0)
        callback(null, widgets);
    else
        listAll().then(
            function(result){
                callback(null, result);
            },
            function(reason){
                callback(reason);
            });
};