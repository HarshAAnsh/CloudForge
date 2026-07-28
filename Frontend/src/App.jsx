import { useState } from "react";

import DeployForm from "./components/DeployForm";
import StatusDashboard from "./components/StatusDashboard";

export default function App() {
  const [deploymentId, setDeploymentId] =
    useState(null);

  return (
    <div style={{ padding: 40 }}>
      <h1>Deployment Control Panel</h1>

      <DeployForm
        onCreated={setDeploymentId}
      />

      <StatusDashboard
        deploymentId={deploymentId}
      />
    </div>
  );
}