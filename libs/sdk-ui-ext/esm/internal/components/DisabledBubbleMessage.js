// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { getTranslation } from "../utils/translations.js";
import { messages } from "../../locales.js";
class DisabledBubbleMessage extends React.PureComponent {
    render() {
        const { className, alignPoints, children, intl, messageId = messages.notApplicable.id } = this.props;
        return (React.createElement(BubbleHoverTrigger, { className: className },
            children,
            React.createElement(Bubble, { className: this.getBubbleClassNames(), alignPoints: alignPoints }, getTranslation(messageId, intl))));
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.props.showDisabledMessage,
        });
    }
}
DisabledBubbleMessage.defaultProps = {
    alignPoints: [{ align: "cr cl" }],
};
export { DisabledBubbleMessage };
export default injectIntl(DisabledBubbleMessage);
//# sourceMappingURL=DisabledBubbleMessage.js.map