import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { api } from "../api";

const socket = io("http://localhost:5000");

export default function StatusDashboard({
  deploymentId,
}) {
  const [deployment, setDeployment] = useState(null);

  useEffect(() => {
    if (!deploymentId) return;

    fetchDeployment();

    socket.on("deployment-update", (data) => {
      if (data.deploymentId === deploymentId) {
        fetchDeployment();
      }
    });

    return () => {
      socket.off("deployment-update");
    };
  }, [deploymentId]);

  const fetchDeployment = async () => {
    const res = await api.get(
      `/status/${deploymentId}`
    );

    setDeployment(res.data);
  };

  if (!deployment) return null;

  return (
    <div>
      <h3>Deployment Status</h3>

      <p>
        Client: {deployment.clientName}
      </p>

      <p>
        Domain: {deployment.domain}
      </p>

      <p>
        Status: {deployment.status}
      </p>
    </div>
  );
}