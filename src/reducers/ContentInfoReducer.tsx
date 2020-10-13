import {ADD_CONTENT_NAME, ADD_CONTENT_TYPE, ADD_CONTENT_URL, ADD_AUTH_HEADER} from "../actions/ContentInfoActions";

// Sample initial state for debugging purposes
// const initialState = {
//     contentName: "Big Bucks Bunny PlayReady Content",
//     contentURL: "https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest(format=mpd-time-csf)",
//     authHeader: "",
// };

const initialState = {
    contentName: "",
    contentURL: "",
    authHeader: ""
};

const contentInfo = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_CONTENT_NAME:
            return {
                ...state,
                contentName: action.payload
            };
        case ADD_CONTENT_URL:
            return {
                ...state,
                contentURL: action.payload,
            };
        case ADD_CONTENT_TYPE:
            return {
                ...state,
                contentType: action.payload,
            };
        case ADD_AUTH_HEADER:
            return {
                ...state,
                authHeader: action.payload,
            };
        default:
            return state;
    }
};

export default contentInfo;