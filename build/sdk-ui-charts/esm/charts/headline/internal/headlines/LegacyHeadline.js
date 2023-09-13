// (C) 2007-2022 GoodData Corporation
import React, { createRef } from "react";
import ReactMeasure from "react-measure";
import { ResponsiveText } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import { formatItemValue, formatPercentageValue, getCompareSectionClasses, getDrillableClasses, } from "../utils/HeadlineDataItemUtils.js";
import noop from "lodash/noop.js";
import { HeadlinePagination, calculateHeadlineHeightFontSize, shouldRenderPagination, } from "@gooddata/sdk-ui-vis-commons";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(ReactMeasure);
/**
 * The React component that renders the Headline visualisation.
 */
class LegacyHeadline extends React.Component {
    constructor() {
        super(...arguments);
        this.secondaryItemTitleWrapperRef = createRef();
        this.handleClickOnPrimaryItem = (event) => {
            const { data: { primaryItem }, } = this.props;
            this.fireDrillEvent(primaryItem, "primaryValue", event.target);
        };
        this.handleClickOnSecondaryItem = (event) => {
            const { data: { secondaryItem }, } = this.props;
            this.fireDrillEvent(secondaryItem, "secondaryValue", event.target);
        };
        this.renderTertiaryItem = () => {
            const { data: { tertiaryItem }, } = this.props;
            const formattedItem = formatPercentageValue(tertiaryItem);
            return (React.createElement("div", { className: "gd-flex-item headline-compare-section-item headline-tertiary-item s-headline-tertiary-item" },
                React.createElement("div", { className: this.getValueWrapperClasses(formattedItem) }, formattedItem.value),
                React.createElement("div", { className: "headline-title-wrapper s-headline-title-wrapper", title: tertiaryItem.title }, tertiaryItem.title)));
        };
        this.renderSecondaryItem = () => {
            const { data: { secondaryItem }, config, } = this.props;
            const formattedItem = formatItemValue(secondaryItem, config);
            const valueClickCallback = secondaryItem.isDrillable ? this.handleClickOnSecondaryItem : null;
            const secondaryValue = secondaryItem.isDrillable
                ? this.renderHeadlineItemAsLink(formattedItem)
                : this.renderHeadlineItemAsValue(formattedItem);
            return (React.createElement("div", { className: this.getSecondaryItemClasses(secondaryItem), onClick: valueClickCallback },
                React.createElement("div", { className: "headline-value-wrapper s-headline-value-wrapper", style: formattedItem.cssStyle },
                    React.createElement(ResponsiveText, null, secondaryValue)),
                React.createElement("div", { className: "headline-title-wrapper s-headline-title-wrapper", title: secondaryItem.title, ref: this.secondaryItemTitleWrapperRef }, secondaryItem.title)));
        };
    }
    componentDidMount() {
        this.props.onAfterRender();
    }
    componentDidUpdate() {
        this.props.onAfterRender();
    }
    render() {
        return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
            var _a, _b, _c;
            return (React.createElement("div", { className: "headline", ref: measureRef },
                this.renderPrimaryItem((_a = contentRect.client) === null || _a === void 0 ? void 0 : _a.height),
                this.renderCompareItems((_b = contentRect.client) === null || _b === void 0 ? void 0 : _b.width, (_c = contentRect.client) === null || _c === void 0 ? void 0 : _c.height)));
        }));
    }
    getPrimaryItemClasses(primaryItem) {
        return cx([
            "headline-primary-item",
            "s-headline-primary-item",
            ...getDrillableClasses(primaryItem.isDrillable),
        ]);
    }
    getSecondaryItemClasses(secondaryItem) {
        return cx([
            "gd-flex-item",
            "headline-compare-section-item",
            "headline-secondary-item",
            "s-headline-secondary-item",
            ...getDrillableClasses(secondaryItem.isDrillable),
        ]);
    }
    getValueWrapperClasses(formattedItem) {
        return cx(["headline-value-wrapper", "s-headline-value-wrapper"], {
            "headline-value--empty": formattedItem.isValueEmpty,
            "s-headline-value--empty": formattedItem.isValueEmpty,
        });
    }
    fireDrillEvent(item, elementType, elementTarget) {
        const { onDrill } = this.props;
        if (onDrill) {
            const itemContext = {
                localIdentifier: item.localIdentifier,
                value: item.value,
                element: elementType,
            };
            onDrill(itemContext, elementTarget);
        }
    }
    renderCompareItems(clientWidth, clientHeight) {
        const { data: { secondaryItem }, config, } = this.props;
        if (!secondaryItem) {
            return null;
        }
        const pagination = shouldRenderPagination(config.enableCompactSize, clientWidth, clientHeight);
        if (pagination) {
            return (React.createElement("div", { className: "gd-flex-container headline-compare-section headline-paginated-compare-section" },
                React.createElement(HeadlinePagination, { renderSecondaryItem: this.renderSecondaryItem, renderTertiaryItem: this.renderTertiaryItem })));
        }
        return (React.createElement("div", { className: getCompareSectionClasses(clientWidth, this.secondaryItemTitleWrapperRef) },
            this.renderTertiaryItem(),
            this.renderSecondaryItem()));
    }
    renderHeadlineItem(item, formattedItem) {
        return item.isDrillable
            ? this.renderHeadlineItemAsLink(formattedItem)
            : this.renderHeadlineItemAsValue(formattedItem);
    }
    renderHeadlineItemAsValue(formattedItem) {
        const valueClassNames = cx(["headline-value", "s-headline-value"], {
            "headline-value--empty": formattedItem.isValueEmpty,
            "s-headline-value--empty": formattedItem.isValueEmpty,
            "headline-link-style-underline": !this.props.disableDrillUnderline,
        });
        return React.createElement("div", { className: valueClassNames }, formattedItem.value);
    }
    renderHeadlineItemAsLink(formattedItem) {
        return (React.createElement("div", { className: "headline-item-link s-headline-item-link" }, this.renderHeadlineItemAsValue(formattedItem)));
    }
    renderPrimaryItem(clientHeight) {
        const { data: { primaryItem, secondaryItem }, config, } = this.props;
        const formattedItem = formatItemValue(primaryItem, config);
        const valueClickCallback = primaryItem.isDrillable ? this.handleClickOnPrimaryItem : null;
        if (config.enableCompactSize) {
            if (!clientHeight) {
                return null;
            }
            const { height, fontSize } = calculateHeadlineHeightFontSize(!!secondaryItem, clientHeight);
            const heightStyles = { height: `${height}px`, lineHeight: `${height}px` };
            return (React.createElement("div", { className: this.getPrimaryItemClasses(primaryItem), style: Object.assign(Object.assign({}, formattedItem.cssStyle), heightStyles) },
                React.createElement("div", { style: { fontSize: `${fontSize}px` } },
                    React.createElement(ResponsiveText, null,
                        React.createElement("div", { className: "headline-value-wrapper", onClick: valueClickCallback }, this.renderHeadlineItem(primaryItem, formattedItem))))));
        }
        return (React.createElement("div", { className: this.getPrimaryItemClasses(primaryItem), style: formattedItem.cssStyle },
            React.createElement(ResponsiveText, null,
                React.createElement("div", { className: "headline-value-wrapper", onClick: valueClickCallback }, this.renderHeadlineItem(primaryItem, formattedItem)))));
    }
}
LegacyHeadline.defaultProps = {
    onDrill: () => true,
    onAfterRender: noop,
    config: {},
    disableDrillUnderline: false,
};
export default LegacyHeadline;
//# sourceMappingURL=LegacyHeadline.js.map