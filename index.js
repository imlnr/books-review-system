const express = require("express")
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { connection } = require("./config/db");
const { BooksRouter } = require("./routes/book.routes");
const { userRouter } = require("./routes/user.routes");
const { ReviewRoutes } = require("./routes/reveiw.routes");
const PORT = process.env.PORT || 4500;

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books Review API',
            version: '1.0.0',
            description: 'API documentation for Books Review System',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'Bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(cors())
app.use(express.json());

// Swagger UI endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/books", BooksRouter);
app.use("/user", userRouter);
app.use("/review", ReviewRoutes)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to db...")
        console.log("your server is running at http://localhost:4500")
    } catch (error) {

    }
})
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to Books Review API" })
})

