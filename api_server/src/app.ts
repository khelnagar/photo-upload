import app from './Server';

// Start the server
const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
