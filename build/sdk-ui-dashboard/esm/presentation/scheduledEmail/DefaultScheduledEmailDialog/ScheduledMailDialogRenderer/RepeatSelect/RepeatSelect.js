// (C) 2019-2022 GoodData Corporation
import * as React from "react";
import { injectIntl } from "react-intl";
import { REPEAT_EXECUTE_ON, REPEAT_FREQUENCIES, REPEAT_TYPES } from "../../constants.js";
import { RepeatExecuteOnSelect } from "./RepeatExecuteOnSelect.js";
import { RepeatFrequencySelect } from "./RepeatFrequencySelect.js";
import { RepeatPeriodSelect } from "./RepeatPeriodSelect.js";
import { RepeatTypeSelect } from "./RepeatTypeSelect.js";
class RepeatSelectRender extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = () => this.props.onChange(this.state);
        this.onRepeatTypeChange = (repeatType) => {
            if (this.state.repeatType !== repeatType) {
                this.setState({
                    repeatExecuteOn: REPEAT_EXECUTE_ON.DAY_OF_MONTH,
                    repeatFrequency: REPEAT_FREQUENCIES.DAY,
                    repeatPeriod: 1,
                    repeatType,
                }, this.onChange);
            }
        };
        this.onRepeatPeriodChange = (repeatPeriod) => {
            if (this.state.repeatPeriod !== repeatPeriod) {
                this.setState({ repeatPeriod }, this.onChange);
            }
        };
        this.onRepeatFrequencyChange = (repeatFrequency) => {
            if (this.state.repeatFrequency !== repeatFrequency) {
                this.setState({ repeatFrequency }, this.onChange);
            }
        };
        this.renderRepeatExecuteOn = () => {
            const { startDate } = this.props;
            const { repeatExecuteOn, repeatFrequency } = this.state;
            if (repeatFrequency !== REPEAT_FREQUENCIES.MONTH) {
                return null;
            }
            return (React.createElement(RepeatExecuteOnSelect, { repeatExecuteOn: repeatExecuteOn, startDate: startDate, onChange: this.onRepeatExecuteOnChange }));
        };
        this.onRepeatExecuteOnChange = (repeatExecuteOn) => {
            if (this.state.repeatExecuteOn !== repeatExecuteOn) {
                this.setState({ repeatExecuteOn }, this.onChange);
            }
        };
        const { repeatExecuteOn, repeatFrequency, repeatPeriod, repeatType } = props;
        this.state = {
            repeatExecuteOn,
            repeatFrequency,
            repeatPeriod,
            repeatType,
        };
    }
    render() {
        const { label, startDate } = this.props;
        const { repeatType } = this.state;
        return (React.createElement("div", { className: "gd-input-component gd-schedule-email-dialog-repeat" },
            React.createElement("label", { className: "gd-label" }, label),
            React.createElement("div", null,
                React.createElement(RepeatTypeSelect, { repeatType: repeatType, startDate: startDate, onChange: this.onRepeatTypeChange }),
                this.renderCustomRepeat())));
    }
    renderCustomRepeat() {
        const { intl } = this.props;
        const { repeatFrequency, repeatPeriod, repeatType } = this.state;
        if (repeatType !== REPEAT_TYPES.CUSTOM) {
            return null;
        }
        return (React.createElement("div", { className: "gd-schedule-email-dialog-repeat-custom" },
            React.createElement("span", { className: "gd-schedule-email-dialog-repeat-every" }, intl.formatMessage({
                id: "dialogs.schedule.email.repeats.every",
            })),
            React.createElement(RepeatPeriodSelect, { repeatPeriod: repeatPeriod, onChange: this.onRepeatPeriodChange }),
            React.createElement(RepeatFrequencySelect, { repeatFrequency: repeatFrequency, repeatPeriod: repeatPeriod, onChange: this.onRepeatFrequencyChange }),
            React.createElement("div", { className: "break-the-row" }),
            this.renderRepeatExecuteOn()));
    }
}
export const RepeatSelect = injectIntl(RepeatSelectRender);
//# sourceMappingURL=RepeatSelect.js.map