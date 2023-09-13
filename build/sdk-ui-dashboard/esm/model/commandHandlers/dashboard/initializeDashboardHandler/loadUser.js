export function loadUser(ctx) {
    const { backend } = ctx;
    return backend.currentUser().getUser();
}
//# sourceMappingURL=loadUser.js.map