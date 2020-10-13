export enum DRMType {
    PLAYREADY="com.microsoft.playready",
    WIDEVINE="com.widevine.alpha",
    FAIRPLAY="com.apple.fps.1_0",
    UNKNOWN="unknown",
}

export function drmTypeFrom(drmType: string): DRMType {
    switch(drmType.toUpperCase()) {
        case "PLAYREADY":
            return DRMType.PLAYREADY;
        case "WIDEVINE":
            return DRMType.WIDEVINE;
        case "FAIRPLAY":
            return DRMType.FAIRPLAY;
        default:
            return DRMType.UNKNOWN
    }
}