import {app, server, io} from './app.js'
// Connect database
import databaseRoute from "./routes/databaseRoute.js"

const port = 3000;

// app.listen(port, () => {
//     console.log('server is listening at port ' , port);
// })

server.listen(port, () => {
    console.log("Server running on port ", port)
})

io.on("connection", async(socket) => {
    console.log("Client connected\n", socket.id)
})

app.use(databaseRoute)

app.get('/', (req, res) => {
    res.send('Express server started');
})

