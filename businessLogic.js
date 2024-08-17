const { getBooksByTitle } = require('./dataAccess');

function searchBooks(title, callback) {
    getBooksByTitle(title, (err, books) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, books);
    });
}

module.exports = { searchBooks };

