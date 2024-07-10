import express from 'express';
import {auth} from './src/middleware/authMiddleware.js';
import routes from "./src/routes/index.js";
import cors from "cors";

const app = express(); 
const router = express.Router();
router.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: '*', // Specify allowed headers, including 'email'
}));

app.use(express.json());
// display user page
router.get('/', function(req, res, 
    next) {      
    console.log("hello world!!");
    res.send("hello world!");
});

// Mount the router on the root path
app.use('/api', routes);

app.listen(3000, () => {
    console.log("Listening on port 3000…");
});
