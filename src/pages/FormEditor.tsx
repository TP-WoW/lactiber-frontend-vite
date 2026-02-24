import DndContainer from "@/components/dnd/DndContainer";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  memo,
  useEffect,
  useState,
  type ForwardRefExoticComponent,
} from "react";
import { keysToCamelCase } from "@/lib/utils";
import type { DataType, DbAttribute, FormInfo } from "@/types/types";
import { toolItems } from "@/data/data";
import { v4 as uuidv4 } from "uuid";
import { LogOut, Save, type LucideProps } from "lucide-react";
import { toast } from "sonner";
import { useFormEditor } from "@/hooks/use-formEditor";
import { FormEditorProvider } from "@/contexts/form-editor-context";
import { useUser } from "@/hooks/use-user";
import { AddCustomComponentDialog } from "@/components/custom-dialogs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const { t } = useTranslation("common"); // Asegúrate de tener la función de traducción disponible
  const navigate = useNavigate();

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

  const handleAddNewItem = async (
    item: DataType,
    customComponentName?: string,
  ) => {
    if (item === "custom") {
      // Handle custom component addition
      console.log("Adding custom component:", customComponentName);
      if (customComponentName) {
        // You can create a new DbAttribute for the custom component and add it to the items list
        try {
          const result = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/form-attributes/get-custom/${customComponentName}`,
          );
          if (!result.ok) {
            throw new Error("Failed to fetch custom component data");
          }
          const data = await result.json();
          const componentData = JSON.parse(data[0].json); // Assuming the API returns an array and the JSON is in the 'json' field
          console.log("Custom component data:", componentData);

          const newId = uuidv4(); // Generate a unique ID for the parent panel
          const newPanel: DbAttribute = {
            id: newId,
            formId: formInfo ? formInfo.id : "unknown_form",
            panelId: null,
            name: `panel_${newId}`,
            label: componentData.label || `Panel ${newId}`,
            dataType: "panel",
            isRequired: false,
            orderIndex: items.filter((it) => it.panelId === null).length, // Place at the end of top-level items
            description: componentData.description || "",
            defaultValue: "",
            options: [],
            sampleConfigJson: data[0].json, // Store the original JSON for reference
          };
          setItems((prevItems) => [...prevItems, newPanel]);

          if (componentData.children && Array.isArray(componentData.children)) {
            const childItems: DbAttribute[] = componentData.children.map(
              ({ child }: { child: DbAttribute }, index: number) => ({
                id: uuidv4(),
                formId: formInfo ? formInfo.id : "unknown_form",
                panelId: newId, // Set the panelId to the new panel's ID
                name: `${child.name}_${newId}`,
                label: child.label || `Child ${index}`,
                dataType: child.dataType as DataType,
                isRequired: child.isRequired || false,
                orderIndex: index,
                defaultValue: child.defaultValue || "",
                description: child.description || "",
                options: child.options || [],
                sampleConfigJson: child.sampleConfigJson || "",
              }),
            );
            setItems((prevItems) => [...prevItems, ...childItems]);
          }
        } catch (error) {
          console.error("Error fetching custom component data:", error);
        }
        return;
      }
    }

    // Handle regular item addition
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
        throw new Error(t("failedToSaveFormAttributes"));
      }
      toast.success(t("formAttributesSaved"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`${t("errorSavingFormAttributes")}: ${error.message}`);
        return;
      } else {
        toast.error(t("errorSavingFormAttributes"));
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
            <h1 className="text-2xl font-bold">
              {formInfo?.title || "Untitled Form"}
            </h1>
            <span className="italic text-sm">{formInfo?.id}</span>
          </div>
          <Button className="hover:cursor-pointer" onClick={handleSave}>
            <Save /> {t("save")}
          </Button>
          <Button
            variant={"secondary"}
            className="hover:cursor-pointer"
            onClick={handlePublish}
          >
            <Save /> {t("publish")}
          </Button>
          <Button
            variant={"secondary"}
            className="hover:cursor-pointer"
            onClick={() => navigate("/designer/forms")}
          >
            <LogOut /> {t("exit")}
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
  const { t } = useTranslation("common");
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
            <TooltipContent>{t(tool.tooltip)}</TooltipContent>
          </Tooltip>
        ),
      )}
      <Tooltip key="custom">
        <TooltipTrigger asChild>
          <AddCustomComponentDialog handleAddNewItem={handleAddNewItem} />
        </TooltipTrigger>
        <TooltipContent>{t("addCustomComponent")}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default memo(FormEditor);
