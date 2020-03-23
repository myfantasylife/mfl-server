const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const APP_PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true })); // Extract data from form element and add them to body property in the request object

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});

app.post('/quotes', (req, res) => {
    console.log('Req:', req.body)
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;