var widgetModel = {
    "id": "/WidgetModel",
    "type": "object",
    "properties": {
      "id": {"type": "number"},
      "name": {"type": "string"},
      "color": {"type": "string"},
      "price": {
          "type": "number", 
          "minimum": 0,
          "exclusiveMinimum": true
      },
      "iventory": {"type": "string"},
      "melts": { "type": "boolean" }
    }
}

module.exports = widgetModel;