export const ADD_CONTENT_NAME = "ADD_CONTENT_NAME";
export const ADD_CONTENT_URL = "ADD_CONTENT_URL";
export const ADD_CONTENT_TYPE = "ADD_CONTENT_TYPE";
export const ADD_AUTH_HEADER = "ADD_AUTH_HEADER";
export const ADD_CONTENT = "ADD_CONTENT";
export const UPDATE_CONTENT = "UPDATE_CONTENT";

export function updateContent(content: any, contentList: any) {
    for (let i = 0; i < contentList.length; i++) {
        if (contentList[i].id == content.id) {
            contentList[i] = content;
        }
    }
    console.log(contentList);

    return {
        type: UPDATE_CONTENT,
        payload: contentList
    };
}

export function addContent(content: any) {
    return {
        type: ADD_CONTENT,
        payload: content
    };
}

export function addContentName(contentName: string) {
    return {
        type: ADD_CONTENT_NAME,
        payload: contentName,
    };
}

export function addContentURL(contentURL: string) {
    return {
        type: ADD_CONTENT_URL,
        payload: contentURL,
    };
}

export function addContentType(contentType: string) {
    return {
        type: ADD_CONTENT_TYPE,
        payload: contentType,
    };
}

export function addContentAuthHeader(authHeader: string) {
    return {
        type: ADD_AUTH_HEADER,
        payload: authHeader,
    };
}
