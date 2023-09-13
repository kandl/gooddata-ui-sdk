// (C) 2007-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { HeaderWorkspacePickerButton } from "./HeaderWorkspacePickerButton.js";
import { HeaderWorkspacePickerItem } from "./HeaderWorkspacePickerItem.js";
import { Dropdown, DropdownList } from "../Dropdown/index.js";
import { NoData } from "../NoData/index.js";
const renderProjectPickerFooter = (projectPickerFooter) => {
    const comp = (closeDropdown) => projectPickerFooter ? (React.createElement("div", { className: "gd-header-project-picker-footer" },
        React.createElement("span", { onClick: closeDropdown }, projectPickerFooter))) : (false);
    comp.displayName = "ProjectPickerFooter";
    return comp;
};
export const CoreHeaderWorkspacePicker = ({ intl, isLoading, workspaces, selectedWorkspace, totalWorkspacesCount, searchString, showSearch, onOpen, onSelect, onSearch, onScrollEnd, projectPickerFooter, className, isRenamingProjectToWorkspaceEnabled, }) => {
    const t = intl.formatMessage;
    const dropdownClassNames = cx({
        "gd-header-project-wrapper": true,
        "gd-header-measure": true,
        [className]: !!className,
    });
    const noMatchingWorkspacesId = isRenamingProjectToWorkspaceEnabled
        ? "gs.header.projectPicker.noMatchingWorkspaces"
        : "gs.header.projectPicker.noMatchingProjects";
    return (React.createElement(Dropdown, { className: dropdownClassNames, closeOnParentScroll: true, closeOnMouseDrag: true, onOpenStateChanged: (isOpen) => {
            if (isOpen && onOpen) {
                onOpen();
            }
        }, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(HeaderWorkspacePickerButton, { title: selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.title, isOpen: isOpen, onClick: toggleDropdown })), renderBody: ({ closeDropdown, isMobile }) => (React.createElement(DropdownList, { footer: renderProjectPickerFooter(projectPickerFooter), closeDropdown: closeDropdown, className: "project-picker-dropdown", width: 350, isMobile: isMobile, showSearch: showSearch, searchString: searchString, items: workspaces, itemsCount: totalWorkspacesCount, isLoading: isLoading, onSearch: onSearch, searchFieldSize: "normal", searchPlaceholder: t({ id: "gs.header.projectPicker.searchPlaceholder" }), renderNoData: ({ hasNoMatchingData }) => (React.createElement(NoData, { className: "s-noMatchingProjects", noDataLabel: t({ id: "gs.noData.noDataAvailable" }), notFoundLabel: t({ id: noMatchingWorkspacesId }), hasNoMatchingData: hasNoMatchingData })), renderItem: ({ item }) => {
                const title = item === null || item === void 0 ? void 0 : item.title;
                const isDemo = item === null || item === void 0 ? void 0 : item.isDemo;
                const isSelected = selectedWorkspace && item && selectedWorkspace.id === item.id;
                return (React.createElement(HeaderWorkspacePickerItem, { title: title, isDemo: isDemo, isSelected: isSelected, isLoading: !item, onClick: () => {
                        if (item && onSelect) {
                            onSelect(item);
                            closeDropdown();
                        }
                    } }));
            }, onScrollEnd: onScrollEnd })) }));
};
/**
 * @internal
 */
export const HeaderWorkspacePicker = injectIntl(CoreHeaderWorkspacePicker);
//# sourceMappingURL=HeaderWorkspacePicker.js.map