
const crypto = require('crypto');

const secretKey = process.env.APP_KEY;
const secretIV = process.env.IV_SECRET;

const encodeWithSecretKey = (id) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secretKey).digest();
    const iv = Buffer.from(secretIV, 'hex');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encoded = cipher.update(id.toString(), 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
}

const decodeWithSecretKey = (encodedId) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secretKey).digest();
    const iv = Buffer.from(secretIV, 'hex');

    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encodedId, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        throw 'Api key tidak terdaftar!';
    }
};

module.exports = {
    encodeWithSecretKey,
    decodeWithSecretKey
}