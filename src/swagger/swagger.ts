import {setup, serve, } from 'swagger-ui-express';
import { Router } from 'express';

const swaggerRoutes = Router()

const options = {
  openapi:"3.0.1",
  info:{
      title:"Brand  API documentation",
      version:"1.0.0",
      description:"This is swagger documentations for Brand "
  },
  servers:[
      {
          url: 'https://mybrand-bcke.onrender.com/',
      },
      {
          url: 'http://localhost:5000',
      }
  ],
  basePath:"/",
  security:[
      {
          bearToken:[]
      }
  ],
  tags: [
    { name: "Users", description: "Endpoints related to users" },
    { name: "Blogs", description: "Endpoints related to blogs" },
    { name: "Comments", description: "Endpoints related to comments" },
    { name: "Likes", description: "Endpoints related to likes" },
    { name: "Queries", description: "Endpoints related to queries" },
  ],
  paths:{
    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the user to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the user to update",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
            200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "Not Found",
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the user to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "Not Found",
          },
        },
      },
    },
    "/api/v1/users/login": {
      post: {
        tags: ["Users"],
        summary: "Authenticate user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/blogs": {
      get: {
        tags: ["Blogs"],
        summary: "Get all blogs",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Blog",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Blogs"],
        security: [{ bearerAuth: [] }],
        summary: "Create a new blog",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/api/blogs/{id}": {
      get: {
        tags: ["Blogs"],
        summary: "Get blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
      patch: {
        tags: ["Blogs"],
        security: [{ bearerAuth: [] }],
        summary: "Update blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog to update",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "Not Found",
          },
        },
      },
      delete: {
        tags: ["Blogs"],
        security: [{ bearerAuth: [] }],
        summary: "Delete blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "Not Found",
          },
        },
      },
    },
    "/api/blogs/{id}/comments": {
      post: {
        tags: ["Comments"],
        summary: "Add a comment to a blog post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Comment",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
      get: {
        tags: ["Comments"],
        summary: "Get comments of a blog post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Comment",
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
    },
    "/api/blogs/{id}/likes": {
      post: {
        tags: ["Likes"],
        summary: "Like a blog post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Blog liked successfully",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
      get: {
        tags: ["Likes"],
        summary: "Get likes of a blog post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the blog post",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Like",
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
    },
    "/api/querries": {
        post: {
          tags: ["Querries"],
          summary: "Create a new query",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                    $ref: "#/components/schemas/Query",
                  },
              },
            },
          },
          responses: {
            201: {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Query",
                  },
                },
              },
            },
            400: {
              description: "Bad request",
            },
          },
        },
        get: {
          tags: ["Querries"],
          summary: "Get all queries",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Query",
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/api/queries/{id}": {
        delete: {
          tags: ["Queries"],
          summary: "Delete a query by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the query to delete",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            204: {
              description: "No Content",
            },
            404: {
              description: "Not Found",
            },
          },
        },
      },
      },
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
              username: {
                type: "string",
              },
              email: {
                type: "string",
                format: "email",
              },
              password: {
                type: "string",
              },
            },
          },
          Blog: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              content: {
                type: "string",
              },
              image: {
                type: "string",
                format: "binary",
              },
            },
          },
          Comment: {
            type: "object",
            properties: {
              content: {
                type: "string",
                description: "Content of the comment",
              },
            },
          },
          Like: {
            type: "object",
            properties: {
              blog: {
                type: "string",
                description: "ID of the liked blog",
              },
              user: {
                type: "string",
                description: "ID of the user who liked the blog",
              },
              like: {
                type: "boolean",
                description: "Indicates if the blog is liked or not",
              },
            },
          },
          Query: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name of the person making the query",
              },
              email: {
                type: "string",
                format: "email",
                description: "Email of the person making the query",
              },
              message: {
                type: "string",
                description: "Query message",
              },
            },
          },
        },
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            in: "header",
            name: "Authorization",
          },
        },
      },
  
  

}


swaggerRoutes.use("/", serve, setup(options));

export default swaggerRoutes;