// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { uriRef, idRef } from "@gooddata/sdk-model";
/**
 * To preserve the typing and bootstrap concept, we are using firstName
 * as a container for full name and lastname will be an empty string
 */
export const convertUser = (user) => {
    const { name, userId, links, organizationName } = user;
    return {
        ref: uriRef(links.user),
        login: userId,
        fullName: name,
        organizationName: organizationName,
    };
};
function isJsonApiUserIdentifierOutAttributes(attributes) {
    const typedAttributes = attributes;
    return (!isEmpty(typedAttributes) &&
        (typedAttributes.firstname !== undefined ||
            typedAttributes.lastname !== undefined ||
            typedAttributes.email !== undefined));
}
/**
 * Convert user identifier link from relationships.[createdBy/modifiedBy] to {@link IUser} object.
 * @param userIdentifierLinkage - information about user link from relationships data attribute.
 * @param included - included objects to the entity query
 * @returns converted user or undefined if link is empty or does not link to anything in included array
 */
export function convertUserIdentifier(userIdentifierLinkage, included = []) {
    if (!(userIdentifierLinkage === null || userIdentifierLinkage === void 0 ? void 0 : userIdentifierLinkage.data)) {
        return undefined;
    }
    const { id, type } = userIdentifierLinkage.data;
    return included
        .filter((user) => user.id === id && user.type === type)
        .map((user) => {
        var _a, _b, _c;
        const userDetails = isJsonApiUserIdentifierOutAttributes(user.attributes)
            ? {
                email: (_a = user.attributes) === null || _a === void 0 ? void 0 : _a.email,
                firstName: (_b = user.attributes) === null || _b === void 0 ? void 0 : _b.firstname,
                lastName: (_c = user.attributes) === null || _c === void 0 ? void 0 : _c.lastname,
            }
            : {};
        return Object.assign({ ref: idRef(user.id), login: user.id }, userDetails);
    })[0];
}
//# sourceMappingURL=UsersConverter.js.map