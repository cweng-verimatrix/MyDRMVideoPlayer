import ec from 'js-crypto-ec';
import RSA from 'node-rsa';
import jwkToPem from 'jwk-to-pem';
import keyUtils from  'js-crypto-key-utils';

async function generateKeyPair(alg: string) {
    let key;
    switch(alg) {
        case 'ES256':
            key = await ec.generateKey('P-256');
            break;
        case 'ES384':
            key = await ec.generateKey('P-384');
            break;
        case 'ES512':
            key = await ec.generateKey('P-521');
            break;
        case 'RS256':
            key = new RSA({b: 256});
            break;
        case 'RS384':
            key = new RSA({b: 384});
            break;
        case 'RS512':
            key = new RSA({b: 512});
            break;
        default:
            key = await ec.generateKey('P-256');
    }
    if (key?.privateKey && key?.publicKey) {
        return [jwkToPem(key.privateKey, {private: true}), jwkToPem(key.publicKey, {private: false})];
    } else if (key) {
        const privateKey = key.exportKey("pkcs8");
        const keyObj = new keyUtils.Key('pem', privateKey);
        const publicKey = await keyObj.export('pem', {outputPublic: true});

        return [privateKey, publicKey];
    } else {
        throw new Error("Failed to generate key pair.");
    }
}

export default generateKeyPair;
