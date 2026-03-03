import { AddNewFormInstance, AddNewLookup } from "@/components/custom-dialogs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LookupType } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircleCheck, EllipsisVertical, LoaderCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columns: ColumnDef<LookupType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.description || "Sin descripción"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "datasource",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.datasource || "Sin datasource"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => alert(row.original)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>Hacer una copia</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => alert(row.original)}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Lookups = () => {
  const url = useLocation();
  const [lookups, setLookups] = useState<LookupType[]>([]);
  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          <AddNewLookup />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min py-3">
          {lookups && <DataTable data={lookups} columns={columns} />}
        </div>
      </div>
    </div>
  );
};

export default memo(Lookups);

const TableCellViewer: React.FC<{ item: LookupType }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="link" onClick={() => setIsOpen(true)}>
        {item.name}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          <p>{item.description || "Sin descripción"}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};
