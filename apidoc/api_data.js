define({ "api": [
  {
    "type": "post",
    "url": "/schools",
    "title": "Create a School",
    "name": "CreateSchool",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the school. This field is required. Maximum length of the name is 100</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address of the school. Maximum length of the address is 1000</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "noOfStudents",
            "description": "<p>number of students</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "created",
            "description": "<p>school data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"_id\":\"5fe5e6bac89605315223d944\",\n    \"name\":\"Sandalwood Middle School\",\n    \"address\":\"542 Bald Hill Ave Riverview, FL 33569\",\n    \"noOfStudents\":312,\n    \"createdAt\":\"2020-12-25T13:18:50.547Z\",\n    \"updatedAt\":\"2020-12-25T13:18:50.547Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>validation error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GenericError",
            "description": "<p>generic error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"School validation failed: name: maximum length is 100\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Some error occurred while retrieving schools\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/routes/school.routes.js",
    "groupTitle": "School"
  },
  {
    "type": "delete",
    "url": "/schools",
    "title": "Remove (delete) all Schools",
    "name": "DeleteSchools",
    "group": "School",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "empty",
            "description": "<p>array</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GenericError",
            "description": "<p>Generic error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Some error occurred while retrieving schools\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/routes/school.routes.js",
    "groupTitle": "School"
  },
  {
    "type": "get",
    "url": "/schools?name=:name&address=:address&search=:search",
    "title": "Get Schools",
    "name": "GetSchools",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the school. Part of the name would match the records</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address of the school. Part of the address would match the records</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>full text search string. Full text search is done to match both name and address</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "matching",
            "description": "<p>school data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n    {\n     \"_id\":\"5fe5e6bac89605315223d944\",\n     \"name\":\"Sandalwood Middle School\",\n     \"address\":\"542 Bald Hill Ave Riverview, FL 33569\",\n     \"noOfStudents\":312,\n     \"createdAt\":\"2020-12-25T13:18:50.547Z\",\n     \"updatedAt\":\"2020-12-25T13:18:50.547Z\"\n  },\n    {\n     \"_id\":\"5fe5e6bac89605315223d949\",\n     \"name\":\"Frozen Lake Academy\",\n     \"address\":\"52 Longbranch Ave Carlisle, PA 17013\",\n     \"noOfStudents\":542,\n     \"createdAt\":\"2020-12-25T13:18:50.555Z\",\n     \"updatedAt\":\"2020-12-25T13:18:50.555Z\"\n  },\n    {\n     \"_id\":\"5fe5e6bac89605315223d948\",\n     \"name\":\"Westwood Charter School\",\n     \"address\":\"686 W. Studebaker Ave Petersburg, VA 23803\",\n     \"noOfStudents\":124,\n     \"createdAt\":\"2020-12-25T13:18:50.554Z\",\n     \"updatedAt\":\"2020-12-25T13:18:50.554Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GenericError",
            "description": "<p>Generic error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Some error occurred while retrieving schools\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/routes/school.routes.js",
    "groupTitle": "School"
  }
] });
