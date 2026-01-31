import type {
  DataType,
  ReportAttribute,
} from "@/types/types";
import { useState, type FormEvent, type JSX } from "react";
import { Button } from "./ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { LogOut, SaveIcon, SendIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns/format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useNavigate } from "react-router-dom";

// Render dinámico desde BD
export function DynamicForm({
  attributes,
  onSubmit,
  isEditable,
}: {
  attributes: ReportAttribute[];
  isEditable: boolean;
  onSubmit?: (
    values: Record<string, unknown>,
    e: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
}) {
  const [editable] = useState<boolean>(isEditable);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1) Construir FormData
    const fd = new FormData(e.currentTarget);

    console.log("Raw FormData entries:", Array.from(fd.entries()));

    // 2) Normalizar valores (checkbox → boolean, number → number, etc.)
    const values: Record<string, unknown> = {};
    for (const attr of attributes) {
      const { name, dataType } = attr;

      // Nota: para checkbox, FormData solo contiene la clave si está marcada.
      if (dataType === "checkbox") {
        values[name] = fd.get(name) != null; // boolean
        continue;
      }

      const raw = fd.get(name);
      if (raw == null) {
        values[name] = null;
        continue;
      }

      // Tipado básico por dataType
      if (dataType === "number") {
        const n = Number(raw);
        values[name] = isNaN(n) ? null : n;
      } else {
        // text, select, date → string por defecto
        values[name] = String(raw);
      }
    }

    // 3) (Opcional) Validación rápida de requeridos
    const missingRequired = attributes
      .filter((a) => a.isRequired)
      .filter(
        (a) =>
          values[a.name] === null ||
          values[a.name] === "" ||
          values[a.name] === undefined,
      );

    if (missingRequired.length > 0) {
      // Aquí puedes mostrar un toast o setear estado de error
      alert(
        `Faltan campos requeridos: ${missingRequired.map((m) => m.label).join(", ")}`,
      );
      return;
    }

    // 4) Callback al padre
    await onSubmit?.(values, e);
  };
  // console.log("Rendering DynamicForm with attributes:", attributes);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Renderizado dinámico de campos */}
        {attributes
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((attr) => {
            switch (attr.dataType) {
              case "panel": {
                  const panelChildren = attributes.filter(
                    (a) => a.panelId === attr.id,
                  );
                  console.log("panel children:", panelChildren);
              }
                break;
            }

            const Comp = componentsByType[attr.dataType] ?? componentsByType.text; // fallback              

            return (
              <div
                key={attr.name}
                className="bg-muted/50 aspect-video p-4 rounded-lg"
              >
                {Comp(attr, editable)}
              </div>
            );
          })}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col items-center justify-between md:justify-end md:flex-row gap-2 mt-2">
        <Button
          type="submit"
          className="rounded-lg hover:cursor-pointer md:w-fit w-full"
        >
          <SendIcon className="mr-2 h-4 w-4" />
          Submit
        </Button>
        <Button
          variant="outline"
          className="rounded-lg hover:cursor-pointer md:w-fit w-full"
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button
          variant="outline"
          className="rounded-lg hover:cursor-pointer md:w-fit w-full"
          onClick={() => navigate('/dashboard/forms')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>
    </form>
  );
}

// Componentes específicos por tipo

