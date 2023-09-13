// (C) 2021 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const DrillToInsight = ({ color, className, width, height }) => {
    return (React.createElement("svg", { className: className, width: width !== null && width !== void 0 ? width : 16, height: height !== null && height !== void 0 ? height : 16, viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            React.createElement("polygon", { fill: color !== null && color !== void 0 ? color : "#94A1AD", points: "3.32421875 2.17578125 3.32421875 7.42578125 11.609375 7.42578125 8.3828125 4.19921875 9.203125 3.37890625 13.8242188 8 9.203125 12.6210938 8.3828125 11.8007812 11.609375 8.57421875 3.32421875 8.57421875 3.32421875 13.8242188 2.17578125 13.8242188 2.17578125 2.17578125" }))));
};
//# sourceMappingURL=DrillToInsight.js.map