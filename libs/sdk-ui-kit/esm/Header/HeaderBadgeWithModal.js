import { __rest } from "tslib";
// (C) 2021 GoodData Corporation
import React, { useState } from "react";
import { HeaderBadge } from "./HeaderBadge.js";
/**
 * @internal
 */
export const HeaderBadgeWithModal = (_a) => {
    var { renderModalContent, children, color } = _a, badgeProps = __rest(_a, ["renderModalContent", "children", "color"]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (React.createElement(HeaderBadge, Object.assign({}, badgeProps),
        React.createElement("button", { type: "button", style: { color }, className: "gd-header-badge-button", onClick: () => setIsModalOpen(true) }, children),
        isModalOpen ? renderModalContent({ closeModal: () => setIsModalOpen(false) }) : null));
};
//# sourceMappingURL=HeaderBadgeWithModal.js.map