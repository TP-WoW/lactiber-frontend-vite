import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type {
  DataType,
  FormAttributeUpdateType,
  SampleConfigType,
} from "@/types/types";
import { Settings, Trash2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Input } from "./ui/input";
import { useFormEditor } from "@/hooks/use-formEditor";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { sampleDataset, sampleTags } from "@/data/dummy-data";
import { sampleFrecuencies } from "@/data/data";

export function FormAttributeDrawer({
  item,
}: {
  item: FormAttributeUpdateType;
}) {
  const { items, setItems } = useFormEditor();
  const curItem: FormAttributeUpdateType =
    items.find((it) => it.id === item.id) ?? item;

  const [newSettings, setNewSettings] = useState<FormAttributeUpdateType>(
    curItem ?? item,
  );
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >(
    (() => {
      if (typeof curItem?.optionsJson === "string") {
        try {
          const parsed = JSON.parse(curItem.optionsJson);
          if (
            Array.isArray(parsed) &&
            parsed.every(
              (opt) =>
                typeof opt === "object" && "value" in opt && "label" in opt,
            )
          ) {
            return parsed as Array<{ value: string; label: string }>;
          }
          return [];
        } catch {
          return [];
        }
      }
      return [];
    })(),
  );

  const [sampleConfigData, setSampleConfigData] =
    useState<SampleConfigType | null>(
      (() => {
        if (curItem?.dataType === "sample") {
          if (
            typeof curItem?.sampleConfigJson === "string" &&
            curItem.sampleConfigJson.trim() !== ""
          ) {
            try {
              const parsed = JSON.parse(curItem.sampleConfigJson);
              return parsed as SampleConfigType;
            } catch {
              return {
                sampleFrecuency: 0,
                manualMode: false,
                selectedDataset: "",
                selectedTag: "",
                manualSample: {
                  label: "",
                  name: "",
                  description: "",
                  type: "text",
                  defaultValue: "",
                },
              } as SampleConfigType; // Devuelve un objeto vacío si no se puede parsear
            }
          } else {
            return {
              sampleFrecuency: 0,
              manualMode: false,
              selectedDataset: "",
              selectedTag: "",
              manualSample: {
                label: "",
                name: "",
                description: "",
                type: "text",
                defaultValue: "",
              },
            } as SampleConfigType; // Devuelve un objeto vacío si no hay configuración previa
          }
        }
        return null; // Devuelve null si el tipo no es "sample"
      })(),
    );

  const handleAddOption = () => {
    console.log("Current Item in Drawer:", curItem);
    console.log("Current Options in Drawer:", options);
    setOptions((prevOptions) => [...prevOptions, { value: "", label: "" }]);
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "name") {
      value = value.replace(/[\s-]+/g, "_").toLowerCase();
      setNewSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    } else {
      setNewSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    }
  };

  const handleOptionsChange = (name: string, value: string) => {
    const [field, indexStr] = name.split("-");
    const index = parseInt(indexStr, 10);
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: value,
      };
      return updatedOptions;
    });
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios realizados en el Drawer
    console.log("Saving changes for item:", curItem?.id);
    // Por ejemplo, podrías actualizar el estado global o hacer una llamada a una API
    console.log("Updated Options:", options);
    // Transformamos el valor de manualSample.name para que sea un slug basado en el label
    if (sampleConfigData?.manualSample) {
      const slug = sampleConfigData.manualSample.label
        .toLowerCase()
        .replace(/\s+/g, "_");
        setSampleConfigData((prevConfig) =>
        prevConfig
          ? {
              ...prevConfig,
              manualSample: {
                ...prevConfig.manualSample,
                name: slug,
              },
            }
          : prevConfig,
      );
    }
    console.log("Updated Sample Config:", sampleConfigData);

    setNewSettings((prevSettings) => ({
      ...prevSettings,
      optionsJson: options,
      sampleConfigJson: sampleConfigData ? JSON.stringify(sampleConfigData) : undefined,
    }));
    console.log("New Settings to Save:", newSettings);
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === curItem?.id
          ? { ...it, ...newSettings, options: options, sampleConfigJson: sampleConfigData ? JSON.stringify(sampleConfigData) : undefined }
          : it,
      ),
    );
  };

  const handleRemoveOption = (index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, idx) => idx !== index));
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          <Settings className="text-secondary-foreground hover:cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>{item.dataType.toUpperCase()}</DrawerTitle>
          <DrawerDescription>Configure the form attribute.</DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="general">
          <TabsList variant="line">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={newSettings.name || item.name}
                  name="name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <Input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={newSettings.label || item.label}
                  name="label"
                  onChange={(e) => handleInputChange("label", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  className="w-full border rounded px-2 py-1"
                  defaultValue={
                    newSettings.description || item.description || ""
                  }
                  name="description"
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Default Value
                </label>
                <Input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={item.defaultValue ?? ""}
                  name="defaultValue"
                  onChange={(e) =>
                    handleInputChange("defaultValue", e.target.value)
                  }
                />
              </div>
              {/* Si el tipo es numérico, mostrar Max y Min */}
              {item.dataType === "number" && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Max
                    </label>
                    <Input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      defaultValue={item.max ?? ""}
                      name="max"
                      onChange={(e) => handleInputChange("max", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Min
                    </label>
                    <Input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      defaultValue={item.min ?? ""}
                      name="min"
                      onChange={(e) => handleInputChange("min", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="advanced">
            <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
              {(curItem?.dataType === "select" ||
                curItem?.dataType === "radio" ||
                curItem?.dataType === "checkbox") && (
                <div className="w-full flex flex-col gap-2">
                  <label className="block text-sm font-medium mb-1">
                    Options
                  </label>
                  <label className="block text-sm font-medium mb-1">
                    Default
                  </label>
                  <Input
                    className="w-full border rounded px-2 py-1"
                    defaultValue=""
                    name="defaultValue"
                    onChange={(e) =>
                      handleInputChange("defaultValue", e.target.value)
                    }
                  />
                  {options?.map((option, index) => (
                    <OptionsComponent
                      key={index}
                      option={option}
                      index={index}
                      handleOptionsChange={handleOptionsChange}
                      item={item}
                      handleRemoveOption={handleRemoveOption}
                    />
                  ))}
                  <Separator className="my-2" />
                  <Button onClick={handleAddOption}>Add Option</Button>
                </div>
              )}
              {curItem?.dataType === "sample" && sampleConfigData && (
                <SampleConfigurationComponent
                  sampleConfig={sampleConfigData}
                  setSampleConfig={setSampleConfigData}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DrawerFooter>
          <Button onClick={handleSave}>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const OptionsComponent = ({
  option,
  index,
  handleOptionsChange,
  handleRemoveOption,
  item,
}: {
  option: { value: string; label: string };
  index: number;
  handleOptionsChange: (name: string, value: string) => void;
  item: FormAttributeUpdateType;
  handleRemoveOption: (index: number) => void;
}) => {
  return (
    <div className="grid grid-cols-[2fr_2fr_1fr] gap-2 w-full max-w-full">
      <label className="block text-sm font-medium mb-1">Value</label>
      <label className="block text-sm font-medium mb-1">Label</label>
      <label className="block text-sm font-medium mb-1"></label>
      <Input
        className="w-full border rounded px-2 py-1"
        defaultValue={option.value}
        name={`value-${index}`}
        onChange={(e) => handleOptionsChange(`value-${index}`, e.target.value)}
      />
      <Input
        className="w-full border rounded px-2 py-1"
        defaultValue={option.label}
        name={`label-${index}`}
        onChange={(e) => handleOptionsChange(`label-${index}`, e.target.value)}
        disabled={
          item.dataType === "select" ||
          item.dataType === "radio" ||
          item.dataType === "checkbox"
            ? false
            : true
        }
      />
      <Button
        variant="outline"
        className="hover:cursor-pointer"
        onClick={() => handleRemoveOption(index)}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};

const SampleConfigurationComponent = ({
  sampleConfig,
  setSampleConfig,
}: {
  sampleConfig?: SampleConfigType;
  setSampleConfig?: React.Dispatch<
    React.SetStateAction<SampleConfigType | null>
  >;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full h-auto overflow-y-scroll">
      <p className="text-xs">
        Esta es la configuración específica para atributos de tipo "sample".
        Selecciona la frecuencia del muestreo.
      </p>

      <Select
        onValueChange={(e) => {
          if (setSampleConfig && sampleConfig) {
            setSampleConfig({
              ...sampleConfig,
              sampleFrecuency: Number(e),
            });
          }
        }}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue
            placeholder="Frecuencia de muestreo"
            defaultValue={sampleConfig?.sampleFrecuency?.toString()}
          />
        </SelectTrigger>
        <SelectContent className="w-full max-w-48">
          <SelectGroup>
            <SelectLabel>Frecuencia de Muestreo</SelectLabel>
            {sampleFrecuencies.map((frecuency) => (
              <SelectItem key={frecuency.value} value={frecuency.value}>
                {frecuency.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-xs">
        Selecciona el datasets y tags configurados, o configura una muestra
        manual con sus propios parámetros.
      </p>
      <FieldGroup className="w-full">
        <Field orientation="horizontal">
          <Checkbox
            id="manual-mode"
            name="manual-mode"
            defaultChecked={sampleConfig?.manualMode}
            onCheckedChange={(e) => {
              if (setSampleConfig && sampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  selectedDataset: sampleConfig.selectedDataset || "",
                  selectedTag: sampleConfig.selectedTag || "",
                  manualMode: e === false ? false : true,
                });
              }
            }}
          />
          <FieldLabel htmlFor="manual-mode">Muestra manual</FieldLabel>
        </Field>
      </FieldGroup>
      {!sampleConfig?.manualMode ? (
        <>
          <Select
            onValueChange={(e) => {
              if (setSampleConfig && sampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  selectedDataset: e,
                });
              }
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue
                placeholder="Dataset"
                defaultValue={sampleConfig?.selectedDataset}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Datasets Configurados</SelectLabel>
                {sampleDataset.map((dataset) => (
                  <SelectItem key={dataset.value} value={dataset.value}>
                    {dataset.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              if (setSampleConfig && sampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  selectedTag: e,
                });
              }
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue
                placeholder="Select Tag"
                defaultValue={sampleConfig?.selectedTag}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tags Configurados</SelectLabel>
                {sampleTags.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      ) : (
        <>
          <Select
            value={sampleConfig?.manualSample?.type}
            onValueChange={(value: DataType) => {
              if (setSampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  manualSample: { ...sampleConfig.manualSample, type: value },
                });
              }
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Tipo de dato" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de dato</SelectLabel>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="number">Número</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            name="label"
            className="w-full rounded-lg px-2 py-1"
            placeholder="Label Name"
            defaultValue={sampleConfig?.manualSample?.label}
            onChange={(e) => {
              if (setSampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  manualSample: {
                    ...sampleConfig.manualSample,
                    label: e.target.value,
                  },
                });
              }
            }}
            required={sampleConfig?.manualMode ? false : true}
          />
          <Input
            name="description"
            className="w-full rounded-lg px-2 py-1"
            placeholder="Description"
            defaultValue={sampleConfig?.manualSample?.description}
            onChange={(e) => {
              if (setSampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  manualSample: {
                    ...sampleConfig.manualSample,
                    description: e.target.value,
                  },
                });
              }
            }}
          />
          <Input
            name="defaultValue"
            className="w-full rounded-lg px-2 py-1"
            placeholder="Valor por defecto"
            defaultValue={sampleConfig?.manualSample?.defaultValue}
            onChange={(e) => {
              if (setSampleConfig) {
                setSampleConfig({
                  ...sampleConfig,
                  manualSample: {
                    ...sampleConfig.manualSample,
                    defaultValue: e.target.value,
                  },
                });
              }
            }}
          />
          {sampleConfig?.manualSample?.type === "number" && (
            <div className="flex gap-4">
              <Input
                type="number"
                name="min"
                className="w-full rounded-lg px-2 py-1"
                placeholder="Min"
                defaultValue={sampleConfig?.manualSample?.min}
                onChange={(e) => {
                  if (setSampleConfig) {
                    setSampleConfig({
                      ...sampleConfig,
                      manualSample: {
                        ...sampleConfig.manualSample,
                        min: Number(e.target.value),
                      },
                    });
                  }
                }}
              />
              <Input
                type="number"
                name="max"
                className="w-full rounded-lg px-2 py-1"
                placeholder="Max"
                defaultValue={sampleConfig?.manualSample?.max}
                onChange={(e) => {
                  if (setSampleConfig) {
                    setSampleConfig({
                      ...sampleConfig,
                      manualSample: {
                        ...sampleConfig.manualSample,
                        max: Number(e.target.value),
                      },
                    });
                  }
                }}
              />
              <Input
                type="text"
                name="engUnits"
                className="w-full rounded-lg px-2 py-1"
                placeholder="Unidad"
                defaultValue={sampleConfig?.manualSample?.engUnits}
                onChange={(e) => {
                  if (setSampleConfig) {
                    setSampleConfig({
                      ...sampleConfig,
                      manualSample: {
                        ...sampleConfig.manualSample,
                        engUnits: e.target.value,
                      },
                    });
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
