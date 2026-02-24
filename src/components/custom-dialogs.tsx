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
import { ReportStatus, type DataType, type FormInfo, type FormReport } from "@/types/types";
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

export function AddNewFormInstance({ forms }: { forms: FormInfo[] }) {
  console.log("Forms in Dialog:", forms);
  const [newReportData, setNewReportData] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  const handleCreateReport = async () => {
    console.log("Creating report...", newReportData);
    // Aquí va la lógica para crear un nuevo informe
    if (!newReportData || !newReportData.type) {
      toast("Por favor, completa todos los campos antes de crear el informe.");
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
            Crear Nuevo Informe
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Nuevo Informe</DialogTitle>
            <DialogDescription>
              Rellena los siguientes campos para crear un nuevo informe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={newReportData?.name || "Reporte de producción"}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={
                  newReportData?.description || "Descripción del informe"
                }
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <Select onValueChange={(e) => handleInputChange("type", e)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Tipo de informe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de informe</SelectLabel>
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateReport}>Crear Informe</Button>
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
