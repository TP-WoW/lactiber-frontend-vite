import type { FormInfo } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const formularioAlsafeSchema = {
  kind: "collectionType",
  collectionName: "formulario_alsafes",
  info: {
    singularName: "formulario-alsafe",
    pluralName: "formulario-alsafes",
    displayName: "Formulario Alsafe",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {
    i18n: {
      localized: true,
    },
  },
  attributes: {
    FormID: {
      type: "uid",
    },
    Fecha: {
      type: "date",
    },
    LimpiezaPrevia: {
      type: "component",
      component: "shared.fases-del-proceso",
      repeatable: true,
    },
    Esterilizacion: {
      type: "component",
      component: "shared.fases-del-proceso",
      repeatable: true,
    },
    Enfriamiento: {
      type: "component",
      component: "shared.fases-del-proceso",
      repeatable: true,
    },
    Produccion: {
      type: "component",
      component: "shared.fases-del-proceso",
      repeatable: true,
    },
    LimpiezaFinalCIP: {
      type: "component",
      component: "shared.fases-del-proceso",
      repeatable: true,
    },
    NumEsterilizaciones: {
      type: "component",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
      component: "shared.label-number",
      repeatable: false,
    },
    PlantaTratamiento: {
      type: "component",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
      component: "shared.label-text",
      repeatable: false,
    },
    Producto: {
      type: "component",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
      component: "shared.label-text",
      repeatable: false,
    },
    PuntosDeControl: {
      type: "dynamiczone",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
      components: ["shared.label-number"],
    },
  },
};

export const sharedFasesDelProceso = {
  collectionName: "components_shared_fases_del_procesos",
  info: {
    displayName: "Fases del Proceso",
  },
  options: {},
  attributes: {
    Label: {
      type: "string",
    },
    OK: {
      type: "boolean",
    },
    Inicio: {
      type: "time",
    },
    Fin: {
      type: "time",
    },
  },
  config: {},
};

// export type DbAttribute = {
//   name: string;
//   label: string;
//   dataType: DataType;
//   isRequired: boolean;
//   options?: Array<{ value: string; label: string }> | string[]; // según definas
//   defaultValue?: string | number | boolean | null;
//   orderIndex: number;
// };

export const testForms: FormInfo[] = [
  {
    id: uuidv4(),
    title: "Formulario Alsafe",
    description: "Formulario para el proceso Alsafe",
    createdAt: "2024-01-15T10:00:00Z",
    createdBy: "admin",
    status: "draft",
    attributes: [
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "Operador",
        label: "Operador",
        dataType: "select",
        isRequired: true,
        orderIndex: 1,
        defaultValue: "Operador 1",
        description: "Nombre del operador que realiza el proceso",
        options: ["Operador 1", "Operador 2", "Operador 3"],
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "Fecha",
        label: "Fecha",
        dataType: "date",
        isRequired: true,
        orderIndex: 2,
        defaultValue: "", // formato YYYY-MM-DD
        description: "Fecha en la que se realiza el proceso",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "NumEsterilizaciones",
        label: "Número de Esterilizaciones",
        dataType: "number",
        isRequired: false,
        orderIndex: 3,
        defaultValue: 0,
        description: "Cantidad de ciclos de esterilización realizados",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "PlantaTratamiento",
        label: "Planta de Tratamiento",
        dataType: "text",
        isRequired: false,
        orderIndex: 4,
        defaultValue: "",
        description: "Nombre de la planta de tratamiento utilizada",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "LimpiezaPreviaOk",
        label: "Limpieza Previa OK",
        dataType: "checkbox",
        isRequired: false,
        orderIndex: 5,
        defaultValue: false,
        description: "Indica si la limpieza previa fue correcta",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "EsterilizacionOk",
        label: "Esterilización OK",
        dataType: "switch",
        isRequired: false,
        orderIndex: 6,
        defaultValue: false,
        description: "Indica si la Esterilización fue correcta",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "Observaciones",
        label: "Observaciones",
        dataType: "textarea",
        isRequired: false,
        orderIndex: 7,
        defaultValue: "",
        description: "Observaciones adicionales sobre el proceso",
      },
      {
        id: uuidv4(),
        formId: uuidv4(),
        panelId: undefined,
        name: "CIP",
        label: "CIP Utilizado",
        dataType: "radio",
        isRequired: true,
        orderIndex: 8,
        defaultValue: "ninguno",
        description: "Indica si se utilizó CIP en el proceso",
        options: [
          { value: "sosa", label: "Sosa" },
          { value: "acido", label: "Ácido" },
          { value: "desinfectante", label: "Desinfectante" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
    ],
  },
];
