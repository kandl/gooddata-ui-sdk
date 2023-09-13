import { DescriptionTooltipOpenedData, ShareDialogInteractionData } from "../events/index.js";
/**
 * Hook for dispatching relevant user interaction commands.
 * These commands enable to track user interactions that cannot be tracked by other existing events.
 *
 * @internal
 */
export declare const useDashboardUserInteraction: () => {
    poweredByGDLogoClicked: () => void;
    kpiAlertDialogClosed: () => void;
    kpiAlertDialogOpened: (alreadyHasAlert: boolean) => void;
    descriptionTooltipOpened: (eventData: DescriptionTooltipOpenedData) => void;
    shareDialogInteraction: (eventData: ShareDialogInteractionData) => void;
    attributeFilterTitleResetClicked: () => void;
};
