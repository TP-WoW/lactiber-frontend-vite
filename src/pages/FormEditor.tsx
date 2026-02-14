import DndContainer from "@/components/dnd/DndContainer";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo, useEffect, useState, type ForwardRefExoticComponent } from "react";
import { keysToCamelCase } from "@/lib/utils";
import type { DataType, DbAttribute, FormInfo } from "@/types/types";
import { toolItems } from "@/data/data";
import { v4 as uuidv4 } from "uuid";
import { Save, type LucideProps } from "lucide-react";
import { toast } from "sonner";
import { useFormEditor } from "@/hooks/use-formEditor";
import { FormEditorProvider } from "@/contexts/form-editor-context";
import { useUser } from "@/hooks/use-user";

const FormEditor = () => {
  const params = new URLSearchParams(window.location.search);
  const formId = params.get("id") || "";
  return (
    <FormEditorProvider formId={formId}>
      <FormEditorInner />
    </FormEditorProvider>
  );
};

const FormEditorInner = () => {

  const { items, setItems } = useFormEditor();
  const [formInfo, setFormInfo] = useState<FormInfo | null>(null);
  const { user } = useUser();

  const getFormInfo = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forms/${id}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch form info");
      }
      const data = await response.json();
      const camelData: FormInfo = keysToCamelCase(data) as FormInfo;
      console.log("Form Info Response (camelCase):", camelData);
      setFormInfo(camelData);
    } catch (error) {
      console.error("Error fetching form info:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const formId = params.get("id") || "";
    if (formId) {
      getFormInfo(formId);
      console.log("Form ID:", formInfo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  const handleAddNewItem = (item: DataType) => {
    const newId = uuidv4();
    const newItem: DbAttribute = {
      id: newId,
      formId: formInfo ? formInfo.id : "unknown_form",
      panelId: null,
      name: `name_${newId}`,
      label: `label_${newId}`,
      dataType: item,
      isRequired: true,
      orderIndex: items.length,
      defaultValue: "",
      description: "",
      options: [],
      sampleConfigJson: undefined,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleSave = async () => {
    const itemsWithOrderIndex = items.map((item, idx) => ({
      ...item,
      orderIndex: idx + 1,
      optionsJson: JSON.stringify(item.options),
      createdBy: user?.userName, 
    }));
    setItems(itemsWithOrderIndex);
    console.log("Saving items:", itemsWithOrderIndex);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-attributes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: itemsWithOrderIndex }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to save form attributes");
      }
      toast.success("Form attributes saved successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error saving form attributes", ${error.message}` );
        return;
      } else {
        toast.error("Error saving form attributes");
      }
    }
  };

  const handlePublish = async () => {
    console.log("Publishing form with ID:", formInfo?.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forms/publish/${formInfo?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },          
        },
      );
      if (!response.ok) {
        throw new Error("Failed to publish form");
      }
      toast.success("Form published successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error publishing form: ${error.message}`);
        return;
      }
      toast.error("Error publishing form");
    }
  };

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex flex-col w-full h-full items-start mb-6 gap-2">
        <div className="flex flex-row items-center justify-between w-full gap-4 bg-muted/50 p-4 rounded-md">
          <div className="flex flex-col  w-full">
            <h1 className="text-2xl font-bold">{formInfo?.title || "Untitled Form"}</h1>
            <span className="italic text-sm">{formInfo?.id}</span>
          </div>
          <Button className="" onClick={handleSave}>
            <Save /> Guardar
          </Button>
          <Button variant={"secondary"} className="" onClick={handlePublish}>
            <Save /> Publicar
          </Button>
        </div>
        <div className="flex flex-row items-center justify-start w-full gap-4 bg-muted/50 p-4 rounded-md">
          <ComponentToolsBar handleAddNewItem={handleAddNewItem} />
        </div>
        <div className="flex-1 flex-col w-full bg-muted/50 rounded-md overflow-auto p-5">
          {items.length > 0 && (
            <DndContainer items={items} setItems={setItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export const ComponentToolsBar = ({
  handleAddNewItem,
}: {
  handleAddNewItem: (item: DataType) => void;
}) => {
  return (
    <>
      {toolItems.map(
        (tool: {
          type: DataType;
          icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
          tooltip: string;
        }) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button className="" onClick={() => handleAddNewItem(tool.type)}>
                <tool.icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tool.tooltip}</TooltipContent>
          </Tooltip>
        ),
      )}
    </>
  );
};

export default memo(FormEditor);

