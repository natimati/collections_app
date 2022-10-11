import crypto from 'crypto';

export function generateSalt() {
    return crypto.randomBytes(8).toString('hex').slice(0, 12)
};

export const hashPassword = (password: string, salt: string) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);

    return {
        salt: salt,
        password: hash.digest('hex')
    }
};

export function compare(inputPassword: string, storedPassword: string, storedSalt: string) {
    const inputPasswordHash = hashPassword(inputPassword, storedSalt)
    return inputPasswordHash.password === storedPassword
};
