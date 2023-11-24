// (C) 2022 GoodData Corporation
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { WorkspaceProvider } from "../contexts/Workspace.js";

import ComponentResolver from "./ComponentResolver.js";

const AppRouter: React.FC = () => {
    return (
        <div>
            <Router>
                <WorkspaceProvider>
                    <Route path="/" component={ComponentResolver} />
                </WorkspaceProvider>
            </Router>
        </div>
    );
};

export default AppRouter;
