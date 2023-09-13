// (C) 2007-2020 GoodData Corporation
import React from "react";
import { Helmet } from "react-helmet";
import compact from "lodash/compact.js";
function getEffectiveTitle(pageTitle, brandTitle) {
    return compact([pageTitle, brandTitle]).join(" - ");
}
/**
 * @internal
 */
const DocumentHeader = (props) => {
    const { pageTitle = "", brandTitle = "", appleTouchIconUrl = "", faviconUrl = "" } = props;
    return (React.createElement(Helmet, null,
        React.createElement("title", null, getEffectiveTitle(pageTitle, brandTitle)),
        React.createElement("link", { rel: "apple-touch-icon", type: "image/png", href: appleTouchIconUrl }),
        React.createElement("link", { rel: "shortcut icon", type: "image/x-icon", href: faviconUrl })));
};
export default DocumentHeader;
//# sourceMappingURL=DocumentHeader.js.map