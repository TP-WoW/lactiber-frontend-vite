import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Forms = () => {
  const url = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          <Button
            className="m-4 rounded-full hover:cursor-pointer"
            onClick={() => navigate(`/dashboard/forms/form?id=${uuidv4()}`)}
          >
            <PlusCircleIcon />
            Crear Nuevo Formulario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Forms);
