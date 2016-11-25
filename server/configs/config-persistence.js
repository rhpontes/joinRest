// ************************************************************
// The file goal is become possible change persistence mode 
// ************************************************************

var config = {
    "url": "mongodb://localhost:27017/widgets",
    "persistenceMode": 0 // 0 - Persist mode mongoDB / 1 - Persist mode file
};

module.exports = config;