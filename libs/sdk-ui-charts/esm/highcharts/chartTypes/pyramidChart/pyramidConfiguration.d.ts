declare const PYRAMID_TEMPLATE: {
    chart: {
        type: string;
        spacingRight: number;
    };
    plotOptions: {
        pyramid: {
            dataLabels: {
                enabled: boolean;
                crop: boolean;
                overflow: string;
                padding: number;
            };
            width: string;
        };
    };
    legend: {
        enabled: boolean;
    };
    responsive: {
        rules: {
            condition: {
                minWidth: number;
            };
            chartOptions: {
                plotOptions: {
                    pyramid: {
                        width: number;
                    };
                };
            };
        }[];
    };
};
export declare function getPyramidConfiguration(): typeof PYRAMID_TEMPLATE;
export {};
//# sourceMappingURL=pyramidConfiguration.d.ts.map