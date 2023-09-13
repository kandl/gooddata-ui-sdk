export const convertVisualizationClass = (visClass) => {
    const { content, meta } = visClass.visualizationClass;
    return {
        visualizationClass: Object.assign(Object.assign({}, content), { identifier: meta.identifier, title: meta.title, uri: meta.uri }),
    };
};
//# sourceMappingURL=VisualizationClassConverter.js.map