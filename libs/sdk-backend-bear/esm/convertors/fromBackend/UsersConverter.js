import { uriRef } from "@gooddata/sdk-model";
const getUserFullName = (firstName, lastName) => {
    if (!firstName && !lastName) {
        return undefined;
    }
    return [firstName, lastName].filter(Boolean).join(" ");
};
export const convertUser = (user) => {
    const { email, login, firstName, lastName, links } = user;
    return {
        ref: uriRef(links.self),
        email: email,
        login: login,
        firstName,
        lastName,
        fullName: getUserFullName(firstName, lastName),
    };
};
export const convertWorkspaceUser = (user) => {
    const getStatusFromState = (state) => {
        switch (state) {
            case "ACTIVE":
                return "ENABLED";
            case "INACTIVE":
                return "DISABLED";
            default:
                return;
        }
    };
    const { email, login, uri, firstName, lastName, state } = user;
    const status = getStatusFromState(state);
    const statusProp = status ? { status } : {};
    return Object.assign({ ref: uriRef(uri), email,
        login,
        uri, firstName: firstName !== null && firstName !== void 0 ? firstName : undefined, lastName: lastName !== null && lastName !== void 0 ? lastName : undefined, fullName: getUserFullName(firstName, lastName) }, statusProp);
};
export const convertUsersItem = (user) => {
    const { content: { email, login, firstname, lastname, status }, links, } = user;
    const statusProp = status ? { status } : {};
    return Object.assign({ ref: uriRef(links.self), uri: links.self, email: email, login: login, firstName: firstname, lastName: lastname, fullName: getUserFullName(firstname, lastname) }, statusProp);
};
//# sourceMappingURL=UsersConverter.js.map