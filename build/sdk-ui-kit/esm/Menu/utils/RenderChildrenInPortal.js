// (C) 2007-2022 GoodData Corporation
import React from "react";
import ReactDOM from "react-dom";
export class RenderChildrenInPortal extends React.Component {
    constructor(props) {
        super(props);
        this.portalContentWrapperEl = document.createElement("div");
    }
    UNSAFE_componentWillMount() {
        if (this.props.targetElement) {
            this.props.targetElement.appendChild(this.portalContentWrapperEl);
        }
    }
    componentWillUnmount() {
        if (this.props.targetElement) {
            this.props.targetElement.removeChild(this.portalContentWrapperEl);
        }
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.portalContentWrapperEl);
    }
}
//# sourceMappingURL=RenderChildrenInPortal.js.map