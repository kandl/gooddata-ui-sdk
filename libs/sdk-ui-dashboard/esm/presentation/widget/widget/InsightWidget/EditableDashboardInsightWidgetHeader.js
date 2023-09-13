// (C) 2020-2022 GoodData Corporation
import React, { useCallback } from "react";
import { insightTitle } from "@gooddata/sdk-model";
import { DashboardItemHeadlineContainer } from "../../../presentationComponents/index.js";
import { changeInsightWidgetHeader, useDashboardDispatch } from "../../../../model/index.js";
import { EditableHeadline } from "../../common/EditableHeadline.js";
const MAX_VISUALIZATION_TITLE_LENGTH = 200;
export const EditableDashboardInsightWidgetHeader = ({ widget, insight, clientHeight, }) => {
    const dispatch = useDashboardDispatch();
    const onWidgetTitleChanged = useCallback((newTitle) => {
        if (newTitle) {
            dispatch(changeInsightWidgetHeader(widget.ref, { title: newTitle }));
        }
        else if (insight) {
            dispatch(changeInsightWidgetHeader(widget.ref, { title: insightTitle(insight) }));
        }
    }, [dispatch, insight, widget.ref]);
    const maxLength = Math.max(widget.title.length, MAX_VISUALIZATION_TITLE_LENGTH);
    return (React.createElement(DashboardItemHeadlineContainer, { clientHeight: clientHeight },
        React.createElement(EditableHeadline, { text: widget.title, originalTitle: widget.title, maxLength: maxLength, onTitleChange: onWidgetTitleChanged })));
};
//# sourceMappingURL=EditableDashboardInsightWidgetHeader.js.map