import { fetchReportParameters } from "@/actions/formReportActions";
import { DynamicForm } from "@/components/dynamic-form";
import { Badge } from "@/components/ui/badge";
import { cn, keysToCamelCase } from "@/lib/utils";
import { ReportStatus, type ReportAttribute } from "@/types/types";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export const CustomForm = () => {
  const url = useLocation();
  const {t} = useTranslation();
  const params = new URLSearchParams(url.search);
  // Mostrar todos los parámetros y la URL en consola
  console.log("params:", Object.fromEntries(params.entries()));

  const [reportParams, setReportParams] = useState<ReportAttribute[]>([]);

  useEffect(() => {
    const fetchParametersAsync = async (reportId: string) => {
      const data = await fetchReportParameters(reportId || "");
      console.log("Raw Report Parameters:", data);
      const camelCaseData = keysToCamelCase(data);
      setReportParams(camelCaseData as ReportAttribute[]);
    };

    const reportId = params.get("reportId");
    console.log("id param:", reportId);
    fetchParametersAsync(reportId || "");
  }, []);

  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log("Form submitted with values:", values);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o procesarlos según sea necesario
    const submittedData = reportParams.map((attr) => ({
      formReportId: reportParams[0]?.reportId || "",
      attributeId: attr.id,
      value: values[attr.name] ?? null,
      doneBy: "currentUserId", // Reemplaza con el ID del usuario actual
    }));
    console.log("Prepared data for submission:", submittedData);
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/form-reports/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
      });
      console.log("Data successfully submitted.");
      toast.success("Datos enviados correctamente");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error al enviar los datos");
    }
  }

  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      {reportParams?.length > 0 && (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 sm:grid-cols-3">
            <div className="bg-muted/50 sm:aspect-auto sm:col-span-2 aspect-auto rounded-xl p-2">
              <div className="relative flex flex-col items-start justify-center w-full h-auto">
                <Badge
                  className={cn(
                    "absolute top-1 right-1 uppercase",
                    reportParams[0]?.reportStatus === "new"
                      ? "bg-yellow-500"
                      : reportParams[0]?.reportStatus === "in-progress"
                      ? "bg-green-500"
                      : "bg-gray-500",
                  )}
                >
                  {reportParams[0]?.reportStatus}
                </Badge>
                <p className="font-bold text-2xl">
                  {reportParams[0]?.reportName ?? "Sin parámetro id"}
                </p>
                <span className="font-extralight italic text-sm">
                  {reportParams[0]?.reportDescription || "Sin descripción"}
                </span>
                <span className="font-extralight text-sm">
                  {reportParams[0]?.reportDescription} -{" "}
                  {new Date(
                    reportParams[0]?.reportStartedAt ||
                      reportParams[0]?.reportCreatedAt ||
                      "",
                  ).toLocaleDateString("es-ES")}
                </span>
              </div>
            </div>
            <div className="bg-muted/50 sm:aspect-auto aspect-auto rounded-xl">
              <div className="flex flex-col items-start justify-center w-full h-auto p-2 gap-1 text-sm">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{t("createdBy")}:</p>
                  <span className="italic">
                    {reportParams[0]?.reportCreatedBy || t("unknown")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{t("assignedTo")}:</p>
                  <span className="italic">
                    {reportParams[0]?.reportAssignedTo || t("unknown")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{t("lastUpdatedAt")}:</p>
                  <span className="italic">
                    {new Date(reportParams[0]?.reportLastUpdateAt || "").toLocaleDateString("es-ES") || "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
            <DynamicForm
              attributes={reportParams}
              onSubmit={(values) => handleSubmit(values)}
              isEditable={reportParams[0]?.reportStatus === ReportStatus.NEW || reportParams[0]?.reportStatus === ReportStatus.STARTED}
            />
          </div>
        </div>
      )}
    </div>
  );
};
