export const convertTheme = (id, theme) => {
    return {
        type: "theme",
        id,
        attributes: {
            name: theme.title || "",
            content: theme.theme,
        },
    };
};
//# sourceMappingURL=ThemeConverter.js.map