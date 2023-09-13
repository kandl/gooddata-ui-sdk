// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { messages } from "../locales.js";
const getPreviewTemplate = (operator, attribute) => {
    switch (operator) {
        case "TOP":
            return attribute ? messages.topWithAttr.id : messages.topWithoutAttr.id;
        case "BOTTOM":
            return attribute ? messages.bottomWithAttr.id : messages.bottomWithoutAttr.id;
        default:
            throw new Error(`Operator '${operator}' is not supported!`);
    }
};
export const Preview = ({ operator, value, measure, attribute }) => (React.createElement("div", { className: "gd-rf-preview s-rf-preview" },
    React.createElement(FormattedMessage, { id: getPreviewTemplate(operator, attribute), tagName: "span", values: {
            measure: measure.title,
            attribute: attribute === null || attribute === void 0 ? void 0 : attribute.title,
            operator,
            value,
            strong: (chunks) => React.createElement("strong", null, chunks),
        } })));
//# sourceMappingURL=Preview.js.map