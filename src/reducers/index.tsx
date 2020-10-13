import { combineReducers } from 'redux';
import contentInfoList from './ContentInfoListReducer';
import drmConfig from "./DRMConfigReducer";
import contentInfo from "./ContentInfoReducer";
import tokenInfo from "./TokenInfoReducer";

export default combineReducers({
    contentInfo,
    contentInfoList,
    drmConfig,
    tokenInfo,
});