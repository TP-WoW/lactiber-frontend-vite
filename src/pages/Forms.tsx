import { getAllFormReports, getAllForms } from "@/actions/formActions";
import { AddNewFormInstance } from "@/components/custom-dialogs";
import { DataTable } from "@/components/form-report-table/data-table";
import { keysToCamelCase } from "@/lib/utils";
import type { FormInfo, FormReport, TransformedReport } from "@/types/types";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Forms = () => {
  const url = useLocation();
  const [forms, setForms] = useState<FormInfo[] | []>([]);
  // Eliminado reports, ya no se usa

  const [transformedReports, setTransformedReports] = useState<TransformedReport[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      const data = await getAllForms();
      console.log("Fetched Forms:", data);
      console.log("Fetched Forms:", forms);
      if (data) {
        const camelData: FormInfo[] = keysToCamelCase(data) as FormInfo[];
        setForms(
          camelData?.filter((form: FormInfo) => form.status === "published") ||
            [],
        );
      }
    };
    const fetchFormReports = async () => {
      const data = await getAllFormReports();
      if (data) {
        const camelData: FormReport[] = keysToCamelCase(data) as FormReport[];


        // Transformar los datos para el nuevo estado que espera DataTable
        const transformed: TransformedReport[] = (camelData || [])
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((report, idx) => ({
            id: idx + 1,
            reportId: report.id,
            name: report.name,
            form: report.title || "", // Ajusta si tienes el nombre del formulario
            formId: report.formId || "", // Ajusta si tienes el nombre del formulario
            status: report.status || "",
            assignedTo: report.assignedTo || "Unassigned",
            reviewer: report.reviewer || "Unassigned",
            description: report.description || "",
            createdAt: new Date(report.createdAt).toLocaleDateString(),
          }));
        setTransformedReports(transformed);
      }
    };
    fetchForms();
    fetchFormReports();
  }, []); // forms no es necesario como dependencia aquí

  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          <AddNewFormInstance forms={forms} />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{
              transformedReports.filter(r => {
                const created = new Date(r.createdAt ?? "");
                const now = new Date();
                const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                return created >= weekAgo && created <= now;
              }).length
            }</span>
            <span className="text-lg font-medium text-muted-foreground">Reportes última semana</span>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{transformedReports.filter(r => r.status === "complete" || r.status === "done" || r.status === "submitted" ).length}</span>
            <span className="text-lg font-medium text-muted-foreground">Reportes completados</span>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{transformedReports.filter(r => r.status === "submitted" ).length}</span>
            <span className="text-lg font-medium text-muted-foreground">Pendientes de validación</span>
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min py-3">
          {transformedReports && <DataTable data={transformedReports} />}
        </div>
      </div>
    </div>
  );
};

export default memo(Forms);