export const FormComponentInput = ({
  attr,
  type,
  editable,
}: {
  attr: ReportAttribute;
  type: "text" | "number" | "email" | "password";
  editable: boolean;
}) => {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={attr.name}>{attr.label}</FieldLabel>
      <Input
        id={attr.name}
        name={attr.name}
        type={type}
        placeholder={attr.label}
        required={attr.isRequired || false}
        className="rounded-lg"
        disabled={!editable}
        // onChange={attr.onChange}
      />
      <FieldDescription>{attr.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentSelect = ({
  attr,
  editable,
}: {
  attr: ReportAttribute;
  editable: boolean;
}) => {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={attr.name}>{attr.label}</FieldLabel>
      <Select
        name={attr.name}
        required={attr.isRequired || false}
        defaultValue={attr.defaultValue as string}
        disabled={!editable}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={attr.defaultValue as string} />
        </SelectTrigger>
        <SelectContent>
          {(attr.options ?? []).map((opt) =>
            typeof opt === "string" ? (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ) : (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
      <FieldDescription>{attr.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentDate = ({ attr, editable }: { attr: ReportAttribute; editable: boolean }) => {
  const [date, setDate] = useState<Date>();
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="date-picker-simple">{attr.label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
            disabled={!editable}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={!editable}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
      {/* Este input oculto es el que FormData recogerá */}
      <input
        type="hidden"
        name={attr.name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
        disabled={!editable}
      />
      <FieldDescription>{attr.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentCheckbox = ({
  attr,
  editable,
}: {
  attr: ReportAttribute;
  editable: boolean;
}) => {
  return (
    <FieldGroup className="w-full">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          id={attr.name}
          name={attr.name}
          defaultChecked={!attr.defaultValue}
          disabled={!editable}
        />
        <FieldContent>
          <FieldLabel htmlFor={attr.name}>{attr.label}</FieldLabel>
          <FieldDescription className="text-wrap">
            {attr.description || ""}
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
};

export const FormComponentTextArea = ({
  attr,
  editable,
}: {
  attr: ReportAttribute;
  editable: boolean;
}) => {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={attr.name}>{attr.label}</FieldLabel>
      <Textarea id={attr.name} name={attr.name} placeholder={attr.label} disabled={!editable} />
      <FieldDescription>{attr.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentSwitch = ({
  attr,
  editable,
}: {
  attr: ReportAttribute;
  editable: boolean;
}) => {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldContent>
        <FieldLabel htmlFor={attr.name}>{attr.label}</FieldLabel>
        <FieldDescription>{attr.description || ""}</FieldDescription>
      </FieldContent>
      <Switch
        id={attr.name}
        name={attr.name}
        defaultChecked={!!attr.defaultValue}
        disabled={!editable}
      />
    </Field>
  );
};

export const FormComponentRadio = ({
  attr,
  editable,
}: {
  attr: ReportAttribute;
  editable: boolean;
}) => {
  return (
    <FieldSet className="w-full">
      <FieldLegend variant="label">{attr.label}</FieldLegend>
      <FieldDescription>
        {attr.description || ""}
      </FieldDescription>
      <RadioGroup defaultValue="monthly" name={attr.name} className="mt-2 space-y-2" disabled={!editable}>
        {(JSON.parse(attr.optionsJson ?? "[]") ?? []).map((opt: {value: string; label: string}) =>
          typeof opt === "string" ? (
            <Field orientation="horizontal" key={opt}>
              <RadioGroupItem value={opt} id={`plan-${opt}`} />
              <FieldLabel htmlFor={`plan-${opt}`} className="font-normal">
                {opt}
              </FieldLabel>
            </Field>
          ) : (
            <Field orientation="horizontal" key={opt.value}>
              <RadioGroupItem value={opt.value} id={`plan-${opt.value}`} defaultChecked={attr.defaultValue === opt.value} />
              <FieldLabel htmlFor={`plan-${opt.value}`} className="font-normal">
                {opt.label}
              </FieldLabel>
            </Field>
          )
        )}
      </RadioGroup>
    </FieldSet>
  );
};

// Mapeo de componentes por tipo de dato
const componentsByType: Record<DataType, (attr: ReportAttribute, editable: boolean) => JSX.Element> = {
  text: (attr: ReportAttribute, editable: boolean) => <FormComponentInput attr={attr} editable={editable} type="text" />,
  number: (attr, editable) => <FormComponentInput attr={attr} editable={editable} type="number" />,
  select: (attr, editable) => <FormComponentSelect attr={attr} editable={editable} />,
  date: (attr, editable) => <FormComponentDate attr={attr} editable={editable} />,
  checkbox: (attr, editable) => <FormComponentCheckbox attr={attr} editable={editable} />,
  textarea: (attr, editable) => <FormComponentTextArea attr={attr} editable={editable} />,
  radio: (attr, editable) => <FormComponentRadio attr={attr} editable={editable} />,
  switch: (attr, editable) => <FormComponentSwitch attr={attr} editable={editable} />,
  panel: (p, editable) => <div>Panel {p.name} component not implemented yet. and editable: {editable.toString()}</div>,
  custom: (p, editable) => <div>Custom {p.name} component not implemented yet. and editable: {editable.toString()}</div>,
};
