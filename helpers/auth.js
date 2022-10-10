const crypto = require('crypto');

function generateSalt() {
    return crypto.randomBytes(8).toString('hex').slice(0, 12)
};

const hashPassword = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);

    return {
        salt: salt,
        password: hash.digest('hex')
    }
};

function compare(inputPassword, storedPassword, storedSalt) {
    const inputPasswordHash = hashPassword(inputPassword, storedSalt)
    return inputPasswordHash.password === storedPassword
};

module.exports = { compare, generateSalt, hashPassword };