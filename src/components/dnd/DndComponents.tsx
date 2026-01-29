import type { DbAttribute } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import {
  Grip,
  MessageCircleQuestionMark,
  Trash2,
} from "lucide-react";
import { FormAttributeDrawer } from "../FormAttributeDrawer";
import { toolItems } from "@/data/data";
import { useFormEditor } from "@/hooks/use-formEditor";

export const DndComponent = ({ item }: { item: DbAttribute }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const { items, setItems } = useFormEditor();
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-center justify-start gap-2 border rounded-md p-5 bg-primary-foreground shadow-md my-2 hover:cursor-pointer"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex flex-row items-center gap-2 flex-1"
      >
        <Grip className="text-secondary-foreground" />
        {
          (() => {
            const tool = toolItems.find((tool) => tool.type === item.dataType);
            if (tool && tool.icon) {
              const Icon = tool.icon;
              return <Icon className="text-secondary-foreground" />;
            }
            return <MessageCircleQuestionMark className="text-secondary-foreground" />;
          })()
        }
        <div className="flex flex-col">
          <p>{item.name || "Unnamed"}</p>
          <h3 className="italic text-sm">{item.dataType}</h3>
        </div>
      </div>
      <Trash2
        className="text-secondary-foreground hover:cursor-pointer"
        onClick={() => setItems(items.filter((it) => it.id !== item.id))}
      />
      {/* El botón del Drawer NO debe tener listeners de drag */}
      <FormAttributeDrawer item={item} />
    </div>
  );
};
