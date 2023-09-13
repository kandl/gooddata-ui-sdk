// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { getTranslation } from "../utils/translations";
import { messages } from "../../locales";
export class DisabledBubbleMessage extends React.PureComponent {
    render() {
        const { className, children, intl } = this.props;
        return (React.createElement(BubbleHoverTrigger, { className: className },
            children,
            React.createElement(Bubble, { className: this.getBubbleClassNames(), alignPoints: [{ align: "cr cl" }] }, getTranslation(messages.notApplicable.id, intl))));
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.props.showDisabledMessage,
        });
    }
}
export default injectIntl(DisabledBubbleMessage);
//# sourceMappingURL=DisabledBubbleMessage.js.map