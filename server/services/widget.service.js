var widgetBusiness = require('../business/widget.business.js');

module.exports = function(server, processResponse) {
    
    server.get("/widgets", function (req, res) {
        processResponse(res, widgetBusiness.listWidgets(req, res));
    });
    
    server.get('/widgets/:id', function (req, res) {
        processResponse(res, widgetBusiness.getWidget(req, res));
    });
    
    server.post('/widgets', function (req, res) {
        processResponse(res, widgetBusiness.addWidget(req, res));
    });
    
    server.put('/widgets/:id', function (req, res) {
        processResponse(res, widgetBusiness.updateWidget(req, res));
    });
    
};