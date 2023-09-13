// (C) 2019-2020 GoodData Corporation
/**
 * Get displayName of React component
 * @internal
 */
const getDisplayName = (Component) => {
    return Component.displayName || Component.name || "Component";
};
/**
 * Wrap displayName of React component
 * @internal
 */
export const wrapDisplayName = (hocName, BaseComponent) => {
    return (Component) => {
        const componentName = getDisplayName(BaseComponent || Component);
        Component.displayName = `${hocName}(${componentName})`;
        return Component;
    };
};
//# sourceMappingURL=wrapDisplayName.js.map