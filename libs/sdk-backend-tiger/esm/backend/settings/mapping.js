export function mapTypeToKey(type, fallback = "") {
    switch (type) {
        case "WHITE_LABELING":
            return "whiteLabeling";
        case "FORMAT_LOCALE":
            return "formatLocale";
        case "ACTIVE_COLOR_PALETTE":
            return "activeColorPalette";
        case "ACTIVE_THEME":
            return "activeTheme";
        case "LOCALE":
            return "locale";
        case "MAPBOX_TOKEN":
            return "mapboxToken";
        case "TIMEZONE":
            return "timezone";
        case "WEEK_START":
            return "weekStart";
        case "organizationSetting":
            return "organizationSetting";
        default:
            return fallback;
    }
}
//# sourceMappingURL=mapping.js.map