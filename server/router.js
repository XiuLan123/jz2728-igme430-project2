const router = (app) => {

    // put this AFTER the other `app.get(...`
    // for any request that doesn't match one above, send back React's index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
};

module.exports = router;