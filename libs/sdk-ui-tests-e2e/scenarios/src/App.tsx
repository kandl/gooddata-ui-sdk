// (C) 2020-2022 GoodData Corporation
import React from "react";
import { BackendProvider } from "@gooddata/sdk-ui";

import AppRouter from "./routes/AppRouter.js";
import { useAuth } from "./contexts/Auth/index.js";
import { WorkspaceListProvider } from "./contexts/WorkspaceList.js";
import { provideCreateRoot } from "@gooddata/sdk-ui-ext";
import { createRoot } from "react-dom/client";

// provide React18 root API for visualization rendering
provideCreateRoot(createRoot);

function App() {
    const { backend } = useAuth();

    return (
        <BackendProvider backend={backend}>
            <WorkspaceListProvider>
                <AppRouter />
            </WorkspaceListProvider>
        </BackendProvider>
    );
}

export default App;
