// (C) 2007-2022 GoodData Corporation
import React from "react";
import { PositionedMenuContent } from "./PositionedMenuContent.js";
import { RenderChildrenInPortal } from "../utils/RenderChildrenInPortal.js";
const Wrapper = ({ children }) => (React.createElement("div", { className: "gd-menuPosition-wrapper" }, children));
const PortalIfTopLevelMenu = ({ topLevelMenu, children, portalTarget, }) => topLevelMenu ? (React.createElement(RenderChildrenInPortal, { targetElement: portalTarget }, children)) : (React.createElement(React.Fragment, null, children));
class MenuPosition extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            togglerElInitialized: false,
        };
        this.togglerEl = null;
        this.setTogglerEl = (el) => {
            this.togglerEl = el;
            this.setState({
                togglerElInitialized: true,
            });
        };
    }
    // React Measure is not used because it cannot detect the left/top coordinate
    // changes of absolute positioned blocks. This caused problems where left/top
    // positions from React Measure were outdated. To solve this we do the
    // measurements manually in PositionedMenuContent at the correct time.
    render() {
        const { portalTarget, topLevelMenu, contentWrapper: ContentWrapper, toggler, opened, alignment, spacing, offset, togglerWrapperClassName, children, } = this.props;
        // Top level menu uses React portals to be rendered in body element (or
        // any element specified in targetElement prop). Any submenus are rendered
        // inside of previous menu, so they do not need any portals.
        const MaybeWrapper = topLevelMenu ? React.Fragment : Wrapper;
        return (React.createElement(MaybeWrapper, null,
            React.createElement("div", { className: topLevelMenu ? togglerWrapperClassName : undefined, ref: this.setTogglerEl }, toggler),
            React.createElement(PortalIfTopLevelMenu, { portalTarget: portalTarget, topLevelMenu: topLevelMenu }, opened && this.state.togglerElInitialized ? (React.createElement(ContentWrapper, null,
                React.createElement(PositionedMenuContent, { alignment: alignment, spacing: spacing, offset: offset, topLevelMenu: topLevelMenu, togglerEl: this.togglerEl }, children))) : null)));
    }
}
MenuPosition.defaultProps = {
    contentWrapper: React.Fragment,
};
export { MenuPosition };
//# sourceMappingURL=MenuPosition.js.map