// (C) 2007-2022 GoodData Corporation
import React, { createRef } from "react";
import { getViewportDimensionsAndCoords, getElementDimensions, getElementDimensionsAndCoords, calculateMenuPosition, } from "./positioningCalculations.js";
export class PositionedMenuContent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            left: 0,
            top: 0,
        };
        this.menuElRef = createRef();
        this.positionMenu = () => {
            if (!this.props.togglerEl || !this.menuElRef.current) {
                return;
            }
            const { left, top } = calculateMenuPosition({
                toggler: getElementDimensionsAndCoords(this.props.togglerEl),
                menu: getElementDimensions(this.menuElRef.current),
                viewport: getViewportDimensionsAndCoords(),
                alignment: this.props.alignment,
                spacing: this.props.spacing,
                offset: this.props.offset,
                topLevelMenu: this.props.topLevelMenu,
            });
            this.setState({ left, top });
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.alignment !== this.props.alignment ||
            prevProps.spacing !== this.props.spacing ||
            prevProps.offset !== this.props.offset ||
            prevProps.topLevelMenu !== this.props.topLevelMenu ||
            prevProps.togglerEl !== this.props.togglerEl ||
            prevProps.children !== this.props.children) {
            this.positionMenu();
        }
    }
    componentDidMount() {
        this.positionMenu();
        this.addEventListeners();
    }
    componentWillUnmount() {
        this.removeEventListeners();
    }
    render() {
        return (React.createElement("div", { style: {
                position: "absolute",
                left: this.state.left,
                top: this.state.top,
            }, ref: this.menuElRef }, this.props.children));
    }
    addEventListeners() {
        window.addEventListener("resize", this.positionMenu);
        window.addEventListener("scroll", this.positionMenu, true);
    }
    removeEventListeners() {
        window.removeEventListener("resize", this.positionMenu);
        window.removeEventListener("scroll", this.positionMenu, true);
    }
}
//# sourceMappingURL=PositionedMenuContent.js.map