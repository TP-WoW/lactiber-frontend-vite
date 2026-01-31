import type { ReportAttribute } from "@/types/types";

export const fetchReportParameters = async (reportId: string) => {
  // Lógica para obtener los parámetros del informe basado en el reportId
  // Por ejemplo, podrías hacer una llamada a una API aquí
  try {
    const result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/form-reports/${reportId}`,
    );
    const data = await result.json();
    return data as ReportAttribute[];
  } catch (error) {
    console.error("Error fetching report parameters:", error);
    return [];
  }
};
