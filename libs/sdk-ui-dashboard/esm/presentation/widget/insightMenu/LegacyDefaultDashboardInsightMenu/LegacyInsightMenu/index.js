// (C) 2019-2022 GoodData Corporation
import React from "react";
import { objRefToString, widgetRef } from "@gooddata/sdk-model";
import { Bubble, ItemsWrapper } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
import { LegacyInsightMenuItem } from "./LegacyInsightMenuItem.js";
import { DOWNLOADER_ID } from "../../../../../_staging/fileUtils/downloadFile.js";
const alignPoints = [{ align: "bc tr", offset: { x: 2, y: 0 } }];
const ignoredOutsideClickClasses = [`#${DOWNLOADER_ID}`];
export const LegacyInsightMenu = ({ widget, items, onClose }) => {
    const widgetRefValue = widgetRef(widget);
    const exportWidgetRefAsString = objRefToString(widgetRefValue);
    return (React.createElement(Bubble, { alignTo: `.s-dash-item-action-options-${stringUtils.simplifyText(exportWidgetRefAsString)}`, alignPoints: alignPoints, className: "bubble-light options-menu-bubble s-options-menu-bubble", closeOnOutsideClick: true, 
        // we need to ignore the "clicks" on the hidden downloader link to prevent the menu from closing
        // when the download starts (if the user opened it again before the download was ready)
        ignoreClicksOnByClass: ignoredOutsideClickClasses, onClose: onClose },
        React.createElement(ItemsWrapper, { smallItemsSpacing: true }, items.map((item) => {
            // legacy menu does not support separators
            if (item.type !== "button") {
                return null;
            }
            return (React.createElement(LegacyInsightMenuItem, { key: item.itemId, bubbleId: item.itemId, bubbleMessage: item.tooltip, className: item.className, isDisabled: item.disabled, title: item.itemName, onClick: item.onClick }));
        }))));
};
//# sourceMappingURL=index.js.map