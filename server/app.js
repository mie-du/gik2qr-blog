const express = require('express');

/* Create the overall app-object, which will contain all middleware, such as routes and other settings.  */
const app = express();

/* Settings for how the requests and responses are encoded */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Setting headers */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});

/* Logging */
app.use((req, res, next) => {
  console.log('.....');
  console.log(
    `${new Date().toLocaleTimeString()} Request: ${req.protocol}://${req.get(
      'host'
    )}${req.url} method: ${req.method}`
  );
  next();
});

/* Routes */
app.use('/users', require('./routes/userRoute'));
app.use('/posts', require('./routes/postRoute'));
app.use('/blog', require('./routes/blogDataRoute'));

/* Error handling on the app-level (unless caught and handled elsewhere) */
app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message, stack: err.stack || 'Unknown error' });
  }
});

module.exports = app;
