// (C) 2019-2023 GoodData Corporation
import * as React from "react";
import { DashboardLayoutSectionHeader } from "./DashboardLayoutSectionHeader.js";
import { SectionHeaderEditable } from "./EditableHeader/SectionHeaderEditable.js";
import { emptyItemFacadeWithFullSize } from "./utils/emptyFacade.js";
import { SectionHotspot } from "../../dragAndDrop/index.js";
import { isInitialPlaceholderWidget } from "../../../widgets/index.js";
import { DashboardLayoutItemViewRenderer } from "./DashboardLayoutItemViewRenderer.js";
import { getRefsForSection } from "../refs.js";
import { selectIsSectionInsertedByPlugin, useDashboardSelector } from "../../../model/index.js";
export function DashboardLayoutEditSectionHeaderRenderer(props) {
    const { section, screen } = props;
    const sectionHeader = section.header();
    const isInitialDropzone = section.index() === 0 && section.items().every((i) => isInitialPlaceholderWidget(i.widget()));
    const refs = getRefsForSection(section);
    const isEditingDisabled = useDashboardSelector(selectIsSectionInsertedByPlugin(refs));
    return (React.createElement(DashboardLayoutItemViewRenderer, { DefaultItemRenderer: DashboardLayoutItemViewRenderer, item: emptyItemFacadeWithFullSize, screen: screen },
        React.createElement(DashboardLayoutSectionHeader, { title: sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.title, description: sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.description, renderBeforeHeader: !isInitialDropzone && React.createElement(SectionHotspot, { index: section.index(), targetPosition: "above" }), renderHeader: !isInitialDropzone && !isEditingDisabled ? (React.createElement(SectionHeaderEditable, { title: (sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.title) || "", description: (sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.description) || "", index: section.index() })) : undefined })));
}
//# sourceMappingURL=DashboardLayoutEditSectionHeaderRenderer.js.map