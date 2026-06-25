"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Expediente } from "@/types";

interface ExpedienteContextData {
  expedientes: Expediente[];
  addExpediente: (expediente: Omit<Expediente, "id">) => void;
  // Substituímos o "any" pelo tipo dinâmico do próprio Expediente
  updateExpediente: (id: string, field: keyof Expediente, value: Expediente[keyof Expediente]) => void;
}

const ExpedienteContext = createContext<ExpedienteContextData>({
  expedientes: [], // Isso garante que sempre existirá uma array, mesmo que vazia!
  addExpediente: () => {},
  updateExpediente: () => {},
});

export function ExpedienteProvider({ children }: { children: ReactNode }) {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);

  const addExpediente = (expediente: Omit<Expediente, "id">) => {
    // Futuramente: const response = await fetch('/api/expedientes', { method: 'POST', ... })
    const newExpediente = { ...expediente, id: crypto.randomUUID() };
    setExpedientes((prev) => [...prev, newExpediente]);
  };

  const updateExpediente = (
    id: string,
    field: keyof Expediente,
    value: Expediente[keyof Expediente],
  ) => {
    // Futuramente: await fetch(`/api/expedientes/${id}`, { method: 'PATCH', body: JSON.stringify({ [field]: value }) })
    setExpedientes((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );
  };

  return (
    <ExpedienteContext.Provider
      value={{ expedientes, addExpediente, updateExpediente }}
    >
      {children}
    </ExpedienteContext.Provider>
  );
}

export const useExpedientes = () => useContext(ExpedienteContext);
