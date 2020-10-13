import jwt from 'jsonwebtoken';

async function generateToken(algo: any, privatePem: string, header: string, payload: string) {
    let token;
    try {
        const headerObj = JSON.parse(header);
        const payloadObj = JSON.parse(payload);
        const options = {
            algorithm: algo,
            keyid: headerObj.kid,
            header: headerObj
        };
        token = jwt.sign(payloadObj, privatePem, options);
    } catch (err) {
        console.log(err);
    }
    return token;
}