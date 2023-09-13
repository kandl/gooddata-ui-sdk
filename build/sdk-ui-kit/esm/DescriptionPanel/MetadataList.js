// (C) 2022-2023 GoodData Corporation
import React from "react";
import isEmpty from "lodash/isEmpty.js";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
const ARROW_OFFSETS = {
    "cr cl": [13, 0],
    "cl cr": [-13, 0],
    "tc bc": [0, -13],
    "bc tc": [0, 13],
};
const ALIGN_POINTS = [{ align: "cr cl" }, { align: "tc bc" }, { align: "bc tc" }, { align: "cl cr" }];
/**
 * @internal
 */
export const MetadataList = ({ title, list }) => (React.createElement("div", { className: "gd-metadata-list" },
    title ? React.createElement("div", { className: "gd-metadata-list-title" }, title) : null, list === null || list === void 0 ? void 0 :
    list.map((element, index) => (React.createElement("div", { className: "gd-metadata-list-element", key: index },
        React.createElement("span", { title: element.title }, element.title),
        !isEmpty(element.description) && (React.createElement(BubbleHoverTrigger, { className: "gd-metadata-list-icon", showDelay: 0, hideDelay: 0 },
            React.createElement("div", { className: "gd-icon-circle-question" }),
            React.createElement(Bubble, { className: "bubble-primary", arrowOffsets: ARROW_OFFSETS, alignPoints: ALIGN_POINTS }, element.description))))))));
//# sourceMappingURL=MetadataList.js.map