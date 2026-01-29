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
import type { FormAttributeUpdateType } from "@/types/types";
import { Settings, Trash2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Input } from "./ui/input";
import { useFormEditor } from "@/hooks/use-formEditor";
import { Textarea } from "./ui/textarea";

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

  const handleAddOption = () => {
    console.log("Current Item in Drawer:", curItem);
    console.log("Current Options in Drawer:", options);
    setOptions((prevOptions) => [...prevOptions, { value: "", label: "" }]);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
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
    setNewSettings((prevSettings) => ({
      ...prevSettings,
      optionsJson: options,
    }));
    console.log("New Settings to Save:", newSettings);
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === curItem?.id
          ? { ...it, ...newSettings, options: options }
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
        disabled={item.dataType === "select" ? false : true}
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
