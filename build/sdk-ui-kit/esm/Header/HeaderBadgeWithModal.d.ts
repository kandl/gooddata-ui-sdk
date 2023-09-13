import React from "react";
import { IHeaderBadgeProps } from "./HeaderBadge.js";
/**
 * @internal
 */
export interface IHeaderBadgeWithModalProps extends IHeaderBadgeProps {
    renderModalContent: (parameters: {
        closeModal: () => void;
    }) => React.ReactNode;
    children?: React.ReactNode;
}
/**
 * @internal
 */
export declare const HeaderBadgeWithModal: React.FC<IHeaderBadgeWithModalProps>;
//# sourceMappingURL=HeaderBadgeWithModal.d.ts.map