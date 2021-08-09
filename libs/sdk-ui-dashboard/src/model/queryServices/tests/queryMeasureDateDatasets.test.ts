// (C) 2021 GoodData Corporation
import { DashboardTester } from "../../tests/DashboardTester";
import { EmptyDashboardIdentifier } from "../../tests/Dashboard.fixtures";
import { MeasureDateDatasets, queryDateDatasetsForMeasure } from "../../queries";
import { measureItem } from "@gooddata/sdk-model";
import { ICatalogDateDataset } from "@gooddata/sdk-backend-spi";
import includes from "lodash/includes";
import { invariant } from "ts-invariant";
import { loadDashboard } from "../../commands";
import { ReferenceLdm } from "@gooddata/reference-workspace";

function datasetsDigest(
    datasets: ReadonlyArray<ICatalogDateDataset | undefined>,
): ReadonlyArray<string | undefined> {
    return datasets.map((d) => d?.dataSet.title);
}

describe("query measure date datasets", () => {
    describe("for datasets obtained from catalog", () => {
        // given all available datasets, this availability mock will pick 2 by name and associate relevance so that second one has more relevance
        const MockAvailabilityWithDifferentRelevance = (
            datasets: ICatalogDateDataset[],
        ): ICatalogDateDataset[] => {
            const available = datasets
                .filter((d) => includes(["Date (Activity)", "Date (Timeline)"], d.dataSet.title))
                .map((d) => {
                    return {
                        ...d,
                        relevance: d.dataSet.title === "Date (Timeline)" ? 1 : 0,
                    };
                });

            invariant(available.length === 2, "unexpected mock");
            return available;
        };

        // given all available datasets, this mock will pick 2 by name and ensure they have same relevance
        const MockAvailabilityWithSameRelevance = (
            datasets: ICatalogDateDataset[],
        ): ICatalogDateDataset[] => {
            const available = datasets
                .filter((d) => includes(["Date (Activity)", "Date (Timeline)"], d.dataSet.title))
                .map((d) => {
                    return {
                        ...d,
                        relevance: 1,
                    };
                });

            invariant(available.length === 2, "unexpected mock");
            return available;
        };

        it("should order date datasets by relevance desc", async () => {
            const Tester = DashboardTester.forRecording(
                EmptyDashboardIdentifier,
                {},
                {
                    catalogAvailability: {
                        availableDateDatasets: MockAvailabilityWithDifferentRelevance,
                    },
                },
            );

            await Tester.dispatchAndWaitFor(loadDashboard(), "GDC.DASH/EVT.LOADED");

            const result: MeasureDateDatasets = await Tester.query(
                queryDateDatasetsForMeasure(measureItem(ReferenceLdm.Won)),
            );

            expect(datasetsDigest(result.dateDatasetsOrdered)).toMatchSnapshot();
            expect(result.dateDatasetDisplayNames).toMatchSnapshot();
        });

        it("should order date datasets by relevance and title if tied", async () => {
            const Tester = DashboardTester.forRecording(
                EmptyDashboardIdentifier,
                {},
                {
                    catalogAvailability: {
                        availableDateDatasets: MockAvailabilityWithSameRelevance,
                    },
                },
            );

            await Tester.dispatchAndWaitFor(loadDashboard(), "GDC.DASH/EVT.LOADED");

            const result: MeasureDateDatasets = await Tester.query(
                queryDateDatasetsForMeasure(measureItem(ReferenceLdm.Won)),
            );

            expect(datasetsDigest(result.dateDatasetsOrdered)).toMatchSnapshot();
            expect(result.dateDatasetDisplayNames).toMatchSnapshot();
        });
    });
});
