import {DRMConfigState} from "../reducers/DRMConfigReducer";

export const ADD_DRM_CONFIG="ADD_DRM_CONFIG";

export function addDRMConfig(drmConfig: DRMConfigState) {
    return {
        type: ADD_DRM_CONFIG,
        payload: drmConfig,
    };
}
