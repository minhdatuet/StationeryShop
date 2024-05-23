const express = require('express');
require('dotenv/config');
const cors = require('cors');
const session = require('express-session');
const initRoutes = require('./src/routes/index.js');
const connectDatabase = require('./src/config/connectDatabase.js');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_KEY, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if you use HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Middleware to log session details for debugging
// app.use((req, res, next) => {
//     console.log('Session ID:', req.sessionID);
//     console.log('Session Data:', req.session);
//     next();
// });

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
    console.log(`Server is running on port ${listener.address().port}`);
});
