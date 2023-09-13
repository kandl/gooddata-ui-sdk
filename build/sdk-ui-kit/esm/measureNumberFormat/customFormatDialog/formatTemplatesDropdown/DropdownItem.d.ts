import React from "react";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatTemplate } from "../../typings.js";
interface ITemplateDropdownItemProps {
    template: IFormatTemplate;
    separators?: ISeparators;
    onClick: (template: IFormatTemplate) => void;
}
interface ITemplateDropdownItemState {
    displayHelp: boolean;
}
export default class DropdownItem extends React.Component<ITemplateDropdownItemProps, ITemplateDropdownItemState> {
    state: {
        displayHelp: boolean;
    };
    render(): JSX.Element;
    private onClick;
    private toggleHelp;
}
export {};
//# sourceMappingURL=DropdownItem.d.ts.map