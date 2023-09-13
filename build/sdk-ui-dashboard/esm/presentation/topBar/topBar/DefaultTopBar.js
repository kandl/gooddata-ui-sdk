// (C) 2021-2022 GoodData Corporation
import React, { useCallback } from "react";
import { renameDashboard, selectDashboardShareInfo, selectDashboardTitle, selectIsExport, selectIsReadOnly, selectPersistedDashboard, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
import { ButtonBar, DefaultButtonBar } from "../buttonBar/index.js";
import { DefaultMenuButton, MenuButton, useDefaultMenuItems } from "../menuButton/index.js";
import { Title } from "../title/index.js";
import { HiddenTopBar } from "./HiddenTopBar.js";
import { DefaultLockedStatus, DefaultShareStatus } from "../shareIndicators/index.js";
import { useCancelButtonProps, useEditButtonProps, useSaveAsNewButtonProps, useSaveButtonProps, useShareButtonProps, } from "../buttonBar/button/index.js";
/**
 * @alpha
 */
export const useTopBarProps = () => {
    const dispatch = useDashboardDispatch();
    const title = useDashboardSelector(selectDashboardTitle);
    const isReadOnly = useDashboardSelector(selectIsReadOnly);
    const shareInfo = useDashboardSelector(selectDashboardShareInfo);
    const persistedDashboard = useDashboardSelector(selectPersistedDashboard);
    const defaultMenuItems = useDefaultMenuItems();
    const shareButtonProps = useShareButtonProps();
    const editButtonProps = useEditButtonProps();
    const cancelButtonProps = useCancelButtonProps();
    const saveButtonProps = useSaveButtonProps();
    const saveAsNewButtonProps = useSaveAsNewButtonProps();
    const onTitleChanged = useCallback((title) => {
        dispatch(renameDashboard(title));
    }, [dispatch]);
    return {
        menuButtonProps: { menuItems: defaultMenuItems, DefaultMenuButton: DefaultMenuButton },
        titleProps: {
            title,
            onTitleChanged: isReadOnly ? undefined : onTitleChanged,
        },
        buttonBarProps: {
            shareButtonProps,
            editButtonProps,
            cancelButtonProps,
            saveButtonProps,
            saveAsNewButtonProps,
            DefaultButtonBar: DefaultButtonBar,
        },
        shareStatusProps: {
            shareStatus: shareInfo.shareStatus,
            // new dashboards are considered under strict control as well for the share status purposes
            isUnderStrictControl: !persistedDashboard || !!persistedDashboard.isUnderStrictControl,
        },
        lockedStatusProps: {
            isLocked: !!shareInfo.isLocked,
        },
        DefaultTopBar,
    };
};
const TopBarCore = (props) => {
    const { menuButtonProps, titleProps, buttonBarProps, shareStatusProps, lockedStatusProps } = props;
    return (React.createElement("div", { className: "dash-header s-top-bar" },
        React.createElement("div", { className: "dash-header-inner" },
            React.createElement(DefaultLockedStatus, Object.assign({}, lockedStatusProps)),
            React.createElement(Title, Object.assign({}, titleProps)),
            React.createElement(DefaultShareStatus, Object.assign({}, shareStatusProps)),
            React.createElement(ButtonBar, Object.assign({}, buttonBarProps))),
        React.createElement(MenuButton, Object.assign({}, menuButtonProps))));
};
/**
 * @alpha
 */
export function DefaultTopBar(props) {
    const isExport = useDashboardSelector(selectIsExport);
    if (isExport) {
        return React.createElement(HiddenTopBar, Object.assign({}, props));
    }
    return React.createElement(TopBarCore, Object.assign({}, props));
}
//# sourceMappingURL=DefaultTopBar.js.map