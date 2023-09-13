import { IMenuPositionProps } from "../positioning/MenuPosition.js";
import { OnOpenedChange } from "../MenuSharedTypes.js";
export interface IMenuOpenedBySharedProps extends IMenuPositionProps {
    portalTarget: Element;
    onOpenedChange: OnOpenedChange;
    togglerWrapperClassName?: string;
}
//# sourceMappingURL=MenuOpenedBySharedProps.d.ts.map