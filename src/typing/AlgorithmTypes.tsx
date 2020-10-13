export enum EcAlgorithmType {
    ES256="P-256",
    ES384="P-384",
    ES512="P-521",
    UNKNOWN="UNKNOWN"
}

export enum RsaAlgorithmType {
    RS256=256,
    RS384=384,
    RS512=512,
    UNKNOWN=-1
}

export function ecAlgorithmTypeFrom(algorithmType: string): string {
    const keyName = Object.keys(EcAlgorithmType).filter((key) => EcAlgorithmType[key as keyof typeof EcAlgorithmType] === algorithmType);
    return (keyName && keyName.length > 0) ? keyName[0] : "UNKNOWN";
}

export function rsaAlgorithmTypeFrom(keySize: number): string {
    const keyName = Object.keys(RsaAlgorithmType).filter((key) => RsaAlgorithmType[key as keyof typeof RsaAlgorithmType] === keySize);
    return (keyName && keyName.length > 0) ? keyName[0] : "UNKNOWN";
}
