import { DynamicForm } from "@/components/dynamic-form";
import { Badge } from "@/components/ui/badge";
import { testForms } from "@/data/dummy-schemas";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export const CustomForm = () => {
  const url = useLocation();
  const params = new URLSearchParams(url.search);

  // Mostrar todos los parámetros y la URL en consola
  console.log("params:", Object.fromEntries(params.entries()));

  const id = params.get("id");
  console.log("id param:", id);

  // Buscar el formTemplate correspondiente al id (aquí se usa el primero como ejemplo)

  const formTemplate = testForms[0];

  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-3">
          <div className="bg-muted/50 sm:aspect-auto sm:col-span-2 aspect-auto rounded-xl p-2">
            <div className="relative flex flex-col items-start justify-center w-full h-auto">
              <Badge
                className={cn(
                  "absolute top-1 right-1 uppercase",
                  formTemplate?.status === "draft"
                    ? "bg-yellow-500"
                    : "bg-primary",
                )}
              >
                {formTemplate?.status}
              </Badge>
              <p className="font-bold text-2xl">
                {formTemplate.title ?? "Sin parámetro id"}
              </p>
              <span className="font-extralight italic text-sm">
                {formTemplate?.description}
              </span>
              <span className="font-extralight text-sm">
                {formTemplate?.createdBy} -{" "}
                {new Date(formTemplate?.createdAt).toLocaleDateString("es-ES")}
              </span>
            </div>
          </div>
          <div className="bg-muted/50 sm:aspect-auto aspect-auto rounded-xl" />
        </div>
        <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
          <DynamicForm
            attributes={formTemplate.attributes}
            onSubmit={(values) => console.log(values)}
          />
        </div>
      </div>
    </div>
  );
};
