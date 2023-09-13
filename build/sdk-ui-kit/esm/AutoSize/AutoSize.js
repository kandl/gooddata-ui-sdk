// (C) 2007-2022 GoodData Corporation
import React, { Component, createRef } from "react";
import throttle from "lodash/throttle.js";
import { elementRegion } from "../utils/domUtilities.js";
/**
 * @internal
 */
export class AutoSize extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            width: 0,
            height: 0,
        };
        this.updateSize = () => {
            const { width, height } = elementRegion(this.wrapperRef.current);
            this.setState({
                width,
                height,
            });
        };
        this.throttledUpdateSize = throttle(this.updateSize, 250, { leading: false });
        this.wrapperRef = createRef();
    }
    render() {
        const { children } = this.props;
        const { width, height } = this.state;
        return (React.createElement("div", { ref: this.wrapperRef, style: { height: "100%", width: "100%" } }, children({ width, height })));
    }
    componentDidMount() {
        window.addEventListener("resize", this.throttledUpdateSize);
        this.throttledUpdateSize();
    }
    componentWillUnmount() {
        this.throttledUpdateSize.cancel();
        window.removeEventListener("resize", this.throttledUpdateSize);
    }
}
//# sourceMappingURL=AutoSize.js.map