import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DndComponent } from "./DndComponents";
import type { DbAttribute } from "@/types/types";

const DndContainer = ({
  items,
  setItems,
}: {
  items: DbAttribute[];
  setItems: React.Dispatch<React.SetStateAction<DbAttribute[]>>;
}) => {
  // console.log("DndContainer items:", items);

  const handleGragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("Drag Ended", event);
    console.log("Active Item:", active.id);
    console.log("Over Item:", over?.id);
    // Here you would typically update the state to reflect the new order
    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active?.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleGragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DndComponent key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DndContainer;
