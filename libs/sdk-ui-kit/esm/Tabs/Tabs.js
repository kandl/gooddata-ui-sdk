// (C) 2020-2022 GoodData Corporation
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import noop from "lodash/noop.js";
/**
 * @internal
 */
class Tabs extends Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.state = {
            selectedTabId: props.selectedTabId || ((_b = (_a = props.tabs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id),
        };
    }
    selectTab(tab) {
        const selectedTabId = tab === null || tab === void 0 ? void 0 : tab.id;
        const noChange = selectedTabId === this.state.selectedTabId;
        if (noChange) {
            return;
        }
        this.setState({
            selectedTabId,
        });
        this.props.onTabSelect(tab);
    }
    renderTab(tab) {
        const tabClassName = cx({
            "is-active": tab.id === this.state.selectedTabId,
            "gd-tab": true,
            [`s-${stringUtils.simplifyText(tab.id)}`]: true,
        });
        return (React.createElement("div", { "aria-label": stringUtils.simplifyText(tab.id), className: tabClassName, key: tab.id, onClick: () => {
                this.selectTab(tab);
            } },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: tab.id }))));
    }
    renderTabs() {
        return this.props.tabs.map(this.renderTab, this);
    }
    render() {
        const classNames = cx(this.props.className, {
            "gd-tabs": true,
            small: true,
        });
        return (React.createElement("div", { role: "tabs", className: classNames }, this.renderTabs()));
    }
}
Tabs.defaultProps = {
    className: "",
    onTabSelect: noop,
    selectedTabId: "",
    tabs: [],
};
export { Tabs };
//# sourceMappingURL=Tabs.js.map