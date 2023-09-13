// (C) 2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Line = ({ className, width, height, color }) => {
    return (React.createElement("svg", { width: width, height: height, className: className, viewBox: "0 0 26 22", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { fill: color !== null && color !== void 0 ? color : "#B0BECA", fillRule: "evenodd" },
            React.createElement("path", { d: "M0 0h2v22H0V0zm2 20h24v2H2v-2z", fillOpacity: ".45" }),
            React.createElement("path", { fillRule: "nonzero", d: "M21.3458549 15.1025076l4.4441842-7.15931253-1.2914737-1.09342139-3.2184738 5.60194752-6.794083-9.644643-7.23269627 8.8944877L4.3439376 9.17365457l-.85858604 1.66147993 3.9071943 3.4121189 7.01252174-8.95104979z" }))));
};
//# sourceMappingURL=Line.js.map