cloudappi
============

RESTful backend based on Node.js and MongoDB


#### Heroku domain


> https://cloudappi-app.herokuapp.com



#### Endpoints


> /users/getusers
```bash
"get": {
        "description": "Get all users",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/user"
              }
            }
          }
        }
      }
```


> /users/createUsers
```bash
 "post": {
        "parameters": [
          {
            "in": "body",
            "name": "user",
            "schema": {
              "$ref": "#/definitions/user"
            },
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "CREATED",
            "schema": {
              "$ref": "#/definitions/user"
            }
          },
          "405": {
            "description": "Invalid input"
          }
        }
      }
```

> /users/getusersById/{userId}
```bash
"get": {
        "description": "Get one user",
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/user"
            }
          },
          "400": {
            "description": "Invalid user id"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```

> /users/updateUsersById/{userId}
```bash
"put": {
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          },
          {
            "in": "body",
            "name": "user",
            "schema": {
              "$ref": "#/definitions/user"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/user"
            }
          },
          "400": {
            "description": "Invalid user id"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```

> /users/deleteUsersById/{userId}
```bash
"delete": {
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Invalid user id"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```

#### Definitions


```bash
"user": {
      "properties": {
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "birthDate": {
          "type": "string",
          "format": "LocalDateTime",
          "description": "LocalDateTime type"
        },
        "address": {
          "$ref": "#/definitions/address"
        }
      }
    },
"address": {
      "properties": {
        "id": {
          "type": "integer"
        },
        "street": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        }
      }
    }
```

#### Running test

Run next command from CLI:
```bash
npm run test
```