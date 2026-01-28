import type {
  DataType,
  DbAttribute,
  FormComponent,
  FormComponentProps,
} from "@/types/types";
import { useState, type FormEvent } from "react";
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
import { SaveIcon, SendIcon } from "lucide-react";
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

// Render dinámico desde BD
export function DynamicForm({
  attributes,
  onSubmit,
}: {
  attributes: DbAttribute[];
  onSubmit?: (
    values: Record<string, unknown>,
    e: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
}) {
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

  const handleChange = (name: string, value: unknown) => {
    // Aquí podrías manejar cambios si es necesario
    if (
      value &&
      typeof value === "object" &&
      "target" in value &&
      value.target &&
      typeof (value.target as HTMLInputElement).value !== "undefined"
    ) {
      console.log(
        `Field changed: ${name} =`,
        (value as { target: { value: unknown } }).target.value,
      );
    } else {
      console.log(`Field changed: ${name} =`, value);
    }
  };

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
                <Comp
                  name={attr.name}
                  label={attr.label}
                  required={attr.isRequired}
                  options={attr.options}
                  defaultValue={attr.defaultValue}
                  description={attr.description}
                  maxLength={attr.maxLength}
                  minLength={attr.minLength}
                  max={attr.max}
                  min={attr.min}
                  onChange={(e) => handleChange(attr.name, e)}
                />
              </div>
            );
          })}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col items-center justify-between md:flex-row gap-2 mt-2">
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
      </div>
    </form>
  );
}

// Componentes específicos por tipo

export const FormComponentInput = ({
  props,
  type,
}: {
  props: FormComponentProps;
  type: "text" | "number" | "email" | "password";
}) => {
  console.log("Rendering Input for", props);
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
      <Input
        id={props.name}
        name={props.name}
        type={type}
        placeholder={props.label}
        required={props.required || false}
        className="rounded-lg"
        onChange={props.onChange}
      />
      <FieldDescription>{props.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentSelect = ({
  props,
}: {
  props: FormComponentProps;
}) => {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
      <Select
        name={props.name}
        required={props.required || false}
        defaultValue={props.defaultValue as string}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={props.defaultValue as string} />
        </SelectTrigger>
        <SelectContent>
          {(props.options ?? []).map((opt) =>
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
      <FieldDescription>{props.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentDate = ({ props }: { props: FormComponentProps }) => {
  const [date, setDate] = useState<Date>();
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="date-picker-simple">{props.label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
      {/* Este input oculto es el que FormData recogerá */}
      <input
        type="hidden"
        name={props.name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />
      <FieldDescription>{props.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentCheckbox = ({
  props,
}: {
  props: FormComponentProps;
}) => {
  return (
    <FieldGroup className="w-full">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          id={props.name}
          name={props.name}
          defaultChecked={!!props.defaultValue}
        />
        <FieldContent>
          <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
          <FieldDescription className="text-wrap">
            {props.description || ""}
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
};

export const FormComponentTextArea = ({
  props,
}: {
  props: FormComponentProps;
}) => {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
      <Textarea id={props.name} name={props.name} placeholder={props.label} />
      <FieldDescription>{props.description || ""}</FieldDescription>
    </Field>
  );
};

export const FormComponentSwitch = ({
  props,
}: {
  props: FormComponentProps;
}) => {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldContent>
        <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
        <FieldDescription>{props.description || ""}</FieldDescription>
      </FieldContent>
      <Switch
        id={props.name}
        name={props.name}
        defaultChecked={!!props.defaultValue}
        disabled={false}
      />
    </Field>
  );
};

export const FormComponentRadio = ({
  props,
}: {
  props: FormComponentProps;
}) => {
  return (
    <FieldSet className="w-full">
      <FieldLegend variant="label">{props.label}</FieldLegend>
      <FieldDescription>
        {props.description || ""}
      </FieldDescription>
      <RadioGroup defaultValue="monthly">
        {(props.options ?? []).map((opt) =>
          typeof opt === "string" ? (
            <Field orientation="horizontal" key={opt}>
              <RadioGroupItem value={opt} id={`plan-${opt}`} />
              <FieldLabel htmlFor={`plan-${opt}`} className="font-normal">
                {opt}
              </FieldLabel>
            </Field>
          ) : (
            <Field orientation="horizontal" key={opt.value}>
              <RadioGroupItem value={opt.value} id={`plan-${opt.value}`} defaultChecked={props.defaultValue === opt.value} />
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
const componentsByType: Record<DataType, FormComponent> = {
  text: (p) => <FormComponentInput props={p} type="text" />,
  number: (p) => <FormComponentInput props={p} type="number" />,
  select: (p) => <FormComponentSelect props={p} />,
  date: (p) => <FormComponentDate props={p} />,
  checkbox: (p) => <FormComponentCheckbox props={p} />,
  textarea: (p) => <FormComponentTextArea props={p} />,
  radio: (p) => <FormComponentRadio props={p} />,
  switch: (p) => <FormComponentSwitch props={p} />,
  panel: (p) => <div>Panel {p.name} component not implemented yet.</div>,
};
