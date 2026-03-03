import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReportStatus, type DataType, type FormInfo, type FormReport, type LookupType } from "@/types/types";
import { PlusCircleIcon, Save, UserRoundPen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { keysToCamelCase } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useUser } from "@/hooks/use-user";
import { v4 as uuidv4 } from 'uuid';
import { datasourcesSample as datasources } from "@/data/dummy-data";


export function AddNewFormInstance({ forms }: { forms: FormInfo[] }) {
  console.log("Forms in Dialog:", forms);
  const [newReportData, setNewReportData] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  const {t} = useTranslation("common");

  const handleCreateReport = async () => {
    console.log("Creating report...", newReportData);
    // Aquí va la lógica para crear un nuevo informe
    if (!newReportData || !newReportData.type) {
      toast(t("fillAllFieldsToCreateReport"));
      return;
    }
    const data: FormReport = {
      id: "",
      createdAt: "",
      name: newReportData.name,
      description: newReportData.description,
      formId: newReportData.type,
      createdBy: "current_user", // Reemplaza con el usuario actual
      status: ReportStatus.NEW,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Error creating report");
      }
      const result: FormReport = await response.json();
      const resultCamel = keysToCamelCase(result) as FormReport;

      toast(`Nuevo Informe Creado: ${resultCamel.name}`);
    } catch (error) {
      toast("Hubo un error al crear el informe.");
      console.error("Error creating report:", error);
    }
  };

  const handleInputChange = (
    field: "name" | "description" | "type",
    value: string,
  ) => {
    setNewReportData((prevData) => {
      const data = prevData ?? {
        name: "Reporte de producción",
        description: "Descripción del informe",
        type: "",
      };
      return {
        ...data,
        [field]: value,
      };
    });
    console.log("Updated newReportData:", newReportData);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="m-4 hover:cursor-pointer">
            <PlusCircleIcon />
            {t("createNewReport")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{t("newReport")}</DialogTitle>
            <DialogDescription>
              {t("fillFieldsToCreateNewForm")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                name="name"
                defaultValue={newReportData?.name || t("defaultName")}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={
                  newReportData?.description || t("defaultDescription")
                }
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <Select onValueChange={(e) => handleInputChange("type", e)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={t("reportType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("reportType")}</SelectLabel>
                  {forms.map((form) => (
                    <SelectItem key={form.id} value={form.id}>
                      {form.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button onClick={handleCreateReport}>{t("createReport")}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function SaveCustomComponentDiaglog({ id, open, onOpenChange }: { id: string; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const {t} = useTranslation("common");
  const [componentName, setComponentName] = useState<string | null>(null);
  const handleSaveCustomComponent = async () => {
    // Aquí va la lógica para guardar el nuevo componente personalizado
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-attributes/add-custom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              componentName: componentName,
              id: id,
            },
          }),
        },
      );
      if (!result.ok) {
        throw new Error(t("errorSavingCustomComponent"));
      }
      toast.success(
        `${t("customizedComponent")} "${componentName}" ${t("savedSuccessfully")}.`,
      );
      setComponentName(null); // Reset form after successful save
    } catch (error) {
      toast.error(t("errorSavingCustomComponent"));
      console.error("Error saving custom component:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form className="w-fit">
        <DialogTrigger asChild>
          <Button variant={"outline"} className="hover:cursor-pointer flex flex-row items-center justify-between w-fit">
            {/* {t("save")}  */}
            <Save />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{t("saveCustomComponent")}</DialogTitle>
            <DialogDescription>
              {t("fillFieldsToSaveCustomComponent")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                name="name"
                defaultValue={componentName || ""}
                onChange={(e) => setComponentName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              onClick={handleSaveCustomComponent}
              disabled={!componentName}
            >
              {t("saveComponent")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function AddCustomComponentDialog({ handleAddNewItem }: { handleAddNewItem: (item: DataType, customComponentName?: string) => void }) {
  const [customComponents, setCustomComponents] = useState<
    | {
        id: string;
        componentName: string;
        dataType: string;
      }[]
    | []
  >([]);

  const [selectedCustomComponent, setSelectedCustomComponent] = useState<
    string | null
  >(null);

  const fetchCustomComponents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-attributes/getAllCustom`,
      );
      if (!response.ok) {
        throw new Error(t("errorFetchingCustomComponents"));
      }
      const data = await response.json();
      setCustomComponents(data);
    } catch (error) {
      console.error(t("errorFetchingCustomComponents"), error);
    }
  };

  const handleAddCustomComponent = () => {
    // Aquí puedes manejar la lógica cuando se selecciona un componente personalizado
    console.log("Componente seleccionado:", selectedCustomComponent);
    if (selectedCustomComponent) {
      handleAddNewItem("custom", selectedCustomComponent);
    }
  };

  useEffect(() => {
    fetchCustomComponents();
  }, []);

  const {t} = useTranslation("common"); // Asegúrate de tener la función de traducción disponible

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="hover:cursor-pointer">
            <UserRoundPen />            
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{t("newCustomComponent")}</DialogTitle>
            <DialogDescription>
              {t("fillFieldsToCreateCustomComponent")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Select onValueChange={(e) => setSelectedCustomComponent(e)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={t("selectComponent")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("selectComponent")}</SelectLabel>
                  {customComponents?.map((comp) => (
                    <SelectItem key={comp.id} value={comp.componentName}>
                      {comp.componentName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              onClick={handleAddCustomComponent}
              disabled={!selectedCustomComponent}
            >
              {t("addCustomComponent")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function AddNewLookup() {
  const [newLookupData, setNewLookupData] = useState<LookupType | null>(null);
  const {t} = useTranslation("common");
  const {user} = useUser();

  const handleCreateLookup = async () => {
    console.log("Creating lookup...", newLookupData);
    // Aquí va la lógica para crear un nuevo informe
    if (!newLookupData || !newLookupData.name || !newLookupData.commandType) {
      toast(t("fillAllFieldsToCreateLookup"));
      return;
    }
    const data: LookupType = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      name: newLookupData.name,
      description: newLookupData.description,
      commandType: newLookupData.commandType,
      createdBy: user?.userName, 
      updatedAt: new Date().toISOString(),
      updatedBy: user?.userName,
      schema: newLookupData.schema,
      commandText: newLookupData.commandText,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/lookups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Error creating lookup");
      }
      const result: FormReport = await response.json();
      const resultCamel = keysToCamelCase(result) as FormReport;

      toast(`Nuevo Informe Creado: ${resultCamel.name}`);
    } catch (error) {
      toast("Hubo un error al crear el informe.");
      console.error("Error creating report:", error);
    }
  };

  const handleInputChange = (
    field: "name" | "description" | "datasource" | "commandType" | "schema" | "commandText",
    value: string,
  ) => {
    setNewLookupData((prevData) => {
      const data = prevData ?? {
        id: uuidv4(),
        name: "",
        description: "",
        datasource: "",
        commandType: "",
        schema: "",
        commandText: "",
        createdAt: new Date().toISOString(),
        createdBy: user?.userName || "",
        updatedAt: new Date().toISOString(),
        updatedBy: user?.userName || "",
      };
      return {
        ...data,
        [field]: value,
      };
    });
    console.log("Updated newLookupData:", newLookupData);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="m-4 hover:cursor-pointer">
            <PlusCircleIcon />
           {t("createNewLookup")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{t("createNewLookup")}</DialogTitle>
            <DialogDescription>
              {t("fillInFieldsToCreateNewLookup")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                name="name"
                defaultValue={newLookupData?.name || "Reporte de producción"}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={
                  newLookupData?.description || t("defaultDescription")
                }
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
             <Label htmlFor="datasource">{t("datasource")}</Label>
            <Select onValueChange={(e) => handleInputChange("datasource", e)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={t("datasource")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("datasource")}</SelectLabel>
                  {datasources.map((datasource) => (
                    <SelectItem key={datasource.id} value={datasource.id}>
                      {datasource.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateLookup}>{t("addLookup")}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
