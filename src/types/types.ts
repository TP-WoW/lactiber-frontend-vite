import type { JSX } from "react";

// Tipos de dato que esperas desde BD
export type DataType = "text" | "number" | "select" | "date" | "checkbox" | "textarea" | "radio" | "switch" | "panel" | "custom";

// Fila “hidratada” desde la BD
export type DbAttribute = {
  id: string;
  formId: string;
  panelId?: string | null;
  name: string;
  label: string;
  dataType: DataType;
  description?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  isRequired: boolean;
  defaultValue?: string | number | null;
  orderIndex: number;
  options?: Array<{ value: string; label: string }> | string[]; // según definas
};

export type FormAttributeInsertType = Omit<DbAttribute, 'options'> & {
  createdBy?: string;
  optionsJson?: Array<{ value: string; label: string }> | string[];
}

export type FormAttributeUpdateType = Omit<DbAttribute, 'options'> & {
  optionsJson?: Array<{ value: string; label: string }> | string[];
}

// Un FormComponent genérico
export type FormComponentProps = {
  name: string;
  label: string;
  description?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
  options?: Array<{ value: string; label: string }> | string[];
  defaultValue?: unknown;
  onChange?: (value: unknown) => void;
};

export type FormComponent = (props: FormComponentProps) => JSX.Element;

export type FormInfo = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  status: "draft" | "in progress" | "submitted" | "published";
  attributes: DbAttribute[];
};

// export type ComponentType = {
//   type: DataType;
//   id: string;
//   name: string;
//   label: string;
//   description?: string;
//   options?: Array<{ value: string; label: string }> | string[];
//   defaultValue?: unknown;
//   required?: boolean;
//   maxLength?: number;
//   minLength?: number;
//   max?: number;
//   min?: number;
//   orderIndex: number;
//   readonly?: boolean;
// }
