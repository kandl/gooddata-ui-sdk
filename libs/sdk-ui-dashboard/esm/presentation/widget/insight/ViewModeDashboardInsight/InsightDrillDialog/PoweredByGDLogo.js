// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { createSelector } from "@reduxjs/toolkit";
import { selectEnableCompanyLogoInEmbeddedUI, selectIsEmbedded, selectPlatformEdition, selectCanManageWorkspace, useDashboardSelector, useDashboardUserInteraction, } from "../../../../../model/index.js";
const getHref = (canManageWorkspace) => {
    const href = canManageWorkspace
        ? "https://help.gooddata.com/pages/viewpage.action?pageId=86793763&"
        : "https://gooddata.com/?";
    const utmParameters = "utm_medium=platform&utm_source=product&utm_content=logo";
    return href + utmParameters;
};
const isPoweredByGDLogoPresent = createSelector([selectIsEmbedded, selectPlatformEdition, selectEnableCompanyLogoInEmbeddedUI], (isEmbedded, platformEdition, enableCompanyLogoInEmbeddedUI) => isEmbedded && platformEdition === "free" && enableCompanyLogoInEmbeddedUI);
export const PoweredByGDLogo = ({ isSmall }) => {
    const canManageWorkspace = useDashboardSelector(selectCanManageWorkspace);
    const isPresent = useDashboardSelector(isPoweredByGDLogoPresent);
    const userInteraction = useDashboardUserInteraction();
    return (React.createElement(React.Fragment, null, isPresent ? (React.createElement("div", { className: cx("gd-powered-by-logo-wrapper", {
            "gd-powered-by-logo-wrapper-small": isSmall,
            "gd-powered-by-logo-wrapper-large": !isSmall,
        }), onClick: userInteraction.poweredByGDLogoClicked },
        React.createElement("a", { className: cx("gd-powered-by-logo-img", {
                "gd-powered-by-logo-img-small": isSmall,
                "gd-powered-by-logo-img-large": !isSmall,
            }), href: getHref(canManageWorkspace), target: "_blank", rel: "noopener noreferrer", "aria-label": "Powered by GoodData" }))) : null));
};
//# sourceMappingURL=PoweredByGDLogo.js.map