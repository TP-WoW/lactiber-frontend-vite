import { getAllForms } from "@/actions/formActions";
import { AddNewFormInstance } from "@/components/custom-dialogs";
import { keysToCamelCase } from "@/lib/utils";
import type { FormInfo } from "@/types/types";
import { memo, useEffect, useState } from "react";
import { useLocation} from "react-router-dom";

const Forms = () => {
  const url = useLocation();
  const [forms, setForms] = useState<FormInfo[] | []>([]);

  const handleCreateReport = async () => {
    console.log("Creating report...");
    // Aquí va la lógica para crear un nuevo informe
  }

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
    fetchForms();
  }, []);

  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          <AddNewFormInstance forms={forms} handleCreateReport={handleCreateReport} />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default memo(Forms);
