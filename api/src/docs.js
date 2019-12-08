import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

// swagger definition
const swaggerDefinition = {
  info: {
    title: "SMS Conversions Api",
    version: "1.0.0",
    description: "..."
  },
  basePath: "/api"
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [path.join(__dirname, "routes/api.js")]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default app => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
