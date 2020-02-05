const mongoose = require('mongoose');

const welcome = (req, res) => {
    res.send('Welcome!');
};

module.exports ={ welcome};
