import React, { useState, useCallback } from "react";
import type { DbAttribute } from "@/types/types";
import { FormEditorContext } from "@/hooks/use-formEditor";

export const FormEditorProvider: React.FC<{ formId: string; children: React.ReactNode }> = ({ formId, children }) => {
  const [items, setItems] = useState<DbAttribute[]>([]);

  const fetchFormAttributes = useCallback(async (formId: string) => {
    // Aquí va la lógica real de fetch
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/form-attributes?formId=${formId}`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching form attributes:", error);
    }
  }, []);

  React.useEffect(() => {
    if (formId) fetchFormAttributes(formId);
  }, [formId, fetchFormAttributes]);

  return (
    <FormEditorContext.Provider value={{ items, setItems, fetchFormAttributes }}>
      {children}
    </FormEditorContext.Provider>
  );
};
