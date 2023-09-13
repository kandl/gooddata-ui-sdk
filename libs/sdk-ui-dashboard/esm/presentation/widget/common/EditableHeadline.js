// (C) 2007-2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop.js";
import { EditableLabel } from "@gooddata/sdk-ui-kit";
export const EditableHeadline = ({ maxLength, originalTitle, text, onTitleChange, onTitleEditingCancel = noop, onTitleEditingStart = noop, }) => (React.createElement(EditableLabel, { className: "s-editable-label s-headline", maxRows: 2, value: text, maxLength: maxLength, placeholder: originalTitle, onEditingStart: onTitleEditingStart, onSubmit: onTitleChange, onCancel: onTitleEditingCancel },
    React.createElement("span", null, text)));
//# sourceMappingURL=EditableHeadline.js.map