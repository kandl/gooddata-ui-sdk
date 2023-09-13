import flatMap from "lodash/flatMap.js";
import React, { useMemo } from "react";
import { DashboardLayoutGridRow } from "./DashboardLayoutGridRow.js";
import { DashboardLayoutSectionHeaderRenderer } from "./DashboardLayoutSectionHeaderRenderer.js";
import { DashboardLayoutSectionRenderer } from "./DashboardLayoutSectionRenderer.js";
import { DashboardLayoutSectionOverlayController } from "../DashboardItemOverlay/DashboardItemOverlayController.js";
import last from "lodash/last.js";
import { DashboardLayoutGridRowEdit } from "./DashboardLayoutGridRowEdit.js";
const defaultSectionRenderer = (props) => (React.createElement(DashboardLayoutSectionRenderer, Object.assign({}, props)));
const defaultHeaderRenderer = (props) => (React.createElement(DashboardLayoutSectionHeaderRenderer, Object.assign({}, props)));
const defaultItemKeyGetter = ({ item }) => item.index().toString();
export function DashboardLayoutSection(props) {
    const { section, sectionRenderer = defaultSectionRenderer, sectionHeaderRenderer = defaultHeaderRenderer, itemKeyGetter = defaultItemKeyGetter, gridRowRenderer, itemRenderer, widgetRenderer, getLayoutDimensions, screen, renderMode, } = props;
    const renderProps = { section, screen, renderMode };
    const items = useMemo(() => {
        if (renderMode === "edit") {
            const itemsInRowsByIndex = section
                .items()
                .asGridRows(screen)
                .map((itemsInRow) => [last(itemsInRow).index(), itemsInRow]);
            const itemsInRow = section.items().all();
            return (React.createElement(DashboardLayoutGridRowEdit, { screen: screen, itemsInRowsByIndex: itemsInRowsByIndex, section: section, items: itemsInRow, gridRowRenderer: gridRowRenderer, itemKeyGetter: itemKeyGetter, itemRenderer: itemRenderer, widgetRenderer: widgetRenderer, renderMode: renderMode, getLayoutDimensions: getLayoutDimensions }));
        }
        return flatMap(section.items().asGridRows(screen), (itemsInRow, index) => {
            return (React.createElement(DashboardLayoutGridRow, { key: index.toString(), screen: screen, section: section, items: itemsInRow, gridRowRenderer: gridRowRenderer, itemKeyGetter: itemKeyGetter, itemRenderer: itemRenderer, widgetRenderer: widgetRenderer, renderMode: renderMode, getLayoutDimensions: getLayoutDimensions }));
        });
    }, [
        getLayoutDimensions,
        gridRowRenderer,
        itemKeyGetter,
        itemRenderer,
        renderMode,
        screen,
        section,
        widgetRenderer,
    ]);
    return sectionRenderer(Object.assign(Object.assign({}, renderProps), { DefaultSectionRenderer: DashboardLayoutSectionRenderer, children: (React.createElement(React.Fragment, null,
            sectionHeaderRenderer({
                section,
                screen,
                DefaultSectionHeaderRenderer: DashboardLayoutSectionHeaderRenderer,
            }),
            items,
            renderMode === "edit" ? React.createElement(DashboardLayoutSectionOverlayController, { section: section }) : null)) }));
}
//# sourceMappingURL=DashboardLayoutSection.js.map