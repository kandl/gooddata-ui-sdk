// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
export default class UnsupportedProperties extends React.Component {
    render() {
        return (React.createElement("div", { className: this.getClassNames() },
            React.createElement(FormattedMessage, { id: "properties.unsupported" })));
    }
    getClassNames() {
        return cx("adi-unsupported-configuration", "s-properties-unsupported");
    }
}
//# sourceMappingURL=UnsupportedProperties.js.map