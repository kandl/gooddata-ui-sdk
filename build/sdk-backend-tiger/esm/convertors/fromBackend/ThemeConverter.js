// (C) 2022 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
export const convertThemeWithLinks = ({ id, attributes, links, }) => ({
    id,
    ref: idRef(id),
    title: attributes.name,
    theme: attributes.content,
    uri: links.self,
    description: "",
    type: "theme",
    production: false,
    unlisted: false,
    deprecated: false,
});
export const convertTheme = ({ data: { id, attributes, type }, links, }) => convertThemeWithLinks({ id, attributes, links, type });
//# sourceMappingURL=ThemeConverter.js.map