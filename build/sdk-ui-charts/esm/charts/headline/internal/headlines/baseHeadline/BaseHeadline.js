// (C) 2023 GoodData Corporation
import React, { useCallback, useEffect } from "react";
import { defaultImport } from "default-import";
import ReactMeasure from "react-measure";
import PrimarySection from "./PrimarySection.js";
import CompareSection from "./CompareSection.js";
import { BaseHeadlineContext } from "./BaseHeadlineContext.js";
const Measure = defaultImport(ReactMeasure);
const BaseHeadline = ({ data, config, onDrill, onAfterRender }) => {
    const { primaryItem, secondaryItem, tertiaryItem } = data;
    const fireDrillEvent = useCallback((item, elementType, elementTarget) => {
        if (onDrill) {
            const itemContext = {
                localIdentifier: item.localIdentifier,
                value: item.value,
                element: elementType,
            };
            onDrill(itemContext, elementTarget);
        }
    }, [onDrill]);
    useEffect(() => {
        onAfterRender();
    });
    return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
        var _a, _b;
        return (React.createElement(BaseHeadlineContext.Provider, { value: {
                clientWidth: (_a = contentRect.client) === null || _a === void 0 ? void 0 : _a.width,
                clientHeight: (_b = contentRect.client) === null || _b === void 0 ? void 0 : _b.height,
                config,
                fireDrillEvent,
            } },
            React.createElement("div", { className: "headline", ref: measureRef },
                React.createElement(PrimarySection, { primaryItem: primaryItem, isOnlyPrimaryItem: !secondaryItem }),
                secondaryItem ? (React.createElement(CompareSection, { secondaryItem: secondaryItem, tertiaryItem: tertiaryItem })) : null)));
    }));
};
export default BaseHeadline;
//# sourceMappingURL=BaseHeadline.js.map