const express = require('express');

/* Create the overall app-object, which will contain all middleware, such as routes and other settings.  */
const app = express();

/* Settings for how the requests and responses are encoded */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Setting header allowing requests from our future React front end */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

/* Routes */
app.use('/users', require('./routes/userRoute'));

/* Error handling on the app-level (unless caught and handled elsewhere) */
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({ error: err.message, stack: err.stack || 'Unknown error' });
  }
});

module.exports = app;
