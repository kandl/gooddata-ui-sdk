/**
 * Creates the {@link Drill} command.
 * Dispatching this command will result into dispatching {@link DashboardDrillResolved} event.
 *
 * This is general dashboard drill command with details about all possible more granular drill interactions that can follow.
 * Reason for this general drill command is that it may happen that multiple drill interactions are possible for one drill event.
 *
 * Example: some attribute on the insight has drill down set and also widget has drill to insight set. Then this command must be dispatched with both
 * {@link @gooddata/sdk-ui-ext#IDrillDownDefinition} and {@link @gooddata/sdk-backend-spi#IDrillToInsight} definitions.
 *
 * - This must be always the first command that occurs after the drill interaction and must be dispatched before more granular drill commands.
 * - Specific drill commands that can follow this general drill command are: {@link DrillDown}, {@link DrillToInsight}, {@link DrillToDashboard},
 *   {@link DrillToCustomUrl}, {@link DrillToAttributeUrl}, {@link DrillToLegacyDashboard}
 *
 *
 * @alpha
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param drillContext - context in which the drill interaction was triggered (widget and insight details - if available).
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill command
 */
export function drill(drillEvent, drillContext, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL",
        correlationId,
        payload: {
            drillEvent,
            drillContext,
        },
    };
}
/**
 * Creates the {@link DrillDown} command.
 * Dispatching this command will result into applying drill down definition to the provided insight (result of the drill down application
 * depends on the particular visualization type) and dispatching {@link DashboardDrillDownResolved} event that will contain it.
 *
 * In the default dashboard implementation dispatching this command will also result into opening drill dialog with the insight
 * that has this particular drill down definition applied.
 *
 * @alpha
 * @param insight - insight to which the drill down should be applied.
 * @param drillDefinition - drill definition to apply.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill down command
 */
export function drillDown(insight, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_DOWN",
        correlationId,
        payload: {
            insight,
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link DrillToInsight} command.
 * Dispatching this command will result into applying the drill intersection filters to the target insight
 * and dispatching {@link DashboardDrillToInsightResolved} event that will contain it.
 *
 * In the default dashboard implementation this command will also result into opening the drill dialog with the target insight
 * that has the drill intersection filters applied.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target insight.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to insight command
 */
export function drillToInsight(drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_TO_INSIGHT",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link DrillToDashboard} command.
 * Dispatching this command will result into getting the drill intersection filters that can be applied to the target dashboard
 * and dispatching {@link DashboardDrillToDashboardResolved} event that will contain them.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target dashboard.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to dashboard command
 */
export function drillToDashboard(drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_TO_DASHBOARD",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link DrillToCustomUrl} command.
 * Dispatching this command will result into resolving the target url
 * and dispatching {@link DashboardDrillToCustomUrlResolved} event that will contain it.
 *
 * Custom url can contain various identifier or attribute title placeholders, see:
 * {@link https://help.gooddata.com/pages/viewpage.action?pageId=86794855}
 *
 * @alpha
 * @param drillDefinition - drill definition with the target url to resolve.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to custom url command
 * @alpha
 */
export function drillToCustomUrl(drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_TO_CUSTOM_URL",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link DrillToAttributeUrl} command.
 * Dispatching this command will result into resolving the target attribute url
 * and dispatching {@link DashboardDrillToAttributeUrlResolved} event that will contain it.
 *
 * For more details, see: {@link https://help.gooddata.com/pages/viewpage.action?pageId=86794855}
 *
 * @alpha
 * @param drillDefinition - drill definition with the target attribute url to resolve.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to attribute url command
 * @alpha
 */
export function drillToAttributeUrl(drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_TO_ATTRIBUTE_URL",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link DrillToLegacyDashboard} command.
 * Dispatching this command will result into dispatching {@link DashboardDrillToLegacyDashboardResolved} event.
 *
 * Drill to legacy dashboard can be configured for Kpi widgets only.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target dashboard.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to legacy dashboard command
 * @alpha
 */
export function drillToLegacyDashboard(drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILL_TO_LEGACY_DASHBOARD",
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Creates the {@link ChangeDrillableItems} command.
 * Dispatching this command will result into enabling drilling of the widgets, if they match some of the drillable item definition/predicate.
 *
 * @alpha
 * @param drillableItems - reference to the drillable items or predicates that enables insight/kpi drilling.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns change drillable items command
 */
export function changeDrillableItems(drillableItems, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL.DRILLABLE_ITEMS.CHANGE",
        correlationId,
        payload: {
            drillableItems,
        },
    };
}
//# sourceMappingURL=drill.js.map