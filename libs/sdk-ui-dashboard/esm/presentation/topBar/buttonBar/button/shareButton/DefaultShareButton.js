// (C) 2021-2022 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
import { uiActions, useDashboardDispatch, useDashboardSelector } from "../../../../../model/index.js";
import { HiddenShareButton } from "./HiddenShareButton.js";
import { selectIsShareButtonVisible } from "../selectors.js";
/**
 * @internal
 */
export function useShareButtonProps() {
    const dispatch = useDashboardDispatch();
    const onShareButtonClick = useCallback(() => dispatch(uiActions.openShareDialog()), [dispatch]);
    const isVisible = useDashboardSelector(selectIsShareButtonVisible);
    return {
        isVisible,
        onShareButtonClick,
    };
}
/**
 * @alpha
 */
export const DefaultShareButton = ({ isVisible, onShareButtonClick, }) => {
    const intl = useIntl();
    if (!isVisible) {
        return React.createElement(HiddenShareButton, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: () => onShareButtonClick(), value: intl.formatMessage({ id: "share.button.text" }), className: "gd-button-secondary dash-header-share-button s-header-share-button gd-button gd-icon-users" })));
};
//# sourceMappingURL=DefaultShareButton.js.map