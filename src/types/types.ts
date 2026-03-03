import type { JSX } from "react";
import { z } from "zod";

// Tipos de dato que esperas desde BD
export type DataType =
  | "text"
  | "number"
  | "select"
  | "date"
  | "checkbox"
  | "textarea"
  | "radio"
  | "switch"
  | "panel"
  | "custom"
  | "sample"; // Agrega más tipos según tus necesidades

export const EngUnitsEnum = {
  degCelsius: "ºC",
  bar: "bar",
  L: "L",
  kg: "kg",
  percent: "%",
  pantalla: "pantalla",
  litersPerHour: "l/h",
} as const;

export type EngUnitsEnum = (typeof EngUnitsEnum)[keyof typeof EngUnitsEnum];

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
  options?: Array<{ value: string; label: string }> | string[];
  sampleConfigJson?: string; // JSON string from DB
};

/*
  Atributos específicos para reportes
*/

export type ReportAttribute = DbAttribute & {
  reportId?: string;
  reportStatus?: string;
  reportName?: string;
  reportDescription?: string;
  reportCreatedBy?: string;
  reportCreatedAt?: string;
  reportStartedAt?: string;
  reportLastUpdateAt?: string;
  reportAssignedTo?: string;
  optionsJson?: string; // JSON string from DB
  sampleConfigJson?: string; // JSON string from DB
  attributeValue?: string | number | boolean | null; // Valor específico para este reporte
};

export type SampleConfigType = {
  sampleFrecuency: number;
  manualMode: boolean;
  selectedDataset: string;
  selectedTag: string;
  manualSample: {
    label: string;
    name: string;
    description?: string;
    type: DataType;
    defaultValue: string;
    engUnits?: string;
    min?: number;
    max?: number;
  };
};

export type FormAttributeInsertType = Omit<DbAttribute, "options"> & {
  createdBy?: string;
  optionsJson?: Array<{ value: string; label: string }> | string[];
  sampleConfigJson?: string; // JSON string from DB
};

export type FormAttributeUpdateType = Omit<DbAttribute, "options"> & {
  optionsJson?: Array<{ value: string; label: string }> | string[];
  sampleConfigJson?: string; // JSON string from DB
};

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
  status: FormStatus;
  attributes: DbAttribute[];
};

export const FormStatus = {
  DRAFT: "draft",
  IN_PROGRESS: "in progress",
  SUBMITTED: "submitted",
  PUBLISHED: "published",
} as const;

export type FormStatus = (typeof FormStatus)[keyof typeof FormStatus];

export const ReportStatus = {
  NEW: "new",
  STARTED: "started",
  CANCELLED: "cancelled",
  SUBMITTED: "submitted",
  COMPLETE: "complete",
} as const;

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

export type FormReport = {
  id: string;
  formId: string;
  title?: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  status: ReportStatus;
  startedAt?: string;
  submittedAt?: string;
  lastUpdatedAt?: string;
  optionsJson?: string;
  parameters?: ReportParameter[];
  assignedTo?: string;
  reviewer?: string;
};

export type ReportParameter = {
  id: string;
  reportId: string;
  attributeId: string;
  value: string | number | boolean | null;
  updatedAt?: string;
  updatedBy?: string;
  options?: Array<{ value: string; label: string }>;
};

export type TransformedReport = {
  id: number;
  reportId: string;
  name: string;
  description?: string;
  form: string;
  formId?: string;
  status: string;
  assignedTo: string;
  reviewer: string;
  createdAt?: string;
};

export const formReportTableSchema = z.object({
  id: z.number(),
  name: z.string(),
  form: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export type User = {
  id: string;
  userName: string;
  email?: string;
  displayName?: string;
  isActive?: boolean;
  roleId?: string;
  roleName?: string;
  roleDescription?: string;
  permissionsJson?: string;
  avatar?: string | "/avatars/shadcn.jpg";
  // Agrega más campos según tu modelo de usuario
};

export type LoginResponse = User & {
  statusCode: number;
  message: string;
};

export type LookupType = {
  id: string;
  name: string;
  description?: string;
  datasource?: string;
  commandType: string;
  schema?: string;
  commandText: string;
  createdAt: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  optionsJson?: string;
  parametersJson?: string;
}

/*

CREATE TABLE [dbo].[Lookups](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Datasource] [uniqueidentifier] NULL,
	[CommandType] [nvarchar](50) NOT NULL,
	[Schema] [nvarchar](50) NULL,
	[CommandText] [nvarchar](max) NOT NULL,
	[CreatedAt] [datetime2](3) NOT NULL,
	[CreatedBy] [nvarchar](200) NULL,
	[UpdatedAt] [datetime2](3) NULL,
	[UpdatedBy] [nvarchar](200) NULL,
	[OptionsJson] [nvarchar](max) NULL,
	[ParametersJson] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

*/
