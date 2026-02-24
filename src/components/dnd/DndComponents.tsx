import React from "react";
import type { DbAttribute } from "@/types/types";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import {
  Grip,
  MessageCircleQuestionMark,
  Trash2,
} from "lucide-react";
import { FormAttributeDrawer } from "../FormAttributeDrawer";
import { toolItems } from "@/data/data";
import { useFormEditor } from "@/hooks/use-formEditor";
import { Separator } from "@radix-ui/react-separator";
import { SaveCustomComponentDiaglog } from "../custom-dialogs";
import { Button } from "../ui/button";
// import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const DndComponent = ({ item }: { item: DbAttribute }) => {
  // const { t } = useTranslation("common");
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
      className="relative flex flex-row items-center justify-start gap-2 border rounded-md p-1 bg-primary-foreground shadow-md my-2 hover:cursor-pointer"
    >
      <div className="flex flex-row items-center gap-2 flex-1">
        <Grip
          className="text-secondary-foreground"
          {...attributes}
          {...listeners}
        />
        {(() => {
          const tool = toolItems.find((tool) => tool.type === item.dataType);
          if (tool && tool.icon) {
            const Icon = tool.icon;
            return <Icon className="text-secondary-foreground" />;
          }
          return (
            <MessageCircleQuestionMark className="text-secondary-foreground" />
          );
        })()}
        {item.dataType === "panel" ? (
          <PanelComponentDesigner item={item} />
        ) : (
          <div className="flex flex-col">
            <p>{item.label || "Unnamed"}</p>
            <h3 className="italic text-sm">
              {item.description || "No description"}
            </h3>
          </div>
        )}
      </div>
      <FormAttributeDrawer item={item} />
      <SaveCustomComponentDiaglog id={item.id} />
      <Button
        variant={"outline"}
        className="hover:cursor-pointer flex items-center justify-between w-fit"
        onClick={() => {
          setItems(items.filter((it) => it.id !== item.id));
        }}
      >
        {/* {t("delete")} */}
        <Trash2 className="hover:cursor-pointer" />
      </Button>
    </div>
  );
};

export const PanelComponentDesigner = ({ item }: { item: DbAttribute }) => {
  const { items } = useFormEditor();

  // items that belong to this panel
  const panelItems = items.filter((it) => it.panelId === item.id);

  const { setNodeRef, isOver } = useDroppable({
    id: `${item.id}`,
    data: { type: "panel", panelId: item.id },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-full border rounded-md p-3 transition-colors ${
        isOver ? "border-blue-500 bg-blue-50" : "border-transparent"
      }`}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <p className="font-semibold">{item.label || "Unnamed Panel"}</p>
          </AccordionTrigger>
          <AccordionContent>
            <h3 className="italic text-sm text-secondary-foreground">
              {item.description || "No description"}
            </h3>
            <Separator className="border-secondary-foreground/50 border rounded-2xl w-full my-2" />
            {panelItems.length > 0 ? (
              <SortableContext
                items={panelItems.map((it) => it.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-2 w-full">
                  {panelItems.map((panelItem) => (
                    <PanelItem key={panelItem.id} panelItem={panelItem} />
                  ))}
                </div>
              </SortableContext>
            ) : (
              <span className="text-secondary-foreground text-xs text-center py-4">
                Arrastra elementos aquí
              </span>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const PanelItem = ({ panelItem }: { panelItem: DbAttribute }) => {
  // const { t } = useTranslation("common");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: panelItem.id });
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
      className="flex flex-row items-center justify-start gap-2 border rounded-md p-3 shadow-sm"
    >
      <Grip
        className="text-secondary-foreground text-sm"
        {...attributes}
        {...listeners}
      />
      {(() => {
        const tool = toolItems.find((tool) => tool.type === panelItem.dataType);
        if (tool && tool.icon) {
          const Icon = tool.icon;
          return <Icon className="text-secondary-foreground text-sm" />;
        }
        return (
          <MessageCircleQuestionMark className="text-secondary-foreground text-sm" />
        );
      })()}
      <div className="flex flex-col flex-1 z-0">
        <p className="text-sm">{panelItem.label || "Unnamed"}</p>
        <h3 className="italic text-xs text-secondary-foreground">
          {panelItem.description || "No description"}
        </h3>
      </div>
       <FormAttributeDrawer item={panelItem} />
      <SaveCustomComponentDiaglog id={panelItem.id} />
      <Button
        variant={"outline"}
        className="hover:cursor-pointer flex items-center justify-between w-fit"
        onClick={() => {
          setItems(items.filter((it) => it.id !== panelItem.id));
        }}
      >
        {/* {t("delete")} */}
        <Trash2 className="hover:cursor-pointer" />
      </Button>
    </div>
  );
};
