import { memo } from 'react';
import { useLocation } from 'react-router-dom';

const Notifications = () => {
const url = useLocation();
  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-2">
      <h1 className="font-extrabold text-3xl uppercase">{url.pathname.replace(/^\//, "").split("/").join(" > ")}</h1>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div>
    </div>
  );
};

export default memo(Notifications);