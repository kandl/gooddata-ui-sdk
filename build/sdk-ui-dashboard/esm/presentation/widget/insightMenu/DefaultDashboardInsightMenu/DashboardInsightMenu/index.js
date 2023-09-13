// (C) 2021-2022 GoodData Corporation
import React, { useState } from "react";
import { Separator } from "@gooddata/sdk-ui-kit";
import { DashboardInsightMenuContainer } from "./DashboardInsightMenuContainer.js";
import { DashboardInsightMenuItemButton } from "./DashboardInsightMenuItemButton.js";
import { DashboardInsightSubmenuContainer } from "./DashboardInsightSubmenuContainer.js";
import { selectRenderMode, useDashboardSelector } from "../../../../../model/index.js";
import { DashboardInsightMenuBubble } from "./DashboardInsightMenuBubble.js";
import { DashboardInsightEditMenuBubble } from "./DashboardInsightEditMenuBubble.js";
const DashboardInsightMenuBody = (props) => {
    const { items, widget, insight, submenu, setSubmenu, onClose, renderMode } = props;
    return submenu ? (React.createElement(DashboardInsightSubmenuContainer, { onClose: onClose, title: submenu.itemName, onBack: () => setSubmenu(null) },
        React.createElement(submenu.SubmenuComponent, { widget: widget }))) : (React.createElement(DashboardInsightMenuContainer, { onClose: onClose, widget: widget, insight: insight, renderMode: renderMode },
        React.createElement(DashboardInsightMenuRoot, { items: items, setSubmenu: setSubmenu })));
};
export const DashboardInsightMenu = (props) => {
    const { widget, onClose } = props;
    const renderMode = useDashboardSelector(selectRenderMode);
    const [submenu, setSubmenu] = useState(null);
    return renderMode === "edit" ? (React.createElement(DashboardInsightEditMenuBubble, { onClose: onClose, isSubmenu: !!submenu },
        React.createElement(DashboardInsightMenuBody, Object.assign({}, props, { submenu: submenu, setSubmenu: setSubmenu, renderMode: renderMode })))) : (React.createElement(DashboardInsightMenuBubble, { onClose: onClose, widget: widget, isSubmenu: !!submenu },
        React.createElement(DashboardInsightMenuBody, Object.assign({}, props, { submenu: submenu, setSubmenu: setSubmenu, renderMode: renderMode }))));
};
const DashboardInsightMenuRoot = ({ items, setSubmenu }) => {
    return (React.createElement(React.Fragment, null, items.map((item) => {
        if (item.type === "separator") {
            return React.createElement(Separator, { key: item.itemId });
        }
        if (item.type === "submenu") {
            return (React.createElement(DashboardInsightMenuItemButton, Object.assign({ key: item.itemId }, item, { onClick: () => setSubmenu(item), submenu: true })));
        }
        return React.createElement(DashboardInsightMenuItemButton, Object.assign({ key: item.itemId }, item));
    })));
};
//# sourceMappingURL=index.js.map