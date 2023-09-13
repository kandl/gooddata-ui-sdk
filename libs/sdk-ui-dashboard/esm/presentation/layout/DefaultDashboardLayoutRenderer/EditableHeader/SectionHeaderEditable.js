// (C) 2019-2022 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { EditableLabelWithBubble } from "./EditableLabelWithBubble.js";
import { getTitle, getDescription, MAX_TITLE_LENGTH, TITLE_LENGTH_WARNING_LIMIT, MAX_DESCRIPTION_LENGTH, DESCRIPTION_LENGTH_WARNING_LIMIT, } from "./sectionHeaderHelper.js";
import { changeLayoutSectionHeader, uiActions, useDashboardDispatch } from "../../../../model/index.js";
export function SectionHeaderEditable(props) {
    const description = getDescription(props.description);
    const title = getTitle(props.title);
    const { index } = props;
    const intl = useIntl();
    const dispatch = useDashboardDispatch();
    const changeTitle = useCallback((title) => dispatch(changeLayoutSectionHeader(index, { title }, true)), [dispatch, index]);
    const changeDescription = useCallback((description) => dispatch(changeLayoutSectionHeader(index, { description }, true)), [dispatch, index]);
    const onEditingStart = useCallback(() => {
        dispatch(uiActions.setActiveSectionIndex(index));
    }, [dispatch, index]);
    const onEditingEnd = useCallback(() => {
        dispatch(uiActions.clearActiveSectionIndex());
    }, [dispatch]);
    const onTitleSubmit = useCallback((title) => {
        changeTitle(title);
        onEditingEnd();
    }, [changeTitle, onEditingEnd]);
    const onDescriptionSubmit = useCallback((description) => {
        changeDescription(description);
        onEditingEnd();
    }, [changeDescription, onEditingEnd]);
    return (React.createElement("div", { className: "gd-row-header-edit" },
        React.createElement("div", { className: "gd-editable-label-container gd-row-header-title-wrapper" },
            React.createElement(EditableLabelWithBubble, { className: `gd-title-for-${index} s-fluid-layout-row-title-input title gd-heading-2`, maxRows: 10, value: title || "", maxLength: MAX_TITLE_LENGTH, warningLimit: TITLE_LENGTH_WARNING_LIMIT, placeholderMessage: intl.formatMessage({ id: "layout.header.add.title.placeholder" }), alignTo: `.gd-title-for-${index}`, onSubmit: onTitleSubmit, onEditingStart: onEditingStart, onCancel: onEditingEnd })),
        React.createElement("div", { className: "gd-editable-label-container gd-row-header-description-wrapper" },
            React.createElement(EditableLabelWithBubble, { className: `gd-description-for-${index} s-fluid-layout-row-description-input description`, alignTo: `.gd-description-for-${index}`, maxRows: 15, value: description || "", maxLength: MAX_DESCRIPTION_LENGTH, warningLimit: DESCRIPTION_LENGTH_WARNING_LIMIT, placeholderMessage: intl.formatMessage({
                    id: "layout.header.add.description.placeholder",
                }), onSubmit: onDescriptionSubmit, onEditingStart: onEditingStart, onCancel: onEditingEnd }))));
}
//# sourceMappingURL=SectionHeaderEditable.js.map