import { useState } from "react";
import { api } from "../api";

export default function DeployForm({ onCreated }) {
  const [form, setForm] = useState({
    clientName: "",
    domain: "",
    image: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await api.post("/deploy", form);

    onCreated(res.data.deploymentId);
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Client Name"
        onChange={(e) =>
          setForm({
            ...form,
            clientName: e.target.value,
          })
        }
      />

      <input
        placeholder="Domain"
        onChange={(e) =>
          setForm({
            ...form,
            domain: e.target.value,
          })
        }
      />

      <input
        placeholder="Docker Image"
        onChange={(e) =>
          setForm({
            ...form,
            image: e.target.value,
          })
        }
      />

      <button type="submit">
        Deploy
      </button>
    </form>
  );
}