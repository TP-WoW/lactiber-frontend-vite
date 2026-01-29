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
import type { FormInfo } from "@/types/types";
import { PlusCircleIcon } from "lucide-react";
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
import { useState } from "react";

export function AddNewFormInstance({
  forms,
  handleCreateReport,
}: {
  forms: FormInfo[];
  handleCreateReport: () => void;
}) {
  console.log("Forms in Dialog:", forms);
  const [newReportData, setNewReportData] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);
  const handleInputChange = (
    field: "name" | "description" | "type",
    value: string,
  ) => {
    setNewReportData((prevData) => {
      const data = prevData ?? { name: "", description: "", type: "" };
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
                defaultValue="Reporte de producción"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue="Descripción del informe"
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
