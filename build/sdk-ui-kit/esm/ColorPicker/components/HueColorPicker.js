// (C) 2007-2022 GoodData Corporation
/**
 * Copyright (c) 2015 Case Sandberg
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React, { PureComponent } from "react";
import { calculateHueChange } from "../utils.js";
export class HueColorPicker extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = (e) => {
            const change = calculateHueChange(e, this.props.initColor.h, this.hueContainer.current);
            if (change && this.props.onChange) {
                this.props.onChange(change);
            }
        };
        this.handleTouchChange = (e) => {
            this.handleChange(e.nativeEvent);
        };
        this.handleMouseDown = (e) => {
            this.bindEventListeners();
            this.handleChange(e.nativeEvent);
        };
        this.handleMouseUp = () => {
            this.unbindEventListeners();
        };
        this.hueContainer = React.createRef();
    }
    componentWillUnmount() {
        this.unbindEventListeners();
    }
    getPointerStyle() {
        return {
            position: "absolute",
            left: `${(this.props.initColor.h * 100) / 360}%`,
        };
    }
    bindEventListeners() {
        window.addEventListener("mousemove", this.handleChange);
        window.addEventListener("mouseup", this.handleMouseUp);
    }
    unbindEventListeners() {
        window.removeEventListener("mousemove", this.handleChange);
        window.removeEventListener("mouseup", this.handleMouseUp);
    }
    render() {
        return (React.createElement("div", { role: "hue-picker", className: "hue-picker hue-horizontal s-hue-picker", ref: this.hueContainer, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onTouchMove: this.handleTouchChange, onTouchStart: this.handleTouchChange },
            React.createElement("div", { style: this.getPointerStyle() },
                React.createElement("div", { className: "color-picker-pointer s-color-picker-pointer" }))));
    }
}
//# sourceMappingURL=HueColorPicker.js.map