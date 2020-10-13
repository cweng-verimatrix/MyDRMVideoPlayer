export const ADD_TOKEN_HEADER = "ADD_TOKEN_HEADER";
export const ADD_TOKEN_PAYLOAD = "ADD_TOKEN_PAYLOAD";

export function addTokenHeader(tokenHeader: any) {
    return {
        type: ADD_TOKEN_HEADER,
        payload: tokenHeader
    }
}

export function addTokenPayload(tokenPayload: any) {
    return {
        type: ADD_TOKEN_PAYLOAD,
        payload: tokenPayload
    };
}
