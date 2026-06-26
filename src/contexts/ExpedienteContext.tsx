"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Expediente } from "@/types";

interface ExpedienteContextData {
  expedientes: Expediente[];
  addExpediente: (expediente: Omit<Expediente, "id">) => Promise<void>;
  updateExpediente: (
    id: string,
    field: keyof Expediente,
    value: Expediente[keyof Expediente],
  ) => Promise<void>;
  updateExpedienteFull: (
    id: string,
    data: Partial<Expediente>,
  ) => Promise<void>;
  isLoading: boolean;
}

const ExpedienteContext = createContext<ExpedienteContextData>({
  expedientes: [],
  addExpediente: async () => {},
  updateExpediente: async () => {},
  updateExpedienteFull: async () => {},
  isLoading: true,
});

export function ExpedienteProvider({ children }: { children: ReactNode }) {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExpedientes() {
      try {
        const response = await fetch("/api/expedientes");
        if (response.ok) {
          const data = await response.json();
          setExpedientes(data);
        }
      } catch (error) {
        console.error("Erro ao buscar expedientes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExpedientes();
  }, []);

  const addExpediente = async (expediente: Omit<Expediente, "id">) => {
    try {
      const response = await fetch("/api/expedientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expediente),
      });

      if (response.ok) {
        const newExpediente = await response.json();
        setExpedientes((prev) => [newExpediente, ...prev]);
      } else {
        const errorData = await response.json();
        console.error("Erro retornado pela API:", errorData);
        alert("Erro do Supabase: " + JSON.stringify(errorData.error));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const updateExpediente = async (
    id: string,
    field: keyof Expediente,
    value: Expediente[keyof Expediente],
  ) => {
    const previousExpedientes = [...expedientes];

    setExpedientes((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );

    try {
      const response = await fetch(`/api/expedientes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
        throw new Error(errorData.error || "Falha desconhecida no backend");
      }
    } catch (error) {
      console.error("Erro ao atualizar expediente:", error);
      setExpedientes(previousExpedientes);

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      alert("Erro ao salvar alteração: " + errorMessage);
    }
  };

  const updateExpedienteFull = async (
    id: string,
    updatedData: Partial<Expediente>,
  ) => {
    const previousExpedientes = [...expedientes];

    setExpedientes((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updatedData } : exp)),
    );

    try {
      const response = await fetch(`/api/expedientes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha desconhecida no backend");
      }
    } catch (error) {
      console.error("Erro ao atualizar expediente:", error);
      setExpedientes(previousExpedientes); // Rollback
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      alert("Erro ao salvar alteração: " + errorMessage);
    }
  };

  return (
    <ExpedienteContext.Provider
      value={{
        expedientes,
        addExpediente,
        updateExpediente,
        updateExpedienteFull,
        isLoading,
      }}
    >
      {children}
    </ExpedienteContext.Provider>
  );
}

export const useExpedientes = () => useContext(ExpedienteContext);
