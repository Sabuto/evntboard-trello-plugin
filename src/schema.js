// http://json-schema.org/learn/getting-started-step-by-step.html

const schema = {
  "type": "object",
  "properties": {
    "key": {
      "description": "The key you get from Trello",
      "type": "string"
    },
    "token": {
      "description": "The token you get from Trello",
      "type": "string"
    }
  },
  "required": [ "key", "token" ]
}

module.exports = schema
