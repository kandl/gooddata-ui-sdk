declare const FUNNEL_TEMPLATE: {
    chart: {
        type: string;
        spacingRight: number;
    };
    plotOptions: {
        funnel: {
            dataLabels: {
                enabled: boolean;
                crop: boolean;
                overflow: string;
                padding: number;
            };
            center: string[];
            neckWidth: string;
            neckHeight: string;
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
                    funnel: {
                        center: string[];
                        neckWidth: number;
                        neckHeight: string;
                        width: number;
                    };
                };
            };
        }[];
    };
};
export declare function getFunnelConfiguration(): typeof FUNNEL_TEMPLATE;
export {};
//# sourceMappingURL=funnelConfiguration.d.ts.map