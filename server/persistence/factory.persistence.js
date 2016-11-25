var userDbPersistence = require('./user-db.persistence.js');
var userFilePersistence = require('./user-file.persistence.js');
var widgetDbPersistence = require('./widget-db.persistence.js');
var widgetFilePersistence = require('./widget-file.persistence.js');

var configPersistence = require("../configs/config-persistence.js");

var mapPersistence = {
    "user" : {
        "db" : userDbPersistence,
        "file": userFilePersistence
    },
    "widget" : {
        "db" : widgetDbPersistence,
        "file": widgetFilePersistence
    }
}

module.exports = function(entity) {
    if (configPersistence && configPersistence.persistenceMode == 0)
        return mapPersistence[entity]["db"];
    else
        return mapPersistence[entity]["file"];
};