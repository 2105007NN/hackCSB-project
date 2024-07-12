import { app, server, io } from "./app.js";
import dbPromise from "./db/db_init.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import notFound from "./errors/notFound.js";
import catchAsync from "./utils/catchAsync.js";
import sendResponse from "./utils/sendResponse.js";

const port = 3000;

// Use middleware and routes
app.get("/", (req, res) => {
  res.send("Express server started");
});

io.on("connection", async (socket) => {
  console.log("Client connected\n", socket.id);
});

/****************   
 * AUTH
****************/
/****************
    USERS
****************/
app.get("/users", catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM users");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    });
}));



/****************
    CATEGORY
****************/
app.get("/categories", catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM categories");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "categories retrieved successfully",
        data: result,
    });
}));

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

server.listen(port, () => {
  console.log("Server running on port", port);
});

// app.use("/users", UserRouter);
