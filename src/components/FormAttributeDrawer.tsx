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
import type { DbAttribute } from "@/types/types";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Input } from "./ui/input";

export function FormAttributeDrawer({ item }: { item: DbAttribute }) {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const handleAddOption = () => {
    setOptions((prevOptions) => {
      // prevOptions is Array<{ value: string; label: string }>
      return [
        ...(prevOptions as Array<{ value: string; label: string }>),
        { value: "", label: "" },
      ];
    });
  };

  const handleInputChange = (name: string, value: string) => {
    // console.log("Changed value:", name, value);
    // Lógica para manejar el cambio en las opciones
    const [field, indexStr] = name.split("-");
    const index = parseInt(indexStr, 10);
    // console.log("Field:", field, "Index:", index);

    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      if (
        Array.isArray(updatedOptions) &&
        updatedOptions.length > 0 &&
        typeof updatedOptions[0] === "object"
      ) {
        // Array<{ value, label }>
        updatedOptions[index] = {
          ...(updatedOptions[index] as { value: string; label: string }),
          [field]: value,
        };
      }
      return updatedOptions;
    });
    console.log("Updated options:", options);
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
                <input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={item.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={item.label}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border rounded px-2 py-1"
                  defaultValue={item.description || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Default Value
                </label>
                <input
                  className="w-full border rounded px-2 py-1"
                  defaultValue={item.defaultValue ?? ""}
                />
              </div>
              {/* Si el tipo es numérico, mostrar Max y Min */}
              {item.dataType === "number" && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Max
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      defaultValue={item.max ?? ""}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Min
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      defaultValue={item.min ?? ""}
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="advanced">
            <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
              <div className="w-full flex flex-col gap-2">
                <label className="block text-sm font-medium mb-1">
                  Options
                </label>
                <label className="block text-sm font-medium mb-1">
                  Default
                </label>
                <input
                  className="w-full border rounded px-2 py-1"
                  defaultValue=""
                />
                {options?.map((option, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <label className="block text-sm font-medium mb-1">
                      Value
                    </label>
                    <label className="block text-sm font-medium mb-1">
                      Label
                    </label>
                    <Input
                      className="w-full border rounded px-2 py-1"
                      defaultValue=""
                      name={`value-${index}`}
                      onChange={(e) =>
                        handleInputChange(`value-${index}`, e.target.value)
                      }
                    />
                    <Input
                      className="w-full border rounded px-2 py-1"
                      defaultValue=""
                      name={`label-${index}`}
                      onChange={(e) =>
                        handleInputChange(`label-${index}`, e.target.value)
                      }
                      disabled={item.dataType === "select" ? false : true}
                    />
                  </div>
                ))}
                <Separator className="my-2" />
                <Button onClick={handleAddOption}>Add Option</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
