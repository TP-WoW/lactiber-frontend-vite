import type { DbAttribute } from "@/types/types";
import { createContext, useContext } from "react";

interface FormEditorContextProps {
  items: DbAttribute[];
  setItems: React.Dispatch<React.SetStateAction<DbAttribute[]>>;
  fetchFormAttributes: (formId: string) => Promise<void>;
}

export const FormEditorContext = createContext<FormEditorContextProps | undefined>(undefined);

export const useFormEditor = () => {
  const context = useContext(FormEditorContext);
  if (!context) {
    throw new Error("useFormEditor must be used within a FormEditorProvider");
  }
  return context;
};