import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("Drag Ended", event);
    if (!over) return;

    console.log("Over data:", over.id);

    // identify the type of droppable region (regular item vs panel droppable area)
    // const overData = items.find((it) => it.id === (over.id as string));

    // if (overData?.dataType === "panel") {
    //   console.log(`Dropped over panel ${overData.id}`);
    // }

    setItems((currentItems) => {
      const activeId = active.id as string;
      const overId = over.id as string;

      // identify the type of droppable region (regular item vs panel droppable area)
      const overData = currentItems.find((it) => it.id === (over.id as string));

      const activeItem = currentItems.find((it) => it.id === activeId);
      if (!activeItem) return currentItems;

      // Remove active from the list first
      const withoutActive = currentItems.filter((it) => it.id !== activeId);

      // If dropped over a panel droppable region, assign panelId and insert at end of panel group
      if (overData?.dataType === "panel") {
        const panelId = overData.id as string;
        const newItem = { ...activeItem, panelId };

        // find last index of existing children for that panel
        let lastIndex = -1;
        for (let i = 0; i < withoutActive.length; i++) {
          if (withoutActive[i].panelId === panelId) lastIndex = i;
        }

        let insertIndex = -1;
        if (lastIndex !== -1) {
          insertIndex = lastIndex + 1;
        } else {
          // if no children, insert after the panel item itself if present
          const panelPos = withoutActive.findIndex((it) => it.id === panelId);
          insertIndex = panelPos !== -1 ? panelPos + 1 : withoutActive.length;
        }

        const next = [...withoutActive];
        next.splice(insertIndex, 0, newItem);
        return next;
      }

      // Otherwise, dropped over another item id — insert before that item
      const overIndex = withoutActive.findIndex((it) => it.id === overId);
      if (overIndex === -1) return currentItems;

      const overItem = currentItems.find((it) => it.id === overId);
      const newItem = { ...activeItem, panelId: overItem?.panelId };

      const next = [...withoutActive];
      next.splice(overIndex, 0, newItem);
      return next;
    });
    console.log("Items after drag end:", items);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {/* Render only top-level (no panelId) as the main sortable list */}
      {/** SortableContext works for the top-level region */}
      <SortableContext
        items={items.filter((it) => !it.panelId).map((it) => it.id)}
        strategy={verticalListSortingStrategy}
      >
        {items
          .filter((it) => !it.panelId)
          .map((item) => (
            <DndComponent key={item.id} item={item} />
          ))}
      </SortableContext>
    </DndContext>
  );
};

export default DndContainer;
