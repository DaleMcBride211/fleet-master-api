const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config(); // Ensure your env variables are loaded

const app = express();
const PORT = process.env.PORT || 8080;

// 1. Connect to Database
connectDB();

// 2. Global Middleware
// The cors() package handles the Origin, Methods, and Headers for you.
app.use(cors({
  origin: '*', // For development. Change to your frontend URL in production.
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Required if you decide to send cookies from a frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session Configuration
// Session must be initialized BEFORE passport.session()
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretworkaround',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// 4. Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
// All routes (including auth and protected ones) are handled here
app.use('/', require('./routes'));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. Docs at http://localhost:${PORT}/api-docs/`);
});