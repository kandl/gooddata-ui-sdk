// (C) 2019 GoodData Corporation
import React from "react";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import bearFactory, {
    AnonymousAuthProvider,
    FixedLoginAndPasswordAuthProvider,
} from "@gooddata/sdk-backend-bear";
import { idRef } from "@gooddata/sdk-model";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

function hasCredentialsSetup(): boolean {
    return BUILD_TYPE === "public" || (process.env.GDC_USERNAME && process.env.GDC_PASSWORD);
}

function createBackend() {
    const backend = bearFactory();

    if (BUILD_TYPE === "public") {
        return backend.withAuthentication(new AnonymousAuthProvider());
    }

    return backend.withAuthentication(
        new FixedLoginAndPasswordAuthProvider(process.env.GDC_USERNAME!, process.env.GDC_PASSWORD!),
    );
}

export const App: React.FC = () => {
    if (!hasCredentialsSetup()) {
        return (
            <p>
                Your playground is not setup with credentials. Check out the README.md for more. TL;DR: point
                the playground against the public access proxy or set GDC_USERNAME and GDC_PASSWORD in the
                .env file.
            </p>
        );
    }

    const backend = createBackend();

    return (
        <BackendProvider backend={backend}>
            <WorkspaceProvider workspace="lmnivlu3sowt63jvr2mo1wlse5fyv203">
                <Dashboard dashboardRef={idRef("aagTkClUbGdi")} />
                {/* Build your playground components under the playground directory.*/}
            </WorkspaceProvider>
        </BackendProvider>
    );
};
