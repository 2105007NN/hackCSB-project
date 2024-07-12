import { app, server, io } from "./app.js";
// Connect database
import dbPromise from "./db/db_init.js";
import { UserRouter } from "./routes/UserRoutes.js";

const port = 3000;
(async () => {
  const db = await dbPromise;
  const users = await db.all("SELECT * FROM users");
  console.log(users);
})();

// Use middleware and routes
app.use("/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Express server started");
});

io.on("connection", async (socket) => {
  console.log("Client connected\n", socket.id);
});

server.listen(port, () => {
  console.log("Server running on port", port);
});
