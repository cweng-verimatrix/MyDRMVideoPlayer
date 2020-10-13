import {DRMType} from "../../typing/DRMTypes";
import ShakaPlayer from "shaka-player-react";

export default (controllerRef: any, drmConfig: any, authHeader: string, contentURL: string) => {
    const {
        /** @type {shaka.player} */ player,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        /** @type {shaka.ui.Overlay} */ ui,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        /** @type {HTMLVideoElement} */ videoElement,
    }: any = controllerRef.current;


    async function loadDRM() {
        if (player) {
            // Standard DRM configuration
            player.configure({
                drm: {
                    servers: {
                        [`${DRMType.WIDEVINE.valueOf()}`]: drmConfig.wideVineLicenseURL,
                        [`${DRMType.PLAYREADY.valueOf()}`]: drmConfig.playReadyLicenseURL,
                        [`${DRMType.FAIRPLAY.valueOf()}`]: drmConfig.fairPlayLicenseURL,
                    }
                }
            });

            // FairPlay Support
            // @ts-ignore
            const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
            const shaka = require('shaka-player');
            if (isSafari && player?.getNetworkingEngine() && shaka) {
                const req = await fetch(drmConfig.certificateURL);
                const cert = await req.arrayBuffer();
                player.configure('drm.advanced.com\\.apple\\.fps\\.1_0.serverCertificate', new Uint8Array(cert));

                // Add safari specific transform for FP
                player.configure('drm.initDataTransform', (initData: any) => {
                    // 'initData' is a buffer containing an 'skd://' URL as a UTF-8 string.
                    const skdUri = shaka.util.StringUtils.fromBytesAutoDetect(initData);
                    let contentId = skdUri.slice(6);
                    let base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=|[A-Z0-9+/]{4})$/i;
                    let isBase64Valid = base64Regex.test(contentId);
                    if (isBase64Valid) {
                        const raw = atob(contentId);
                        let result = '';
                        for (let i = 0; i < raw.length; i++) {
                            const hex = raw.charCodeAt(i).toString(16);
                            result += (hex.length === 2 ? hex : '0' + hex);
                        }
                        if (result.length === 32) {
                            contentId = result;
                        } else {
                            console.info(`Length not 16 - ${result.length} - ${result}`);
                        }
                    }
                    console.info('Content ID ' + contentId);
                    const cert = player.drmInfo().serverCertificate;
                    console.info('Cert ' + cert);
                    return shaka.util.FairPlayUtils.initDataTransform(initData, contentId, cert);
                });

                player.getNetworkingEngine().registerRequestFilter((type: any, request: any) => {
                    if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
                        return;
                    }

                    const originalPayload = new Uint8Array(request.body);
                    console.info('Original Payload ' + originalPayload);
                    const base64Payload =
                        shaka.util.Uint8ArrayUtils.toStandardBase64(originalPayload);
                    console.info('New payload ' + base64Payload);
                    const params = {
                        'spc': base64Payload
                    };
                    request.headers['Content-Type'] = 'application/json';
                    request.body = shaka.util.StringUtils.toUTF8(JSON.stringify(params));
                    console.log(request.body);
                    console.log(request);
                });


                player.getNetworkingEngine().registerResponseFilter((type: any, response: any) => {
                    console.log('got response ', type);
                    if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
                        return;
                    }
                    console.log('in response filter');
                    // Parse JSON response
                    let responseText = ShakaPlayer.util.StringUtils.fromUTF8(response.data);
                    console.log('responseText', responseText);
                    responseText = JSON.parse(responseText.trim());
                    // Decode the base64-encoded data into the format the browser expects.
                    console.log(responseText.ckc);
                    response.data = ShakaPlayer.util.Uint8ArrayUtils.fromBase64(responseText.ckc).buffer;
                });

            } else if (player?.getNetworkingEngine() && shaka) {
                player.getNetworkingEngine().registerRequestFilter(function (type: any, request: any) {
                    if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
                        return;
                    }

                    if (authHeader && authHeader.length > 0) {
                        request.headers['Authorization'] = authHeader;
                        return;
                    }

                    // TODO: obtain token from an auth server if an url is provided
                    // const authRequest = {
                    //     uris: [authTokenServer],
                    //     method: 'POST',
                    // };
                    // const requestType = shaka.net.NetworkingEngine.RequestType.APP;
                    // return player.getNetworkingEnginer().request(requestType, authRequest).promise.then((response: any) => {
                    //     authToken = shaka.util.StringUtils.fromUTF8(response.data);
                    //     request.headers['CWIP-Auth-Header'] = authToken;
                    // });
                });
            }
        }
    }

    async function loadAsset() {
        // Load an asset.
        await player.load(contentURL);
    }


    loadDRM().catch((err) => {
        console.error(err);
    });
    loadAsset().catch((err) => {
        console.error(err);
    });
};