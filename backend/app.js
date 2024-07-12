import express from "express";
import cors from "cors"
// Stuff for socket.io
import {Server} from 'socket.io'
import http from 'http'
// import { UserRouter } from "./routes/User/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//from which folder express will use static files
app.use(express.static("public"));

// Create socket-server and associate app with http and socket
const server = http.createServer(app)
const io = new Server(server, {
    cors : {
        origin: "*",
        methods : ["GET", "POST"]
    }
})


export {app, server, io};


