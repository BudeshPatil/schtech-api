import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SHCTECH API",
      version: "1.0.0",
      description: "Authenticator API"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ],

    servers: [
      {
        url: "https://ed1s46cvgf.execute-api.us-east-1.amazonaws.com/"
      }
    ]
    // servers: [
    //   {
    //     url: "http://localhost:5015"
    //   }
    // ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };