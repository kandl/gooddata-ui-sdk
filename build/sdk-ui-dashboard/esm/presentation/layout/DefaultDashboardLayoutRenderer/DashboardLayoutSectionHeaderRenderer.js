// (C) 2019-2022 GoodData Corporation
import * as React from "react";
import { DashboardLayoutItemViewRenderer } from "./DashboardLayoutItemViewRenderer.js";
import { DashboardLayoutSectionHeader } from "./DashboardLayoutSectionHeader.js";
import { emptyItemFacadeWithFullSize } from "./utils/emptyFacade.js";
export function DashboardLayoutSectionHeaderRenderer(props) {
    const { section, screen } = props;
    const sectionHeader = section.header();
    return sectionHeader ? (React.createElement(DashboardLayoutItemViewRenderer, { DefaultItemRenderer: DashboardLayoutItemViewRenderer, item: emptyItemFacadeWithFullSize, screen: screen },
        React.createElement(DashboardLayoutSectionHeader, { title: sectionHeader.title, description: sectionHeader.description }))) : null;
}
//# sourceMappingURL=DashboardLayoutSectionHeaderRenderer.js.map