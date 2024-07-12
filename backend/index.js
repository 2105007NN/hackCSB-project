import { app, server, io } from "./app.js";
import dbPromise from "./db/db_init.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import notFound from "./errors/notFound.js";
import catchAsync from "./utils/catchAsync.js";
import sendResponse from "./utils/sendResponse.js";
import UserRoutes from "./routes/UserRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"

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
app.use('/users',UserRoutes)
app.use('/categories',CategoryRoutes)

//global error handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

server.listen(port, () => {
  console.log("Server running on port", port);
});

// app.use("/users", UserRouter);
