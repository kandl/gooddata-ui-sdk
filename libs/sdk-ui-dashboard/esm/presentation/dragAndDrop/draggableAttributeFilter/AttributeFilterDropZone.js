// (C) 2021-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger, Icon } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { useDashboardDrop } from "../useDashboardDrop.js";
import { useDashboardSelector, selectIsInEditMode } from "../../../model/index.js";
import { getDropZoneDebugStyle } from "../debug.js";
export function AttributeFilterDropZone({ targetIndex, onDrop }) {
    var _a, _b;
    const theme = useTheme();
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const [{ canDrop, isOver, itemType }, dropRef] = useDashboardDrop(["attributeFilter", "attributeFilter-placeholder"], {
        drop: () => onDrop(targetIndex),
    }, [targetIndex]);
    const isDraggingAttribute = itemType !== undefined && itemType === "attributeFilter";
    if (!isEditMode || isDraggingAttribute) {
        return null;
    }
    const isActive = canDrop || isOver;
    const dropzoneClassNames = cx("attr-filter-dropzone-box", "s-last-filter-drop-position", "s-attr-filter-dropzone-box", { "attr-filter-dropzone-box-active": isActive }, { "attr-filter-dropzone-box-over": isOver });
    const debugStyle = getDropZoneDebugStyle({ isOver });
    return (React.createElement("div", { className: "attr-filter-dropzone-box-outer", style: debugStyle, ref: dropRef }, isActive ? (React.createElement("div", { className: dropzoneClassNames },
        React.createElement("div", { className: "attr-filter-dropzone-box-inner" },
            React.createElement(FormattedMessage, { id: "filterBar.filter.drop" })))) : (React.createElement(BubbleHoverTrigger, null,
        React.createElement("div", { className: dropzoneClassNames },
            React.createElement("div", { className: "attr-filter-dropzone-box-inner" },
                React.createElement(FormattedMessage, { id: "filterBar.filter.addFilterPlaceholder", values: {
                        icon: (React.createElement(Icon.AttributeFilter, { className: "attribute-filter-icon", width: 14, height: 14, color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c6 })),
                    } }))),
        React.createElement(Bubble, { alignPoints: [{ align: "bc tc", offset: { x: 0, y: 0 } }] },
            React.createElement(FormattedMessage, { id: "filterBar.filter.dropzone.tooltip" }))))));
}
//# sourceMappingURL=AttributeFilterDropZone.js.map