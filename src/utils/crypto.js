const encodeWithSecretKey = (id) => {
    const buffer = Buffer.from(id, 'utf-8');
    return buffer.toString('base64');
}

const decodeWithSecretKey = (encryptedID) => {
    const buffer = Buffer.from(encryptedID, 'base64');
    return buffer.toString('utf-8');
};

module.exports = {
    encodeWithSecretKey,
    decodeWithSecretKey
}