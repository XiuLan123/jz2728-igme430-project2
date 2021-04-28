const clientold = require('./client-old');

const router = (app) => {
    app.get('*', (req,res)=>{
        res.send("eqweqwew");
    });
};

module.exports = router;
