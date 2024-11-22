import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import http from 'http';
import socketIo from 'socket.io';

import { connectionWithDB } from "./src/config/databaseConnection";
import { databaseName } from './database';
import { IPortFrontend } from './src/interfaces/portFrontend.interface';
import BrowserRouter from './src/routes/indexRoutes';
import Event from './src/models/event.model';

let portsFrontend: IPortFrontend[] = [
    {
        id: 0,
        name: "Angular",
        port: 4200
    },
    {
        id: 1,
        name: "React and Vue.js using Vite",
        port: 5173
    },
    {
        id: 2,
        name: "Vue.js",
        port: 8080
    },
    {
        id: 3,
        name: "Create React App and Next.JS",
        port: 3000
    },
    {
        id: 4,
        name: "Svelte",
        port: 3000
    },
    {
        id: 5,
        name: "Ember.js",
        port: 4200
    },
    {
        id: 6,
        name: "Nuxt.js",
        port: 3000
    },
    {
        id: 7,
        name: "Quasar (Vue.js)",
        port: 3000
    },
    {
        id: 8,
        name: "Gatsby",
        port: 8080
    }
];

let originUrlFront: string = `http://localhost:${portsFrontend[1].port}`;

let portBackend: number = 7000;

connectionWithDB(databaseName);

const app: express.Application = express();

const server = http.createServer(app);

const io = new socketIo.Server(server, {
    cors: {
        origin: originUrlFront,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: ['Content-Type'],
    }
});

io.on('connection', (socket: any) => {

    socket.emit('welcome', { msg: 'Hello from server' });

    socket.on('getEvents', async () => {

        const _id = socket.handshake.query._id;

        if (!_id) {
            console.error("User ID is required");
            return socket.emit('getEvents', []);
        }

        try {
            const events = await Event.find({ user: _id });

            if (events.length === 0) {
                console.log("No events found for user:", _id);
                socket.emit('getEvents', []);
                return;
            }

            socket.emit('getEvents', events);

        } catch (error) {
            console.error("Error fetching events:", error);
            socket.emit('getEvents', []);
        }
    });

    socket.on('addEvent', (newEvent) => {
        console.log('New Event Received:', newEvent);
        io.emit('newEvent', newEvent);
    });

    socket.on('deleteEvent', (_id) => {
        console.log('New Event Received:', _id);
        io.emit('deleteEvent', _id);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
})

app.use(express.json());

app.use(cors({ origin: originUrlFront }));

app.use(cors());

app.use((_req: Request, _res: Response, next: NextFunction) => {
    _res.header('Access-Control-Allow-Origin', '*');
    _res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', BrowserRouter);

server.listen(portBackend, (): void => {
    console.info(`Connect Express with Socket.io on port: ${portBackend}`);
});