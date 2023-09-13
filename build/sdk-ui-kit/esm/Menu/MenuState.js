// (C) 2007-2022 GoodData Corporation
import React from "react";
class MenuState extends React.Component {
    constructor(props) {
        super(props);
        this.isControlled = () => {
            return typeof this.props.opened === "boolean";
        };
        this.onOpenedChange = (openedChangeParams) => {
            this.setState({ opened: openedChangeParams.opened }, () => {
                if (this.props.onOpenedChange) {
                    this.props.onOpenedChange(openedChangeParams);
                }
            });
        };
        this.state = {
            opened: this.isControlled() ? this.props.opened : this.props.defaultOpened,
        };
    }
    render() {
        var _a;
        return this.props.children({
            opened: (_a = (this.isControlled() ? this.props.opened : this.state.opened)) !== null && _a !== void 0 ? _a : false,
            onOpenedChange: this.onOpenedChange,
        });
    }
}
MenuState.defaultProps = {
    defaultOpened: false,
};
export { MenuState };
//# sourceMappingURL=MenuState.js.map