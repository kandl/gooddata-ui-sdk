// (C) 2019-2022 GoodData Corporation
import * as React from "react";
import cx from "classnames";
import { isMobileView } from "../utils/responsive.js";
class Textarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getTextareaClassNames = () => {
            const { hasError, hasWarning } = this.props;
            return cx("gd-input-field", {
                "has-error": hasError,
                "has-warning": hasWarning,
            });
        };
        this.onBlur = (_e) => {
            if (isMobileView()) {
                this.setState({ rows: 1 });
            }
        };
        this.onChange = (e) => {
            this.props.onChange(e.target.value);
        };
        this.onFocus = (_e) => {
            if (isMobileView()) {
                this.setState({ rows: this.props.rows });
            }
        };
        this.renderCollapseIndicator = () => {
            return React.createElement("span", { className: "gd-input-component-indicator" }, "\u22EF");
        };
        this.state = {
            rows: isMobileView() ? 1 : props.rows,
        };
    }
    render() {
        const { className, label, maxlength, placeholder, value } = this.props;
        const { rows } = this.state;
        const classNames = cx(`gd-input-component gd-textarea-component ${className}`, {
            "gd-textarea-component-collapsed": rows === 1,
        });
        return (React.createElement("div", { className: classNames },
            React.createElement("label", { className: "gd-label" }, label),
            React.createElement("label", { className: "gd-input" },
                React.createElement("textarea", { className: this.getTextareaClassNames(), maxLength: maxlength, placeholder: placeholder, value: value, rows: rows, onBlur: this.onBlur, onChange: this.onChange, onFocus: this.onFocus }),
                rows === 1 ? this.renderCollapseIndicator() : null)));
    }
}
Textarea.defaultProps = {
    className: "",
    hasError: false,
    hasWarning: false,
};
export { Textarea };
//# sourceMappingURL=Textarea.js.map