// (C) 2022 GoodData Corporation
export const isValueSetting = (obj) => {
    if (!obj || Object.keys(obj).length !== 1) {
        return false;
    }
    return typeof obj.value === "string";
};
export const unwrapSettingContent = (content) => {
    if (isValueSetting(content)) {
        return content.value;
    }
    return content;
};
//# sourceMappingURL=SettingsConverter.js.map