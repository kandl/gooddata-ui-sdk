import { AxiosInstance } from "axios";
export type FeatureContext = {
    organizationId: string;
    earlyAccess: string;
};
export interface ILiveFeatures {
    live: {
        configuration: {
            host: string;
            key: string;
        };
        context: FeatureContext;
    };
}
export interface IStaticFeatures {
    static: {
        items: Record<string, string>;
        context: FeatureContext;
    };
}
export interface IUserProfile {
    name: string;
    userId: string;
    organizationName: string;
    organizationId: string;
    links: {
        user: string;
        organization: string;
    };
    features?: ILiveFeatures | IStaticFeatures;
}
export interface ProfileApiInterface {
    getCurrent: () => Promise<IUserProfile>;
}
export declare const tigerProfileClientFactory: (axios: AxiosInstance) => ProfileApiInterface;
//# sourceMappingURL=profile.d.ts.map