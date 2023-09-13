// (C) 2019-2022 GoodData Corporation
import * as React from "react";
export class RepeatPeriodSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.isInvalidValue = (value, repeatPeriod) => {
            return value === "" || isNaN(repeatPeriod) || repeatPeriod <= 0;
        };
        this.triggerChangeEvent = (repeatPeriod) => {
            if (this.state.repeatPeriod !== repeatPeriod) {
                this.setState({ repeatPeriod }, () => this.props.onChange(repeatPeriod));
            }
        };
        this.onBlur = (e) => {
            const trimmedValue = e.target.value.trim();
            const repeatPeriod = parseInt(trimmedValue, 10);
            if (this.isInvalidValue(trimmedValue, repeatPeriod)) {
                this.setState({ repeatPeriod: this.props.repeatPeriod || 1 });
                return;
            }
            this.triggerChangeEvent(repeatPeriod);
        };
        this.onChange = (e) => {
            const trimmedValue = e.target.value.trim();
            const repeatPeriod = parseInt(trimmedValue, 10);
            if (this.isInvalidValue(trimmedValue, repeatPeriod)) {
                this.setState({ repeatPeriod: "" });
                return;
            }
            this.triggerChangeEvent(repeatPeriod);
        };
        this.state = {
            repeatPeriod: props.repeatPeriod || 1,
        };
    }
    render() {
        return (React.createElement("div", { className: "gd-schedule-email-dialog-repeat-period" },
            React.createElement("input", { className: "gd-input-field", onBlur: this.onBlur, onChange: this.onChange, value: this.state.repeatPeriod })));
    }
}
//# sourceMappingURL=RepeatPeriodSelect.js.map