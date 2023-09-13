import React from "react";
export interface IRenderChildrenInPortalProps {
    targetElement: Element;
    children: React.ReactNode;
}
export declare class RenderChildrenInPortal extends React.Component<IRenderChildrenInPortalProps> {
    private portalContentWrapperEl;
    private constructor();
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactPortal;
}
//# sourceMappingURL=RenderChildrenInPortal.d.ts.map