export const itemToString = (item) => {
    if ((item === null || item === void 0 ? void 0 : item.type) === "option" && item.label) {
        return item.label;
    }
    return "";
};
export const getSelectableItems = (selectItems) => selectItems.filter((item) => item.type === "option");
//# sourceMappingURL=utils.js.map