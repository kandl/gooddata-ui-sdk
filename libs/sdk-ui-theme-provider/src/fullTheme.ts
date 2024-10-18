// (C) 2022-2024 GoodData Corporation
import { IThemeDefinition } from "@gooddata/sdk-model";

// color
// border radius
// drop shadow
// text capitalization
// text align
// font
// font bold

export const fullThemeExample: IThemeDefinition = {
    type: "theme",
    theme: {
        analyticalDesigner: {
            title: {
                color: "black",
            },
        },
        button: {
            borderRadius: "100",
            dropShadow: false,
            textCapitalization: false,
        },
        chart: {
            axisColor: "black",
            axisLabelColor: "black",
            axisValueColor: "black",
            backgroundColor: "black",
            gridColor: "black",
            legendValueColor: "black",
            tooltipBackgroundColor: "black",
            tooltipBorderColor: "black",
            tooltipLabelColor: "black",
            tooltipValueColor: "black",
        },
        dashboards: {
            content: {
                backgroundColor: "black",
                kpiWidget: {
                    backgroundColor: "black",
                    borderColor: "black",
                    borderRadius: "100",
                    borderWidth: "1",
                    dropShadow: false,
                    kpi: {
                        primaryMeasureColor: "black",
                        secondaryInfoColor: "black",
                        value: {
                            negativeColor: "black",
                            positiveColor: "black",
                            textAlign: "center",
                        },
                    },
                    title: {
                        color: "black",
                        textAlign: "center",
                    },
                },
                widget: {
                    backgroundColor: "black",
                    borderColor: "black",
                    borderRadius: "100",
                    borderWidth: "1",
                    dropShadow: false,
                    title: {
                        color: "black",
                        textAlign: "center",
                    },
                },
            },
            editPanel: {
                backgroundColor: "black",
            },
            filterBar: {
                backgroundColor: "black",
                borderColor: "black",
                filterButton: {
                    backgroundColor: "black",
                },
            },
            navigation: {
                backgroundColor: "black",
                borderColor: "black",
                title: {
                    color: "black",
                },
                item: {
                    color: "black",
                    hoverColor: "black",
                    selectedColor: "black",
                    selectedBackgroundColor: "black",
                },
            },
            section: {
                description: {
                    color: "black",
                },
                title: {
                    color: "black",
                    lineColor: "black",
                },
            },
            title: {
                backgroundColor: "black",
                color: "black",
                borderColor: "black",
            },
        },
        kpi: {
            primaryMeasureColor: "black",
            secondaryInfoColor: "black",
            value: {
                negativeColor: "black",
                positiveColor: "black",
                textAlign: "center",
            },
        },
        modal: {
            borderColor: "black",
            borderRadius: "100",
            borderWidth: "1",
            dropShadow: false,
            outsideBackgroundColor: "black",
            title: {
                color: "black",
                lineColor: "black",
            },
        },
        palette: {
            complementary: {
                c0: "black",
                c1: "black",
                c2: "black",
                c3: "black",
                c4: "black",
                c5: "black",
                c6: "black",
                c7: "black",
                c8: "black",
                c9: "black",
            },
            error: {
                base: "black",
                contrast: "black",
                dark: "black",
                light: "black",
            },
            info: {
                base: "black",
                contrast: "black",
                dark: "black",
                light: "black",
            },
            primary: {
                base: "black",
                contrast: "black",
                dark: "black",
                light: "black",
            },
            success: {
                base: "black",
                contrast: "black",
                dark: "black",
                light: "black",
            },
            warning: {
                base: "black",
                contrast: "black",
                dark: "black",
                light: "black",
            },
        },
        table: {
            backgroundColor: "black",
            gridColor: "black",
            headerHoverBackgroundColor: "black",
            headerLabelColor: "black",
            hoverBackgroundColor: "black",
            loadingIconColor: "black",
            nullValueColor: "black",
            subtotalBackgroundColor: "black",
            totalBackgroundColor: "black",
            totalValueColor: "black",
            valueColor: "black",
        },
        tooltip: {
            backgroundColor: "black",
            color: "black",
        },
        typography: {
            font: "url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2)",
            fontBold: "url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2)",
        },
    },
};
