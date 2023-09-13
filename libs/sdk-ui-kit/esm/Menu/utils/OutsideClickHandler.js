// (C) 2007-2022 GoodData Corporation
import React, { createRef } from "react";
class OutsideClickHandler extends React.Component {
    constructor() {
        super(...arguments);
        this.wrapperElRef = createRef();
        this.handleClick = (e) => {
            var _a;
            if (!this.wrapperElRef.current) {
                // In IE11 the wrapperEl is not initialized for some reason.
                return;
            }
            const target = e.target;
            if (this.wrapperElRef.current.contains(target) || ((_a = this.props.toggler) === null || _a === void 0 ? void 0 : _a.contains(target))) {
                return;
            }
            if (this.props.onOutsideClick) {
                this.props.onOutsideClick(e);
            }
        };
        this.addListeners = () => {
            document.addEventListener("mousedown", this.handleClick, this.props.useCapture);
        };
        this.removeListeners = () => {
            document.removeEventListener("mousedown", this.handleClick, this.props.useCapture);
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.onOutsideClick !== this.props.onOutsideClick ||
            prevProps.useCapture !== this.props.useCapture) {
            this.removeListeners();
            this.addListeners();
        }
    }
    componentDidMount() {
        this.addListeners();
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    render() {
        return React.createElement("div", { ref: this.wrapperElRef }, this.props.children);
    }
}
OutsideClickHandler.defaultProps = {
    // Set to true by default so that a `stopPropagation` in the
    // children will not prevent all outside click handlers from firing
    useCapture: true,
};
export { OutsideClickHandler };
//# sourceMappingURL=OutsideClickHandler.js.map