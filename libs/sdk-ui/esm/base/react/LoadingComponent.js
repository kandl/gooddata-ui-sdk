// (C) 2007-2022 GoodData Corporation
import React from "react";
const baseAnimationDuration = 1.4;
/**
 * Component that renders a default loading indicator.
 *
 * @remarks
 * See {@link https://sdk.gooddata.com/gooddata-ui/docs/loading_component.html | LoadingComponent }
 *
 * @public
 */
class LoadingComponent extends React.Component {
    render() {
        const { inline, width, height, imageWidth, imageHeight, color, speed = 1, className } = this.props;
        const duration = baseAnimationDuration / speed;
        const delay = duration / -5;
        const dotStyles = {
            transformOrigin: "4px 4px",
            animation: `GDC-pop ${duration}s infinite`,
            animationDelay: `${delay * 2}s`,
            fill: color,
        };
        const wrapperStyles = {
            textAlign: "center",
            display: inline ? "inline-flex" : "flex",
            verticalAlign: "middle",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            flex: "1 0 auto",
            height,
            width,
        };
        const svgStyles = {
            maxHeight: "100%",
            maxWidth: "100%",
            flex: "0 1 auto",
            width: imageWidth,
            height: imageHeight,
        };
        const dot1Styles = dotStyles;
        const dot2Styles = Object.assign(Object.assign({}, dotStyles), { transformOrigin: "18px 4px", animationDelay: `${delay}s` });
        const dot3Styles = Object.assign(Object.assign({}, dotStyles), { transformOrigin: "32px 4px", animationDelay: "0" });
        return (React.createElement("div", { className: className, style: wrapperStyles },
            React.createElement("svg", { style: svgStyles, version: "1.1", x: "0px", y: "0px", viewBox: "0 0 36 8" },
                React.createElement("style", null, `
                        @keyframes GDC-pop {
                            0%,
                            80%,
                            100% {
                                transform: scale(0);
                            }
                            40% {
                                transform: scale(1);
                            }
                        }
                    `),
                React.createElement("g", { style: dot1Styles },
                    React.createElement("circle", { cx: "4", cy: "4", r: "4" })),
                React.createElement("g", { style: dot2Styles },
                    React.createElement("circle", { cx: "18", cy: "4", r: "4" })),
                React.createElement("g", { style: dot3Styles },
                    React.createElement("circle", { cx: "32", cy: "4", r: "4" })))));
    }
}
LoadingComponent.defaultProps = {
    className: "s-loading",
    color: "var(--gd-palette-complementary-6, #94a1ad)",
    speed: 1,
    inline: false,
    height: "100%",
    width: undefined,
    imageHeight: 8,
    imageWidth: undefined,
};
export { LoadingComponent };
//# sourceMappingURL=LoadingComponent.js.map