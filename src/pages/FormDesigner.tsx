import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { FormInfo } from "@/types/types";

import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const columns: ColumnDef<FormInfo>[] = [
  {
    accessorKey: "Id",
    header: "Id",
  },
  {
    accessorKey: "Title",
    header: "Título",
  },
  {
    accessorKey: "Description",
    header: "Descripción",
  },
  {
    accessorKey: "Status",
    header: "Estado",
  },
];

export default function FormDesigner() {
  const [forms, setForms] = useState<FormInfo[]>([]);

  const fetchForms = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forms`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }
      const data = await response.json();
      console.log("Fetched forms:", data);
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const updateFormList = async () => await fetchForms();

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Formularios</h1>
        <AddNewFormDialog updateFormList={updateFormList} />
      </div>
      {forms && <DataTable columns={columns} data={forms} />}
    </div>
  );
}

export function AddNewFormDialog({ updateFormList }: { updateFormList: () => Promise<void> }) {
  const [formName, setFormName] = useState("");
  const handleCreateForm = async () => {
    try {
      console.log("Creating form with name:", formName);
      // Aquí iría la lógica para crear el formulario, por ejemplo, una llamada a la API
      const newForm: FormInfo = {
        id: crypto.randomUUID(),
        title: formName,
        description: "Descripción del nuevo formulario",
        createdAt: new Date().toISOString(),
        createdBy: "currentUser", // Reemplazar con el usuario actual
        status: "draft",
        attributes: [],
      };
      console.log("New form created:", newForm);
      const result = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newForm),
        },
      );
      if (!result.ok) {
        throw new Error("Failed to create form");
      }
      const createdForm = await result.json();
      console.log("Form successfully created on server:", createdForm);
      await updateFormList();
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md hover:cursor-pointer">
          <Edit2Icon /> Crear nuevo formulario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo formulario</DialogTitle>
          <DialogDescription>
            Ingresa el nombre del nuevo formulario.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="formName" className="sr-only">
              Link
            </Label>
            <Input
              id="formName"
              placeholder="Form Name"
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
          <Button type="button" onClick={handleCreateForm}>
            <PlusCircleIcon /> Add New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
