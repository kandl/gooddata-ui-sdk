// (C) 2007-2022 GoodData Corporation
import React, { Component, createRef } from "react";
import cx from "classnames";
import { injectIntl } from "react-intl";
import { stringUtils } from "@gooddata/util";
import { InsightListItemDate, getDateTimeConfig } from "./InsightListItemDate.js";
import { Button } from "../Button/index.js";
import { ShortenedText } from "../ShortenedText/index.js";
import { DescriptionPanel, DESCRIPTION_PANEL_ARROW_OFFSETS } from "../DescriptionPanel/index.js";
const VISUALIZATION_TYPE_UNKNOWN = "unknown";
const WIDGET_TYPE_KPI = "kpi";
const visualizationIconWidthAndPadding = 42;
const tooltipAlignPoints = [
    {
        align: "cr cl",
    },
    {
        align: "cl cr",
        offset: {
            x: -visualizationIconWidthAndPadding,
            y: 0,
        },
    },
];
const modifiedArrowOffsets = Object.assign(Object.assign({}, DESCRIPTION_PANEL_ARROW_OFFSETS), { "cr cl": [30, 0] });
/**
 * @internal
 */
export class InsightListItemCore extends Component {
    constructor() {
        super(...arguments);
        this.shortenedTextRef = createRef();
        this.handleClickDelete = (e) => {
            e.stopPropagation();
            const { onDelete } = this.props;
            if (onDelete) {
                this.props.onDelete();
            }
        };
        this.renderLock = () => {
            if (this.props.isLocked) {
                return React.createElement("i", { className: "gd-icon-lock" });
            }
            return false;
        };
        this.renderUpdatedDateTime = (date) => {
            const { type, metadataTimeZone } = this.props;
            if (!date) {
                return false;
            }
            if (type === WIDGET_TYPE_KPI) {
                return React.createElement("span", null);
            }
            const dateTimeConfig = getDateTimeConfig(date, { dateTimezone: metadataTimeZone });
            return React.createElement(InsightListItemDate, { config: dateTimeConfig });
        };
        this.shouldRenderActions = () => !!this.props.onDelete;
        this.renderActions = () => {
            return (this.shouldRenderActions() && (React.createElement("div", { className: "gd-visualizations-list-item-actions" },
                React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-button-small\n                        gd-icon-trash gd-visualizations-list-item-action-delete s-delete-item", onClick: this.handleClickDelete }))));
        };
    }
    render() {
        const { title, description, updated, type = VISUALIZATION_TYPE_UNKNOWN, isSelected, isLoading, onClick, onDescriptionPanelOpen, showDescriptionPanel = false, } = this.props;
        const iconClassName = cx("gd-vis-type", `gd-vis-type-${type}`);
        const visualizationListItemClassname = cx("gd-visualizations-list-item", `s-${stringUtils.simplifyText(title)}`, {
            "is-selected": isSelected,
        });
        return (React.createElement("div", { className: visualizationListItemClassname, onClick: onClick },
            this.renderActions(),
            showDescriptionPanel ? (React.createElement("div", { className: "gd-visualizations-list-item-description" },
                React.createElement(DescriptionPanel, { onBubbleOpen: onDescriptionPanelOpen, title: title, description: description, arrowOffsets: this.shouldRenderActions() ? modifiedArrowOffsets : undefined }))) : null,
            React.createElement("div", { className: "gd-visualizations-list-item-content" },
                React.createElement("div", { className: "gd-visualizations-list-item-content-name" },
                    this.renderLock(),
                    React.createElement(ShortenedText, { ref: this.shortenedTextRef, tooltipAlignPoints: tooltipAlignPoints, displayTooltip: !showDescriptionPanel }, isLoading
                        ? this.props.intl.formatMessage({ id: "gs.visualizationsList.loading" })
                        : title)),
                React.createElement("div", { className: "gd-visualizations-list-item-content-date" }, this.renderUpdatedDateTime(updated))),
            React.createElement("div", { className: "gd-vis-type-container" },
                React.createElement("div", { className: iconClassName }))));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.width !== this.props.width && this.shortenedTextRef.current) {
            this.shortenedTextRef.current.recomputeShortening();
        }
    }
}
/**
 * @internal
 */
export const InsightListItem = injectIntl(InsightListItemCore);
//# sourceMappingURL=InsightListItem.js.map