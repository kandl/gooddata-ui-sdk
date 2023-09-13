import cx from "classnames";
import isEqual from "lodash/isEqual.js";
import React, { useCallback, useMemo } from "react";
import { Container, ScreenClassProvider, ScreenClassRender, setConfiguration, } from "react-grid-system";
import { DashboardLayoutFacade } from "../../../_staging/dashboard/fluidLayout/facade/layout.js";
import { DASHBOARD_LAYOUT_GRID_CONFIGURATION } from "../../constants/index.js";
import { emptyDOMRect } from "../constants.js";
import { DashboardLayoutSection } from "./DashboardLayoutSection.js";
import { getLayoutWithoutGridHeights, getResizedItemPositions, unifyDashboardLayoutItemHeights, } from "./utils/sizing.js";
setConfiguration(DASHBOARD_LAYOUT_GRID_CONFIGURATION);
const removeHeights = (layout, enableCustomHeight) => {
    if (enableCustomHeight) {
        return layout;
    }
    return getLayoutWithoutGridHeights(layout);
};
const defaultSectionKeyGetter = ({ section }) => section.index().toString();
/**
 * DashboardLayout is customizable component for rendering {@link IDashboardLayout}.
 *
 * @alpha
 */
export function DashboardLayout(props) {
    const { layout, sectionKeyGetter = defaultSectionKeyGetter, sectionRenderer, sectionHeaderRenderer, itemKeyGetter, itemRenderer, widgetRenderer, gridRowRenderer, className, debug, onMouseLeave, enableCustomHeight, renderMode = "view", } = props;
    const layoutRef = React.useRef(null);
    const { layoutFacade, resizedItemPositions } = useMemo(() => {
        const updatedLayout = removeHeights(layout, !!enableCustomHeight);
        const layoutFacade = DashboardLayoutFacade.for(unifyDashboardLayoutItemHeights(updatedLayout));
        const resizedItemPositions = getResizedItemPositions(layout, layoutFacade.raw());
        return { layoutFacade, resizedItemPositions };
    }, [layout, enableCustomHeight]);
    const sectionRendererWrapped = useCallback((renderProps) => sectionRenderer ? (sectionRenderer(Object.assign(Object.assign({}, renderProps), { debug }))) : (React.createElement(renderProps.DefaultSectionRenderer, Object.assign({}, renderProps, { debug: debug }))), [debug, sectionRenderer]);
    const getLayoutDimensions = useCallback(function () {
        return (layoutRef === null || layoutRef === void 0 ? void 0 : layoutRef.current) ? layoutRef.current.getBoundingClientRect() : emptyDOMRect;
    }, []);
    const widgetRendererWrapped = useCallback((renderProps) => {
        const isResizedByLayoutSizingStrategy = resizedItemPositions.some((position) => isEqual(position, [renderProps.item.section().index(), renderProps.item.index()]));
        return widgetRenderer ? (widgetRenderer(Object.assign(Object.assign({}, renderProps), { isResizedByLayoutSizingStrategy,
            debug, getLayoutDimensions: getLayoutDimensions }))) : (React.createElement(renderProps.DefaultWidgetRenderer, Object.assign({}, renderProps, { debug: debug, isResizedByLayoutSizingStrategy: isResizedByLayoutSizingStrategy, getLayoutDimensions: getLayoutDimensions })));
    }, [debug, resizedItemPositions, widgetRenderer]);
    return (React.createElement("div", { className: cx("gd-fluidlayout-container", "s-fluid-layout-container", "gd-dashboards", className), onMouseLeave: onMouseLeave, ref: layoutRef },
        React.createElement(ScreenClassProvider, { useOwnWidth: false },
            React.createElement(ScreenClassRender, { render: (screenClass) => {
                    const screen = screenClass;
                    return screen ? (React.createElement(Container, { fluid: true, className: "gd-fluidlayout-layout s-fluid-layout" }, layoutFacade.sections().map((section) => {
                        return (React.createElement(DashboardLayoutSection, { key: sectionKeyGetter({ section, screen }), section: section, sectionRenderer: sectionRendererWrapped, sectionHeaderRenderer: sectionHeaderRenderer, itemKeyGetter: itemKeyGetter, itemRenderer: itemRenderer, gridRowRenderer: gridRowRenderer, widgetRenderer: widgetRendererWrapped, screen: screen, renderMode: renderMode, getLayoutDimensions: getLayoutDimensions }));
                    }))) : null;
                } }))));
}
//# sourceMappingURL=DashboardLayout.js.map