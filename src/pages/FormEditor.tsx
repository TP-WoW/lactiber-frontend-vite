import DndContainer from "@/components/dnd/DndContainer";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toolItems } from "@/data/data";
import type { DataType, DbAttribute } from "@/types/types";
import { Save, type LucideProps } from "lucide-react";
import {
  memo,
  useEffect,
  useState,
  type ForwardRefExoticComponent,
} from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export type DndItemTypes = {
  id: number;
  name: string;
};

const FormEditor = () => {
  const [items, setItems] = useState<DbAttribute[]>([]);
  const params = new URLSearchParams(window.location.search);
  const formId = params.get("id") || ""; // Get form ID from route params or state

  const handleAddNewItem = (item: DataType) => {
    const newId = uuidv4();
    const newItem: DbAttribute = {
      id: newId,
      formId: formId,
      panelId: null,
      name: `name_${newId}`,
      label: `label_${newId}`,
      dataType: item,
      isRequired: true,
      orderIndex: items.length,
      defaultValue: "",
      description: "",
      options: [],
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleSave = async () => {
    const itemsWithOrderIndex = items.map((item, idx) => ({
      ...item,
      orderIndex: idx + 1,
    }));
    console.log("Saving form with items:", itemsWithOrderIndex);
    setItems(itemsWithOrderIndex);
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
      console.log("Form attributes saved successfully");
      toast.success("Form attributes saved successfully");
    } catch (error) {
      console.error("Error saving form attributes:", error);
      toast.error("Error saving form attributes");
    }
  };

  const fetchFormAttributes = async (formId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-attributes?formId=${formId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch form attributes");
      }
      const data = await response.json();
      console.log("Fetched form attributes:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching form attributes:", error);
    }
  };

  useEffect(() => {
    if (formId) {
      fetchFormAttributes(formId);
    }
  }, [formId]);

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex flex-col w-full h-full items-start mb-6 gap-2">
        <div className="flex flex-row items-center justify-between w-full gap-4 bg-muted/50 p-4 rounded-md">
          <div className="flex flex-col  w-full">
            <h1 className="text-2xl font-bold">Formulario</h1>
            <span className="italic text-sm">{formId}</span>
          </div>
          <Button className="" onClick={handleSave}>
            <Save /> Guardar
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

export default memo(FormEditor);

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
