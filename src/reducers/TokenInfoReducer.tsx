import {ADD_TOKEN_HEADER, ADD_TOKEN_PAYLOAD} from "../actions/TokenInfoAction";

const initialState = {
    tokenHeader: {
        "alg": "ES256",
        "typ": "JWT",
        "kid": "1ab45440-532c-4399-94dc-5c5ad9584bac"
    },
    tokenPayload: {
        "multirights": {
            "policy": {
                "license_duration": 36000,
                "can_play": true,
                "can_persist": true
            }
        },
        "aud": "urn:verimatrix:multidrm",
        "iss": "demo_user",
        "sub": "meridian"
    }
};

const tokenInfo = (state=initialState, action: any) => {
    switch(action) {
        case ADD_TOKEN_HEADER:
            return {
                ...state,
                tokenHeader: action.payload
            };
        case ADD_TOKEN_PAYLOAD:
            return {
                ...state,
                tokenPayload: action.payload
            };
        default:
            return state;
    }
};

export default tokenInfo;