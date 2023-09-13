// (C) 2023 GoodData Corporation
import { useEffect, useMemo, useState } from "react";
import { objRefToString } from "@gooddata/sdk-model";
import { stringUtils } from "@gooddata/util";
import isNil from "lodash/isNil.js";
const LOCAL_STORAGE_KEY_PREFIX = "gdc_share_dialog_admin_message_visible_";
const createLocalStorageKey = (currentUserRef) => LOCAL_STORAGE_KEY_PREFIX + stringUtils.simplifyText(objRefToString(currentUserRef));
const getLocalStorageValue = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    const value = JSON.parse(item);
    return isNil(value) ? defaultValue : value;
};
export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => getLocalStorageValue(key, defaultValue));
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
};
export const useAdminInformationMessageState = (currentUserRef) => {
    const localStorageKey = useMemo(() => createLocalStorageKey(currentUserRef), [currentUserRef]);
    const [isMessageVisible, setIsMessageVisible] = useLocalStorage(localStorageKey, true);
    const handleMessageClose = () => setIsMessageVisible(false);
    return {
        isMessageVisible,
        handleMessageClose,
    };
};
//# sourceMappingURL=useAdminInformationMessage.js.map