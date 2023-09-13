// (C) 2019-2022 GoodData Corporation
import React from "react";
/**
 * @public
 */
export class SdkComponent extends React.Component {
    render() {
        return React.createElement("p", null, this.props.message);
    }
}
/**
 * @internal
 */
export function functionInternalToThisComponent(input) {
    return `Hello ${input}!`;
}
//# sourceMappingURL=SdkComponent.js.map