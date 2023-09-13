export function loadAvailableDisplayFormRefs(ctx, displayForms) {
    const { backend, workspace } = ctx;
    return backend
        .workspace(workspace)
        .attributes()
        .getAttributeDisplayForms(displayForms)
        .then((references) => references.map((df) => df.ref));
}
//# sourceMappingURL=loadAvailableDisplayFormRefs.js.map