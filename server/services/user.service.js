var userBusiness = require('../business/user.business.js');

module.exports = function(server, processResponse) {
    
    server.get("/users", function (req, res) {
        processResponse(res, userBusiness.listUsers(req, res));
    });
    
    server.get('/users/:id', function (req, res) {
        processResponse(res, userBusiness.getUser(req, res));
    });
    
};