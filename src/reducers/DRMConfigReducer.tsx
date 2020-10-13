import {ADD_DRM_CONFIG} from "../actions/DRMConfigAction";

export type DRMConfigState = {
    fairPlayLicenseURL: string,
    fairPlayCertificateURL: string,
    wideVineLicenseURL: string,
    playReadyLicenseURL: string,
}

const initialState = {
    fairPlayLicenseURL: "https://lafiducia.vsaas.na1.verimatrixdevcloud.net/fairplay?iv=ACA3D239405C46058948FD26828D3EC8",
    fairPlayCertificateURL: "assets/fps_certificate.der",
    wideVineLicenseURL: "https://amssamples.keydelivery.mediaservices.windows.net/Widevine/?KID=1ab45440-532c-4399-94dc-5c5ad9584bac",
    playReadyLicenseURL: "https://amssamples.keydelivery.mediaservices.windows.net/PlayReady/"
};

const drmConfig = (state=initialState, action: any) => {
    switch (action.type) {
        case ADD_DRM_CONFIG:
            return {
                fairPlayLicenseURL: action.payload.fairPlayLicenseURL,
                fairPlayCertificateURL: action.payload.fairPlayCertificateURL,
                wideVineLicenseURL: action.payload.wideVineLicenseURL,
                playReadyLicenseURL: action.payload.playReadyLicenseURL,
            };
        default:
            return state;
    }
};

export default drmConfig;