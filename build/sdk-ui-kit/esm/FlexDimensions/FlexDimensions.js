// (C) 2007-2020 GoodData Corporation
import React, { Component, createRef } from "react";
import cx from "classnames";
import throttle from "lodash/throttle.js";
import pickBy from "lodash/pickBy.js";
import { elementRegion } from "../utils/domUtilities.js";
/**
 * @internal
 */
class FlexDimensions extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = createRef();
        this.updateSize = () => {
            const { width, height } = elementRegion(this.wrapperRef.current);
            this.setState({
                width,
                height,
            });
        };
        this.state = {
            width: 0,
            height: 0,
        };
        this.throttledUpdateSize = throttle(this.updateSize, 250, { leading: false });
    }
    componentDidMount() {
        window.addEventListener("resize", this.throttledUpdateSize);
        this.throttledUpdateSize();
    }
    componentWillUnmount() {
        this.throttledUpdateSize.cancel();
        window.removeEventListener("resize", this.throttledUpdateSize);
    }
    getChildrenDimensions() {
        return pickBy(this.state, (_, key) => {
            const setWidth = this.props.measureWidth && key === "width";
            const setHeight = this.props.measureHeight && key === "height";
            return setWidth || setHeight;
        });
    }
    renderChildren() {
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child, this.getChildrenDimensions());
    }
    render() {
        const classNames = cx(this.props.className);
        return (React.createElement("div", { ref: this.wrapperRef, className: classNames }, this.renderChildren()));
    }
}
FlexDimensions.defaultProps = {
    children: false,
    className: "",
    measureWidth: true,
    measureHeight: true,
};
export { FlexDimensions };
//# sourceMappingURL=FlexDimensions.js.map