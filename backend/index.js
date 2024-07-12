import {app, server, io} from './app.js'
// Connect database
import dbPromise from './db/db_init.js'

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

app.get('/', (req, res) => {
    res.send('Express server started');
})

app.get('/users', async(req, res)=>{
    try {
        const db = await dbPromise
        const users = await db.all("SELECT * FROM user")
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})