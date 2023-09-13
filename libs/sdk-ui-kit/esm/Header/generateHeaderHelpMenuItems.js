import { generateSupportUrl } from "../utils/featureFlags.js";
/**
 * @internal
 */
const addUTMParameters = (baseUrl, utmContent, isBranded = false) => isBranded
    ? baseUrl
    : `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}utm_medium=platform&utm_source=product&utm_content=${utmContent}`;
/**
 * @internal
 */
export function generateHeaderHelpMenuItems(documentationUrl, supportForumUrl, userEmail, workspaceId, sessionId, supportEmail, isBranded, featureFlags = {}) {
    const universityUrl = "https://university.gooddata.com";
    const communityUrl = "https://community.gooddata.com";
    const { enableUniversityHelpMenuItem, enableCommunityHelpMenuItem } = featureFlags;
    const helpMenuItems = [];
    if (documentationUrl) {
        helpMenuItems.push({
            key: "gs.header.documentation",
            className: "s-documentation",
            href: addUTMParameters(documentationUrl, "main_menu_help_documentation", isBranded),
            target: "_blank",
        });
    }
    if (enableUniversityHelpMenuItem && !isBranded) {
        helpMenuItems.push({
            key: "gs.header.university",
            className: "s-university",
            href: addUTMParameters(universityUrl, "main_menu_help_university", isBranded),
            target: "_blank",
        });
    }
    if (enableCommunityHelpMenuItem && !isBranded) {
        helpMenuItems.push({
            key: "gs.header.community",
            className: "s-community",
            href: addUTMParameters(communityUrl, "main_menu_help_community", isBranded),
            target: "_blank",
        });
    }
    if (supportForumUrl) {
        helpMenuItems.push({
            key: "gs.header.visitSupportPortal",
            className: "s-support-portal",
            href: addUTMParameters(supportForumUrl, "main_menu_help_support", isBranded),
            target: "_blank",
        });
    }
    if (!isBranded) {
        const supportUrl = generateSupportUrl(workspaceId, sessionId, userEmail, window.location.href);
        helpMenuItems.push({
            key: "gs.header.submitTicket",
            className: "s-submit-ticket",
            href: addUTMParameters(supportUrl, "main_menu_help_ticket", isBranded),
            target: "_blank",
        });
    }
    else if (supportEmail) {
        helpMenuItems.push({
            key: "gs.header.submitTicket",
            className: "s-submit-ticket",
            href: `mailto:${supportEmail}`,
            target: "_blank",
        });
    }
    return helpMenuItems;
}
//# sourceMappingURL=generateHeaderHelpMenuItems.js.map