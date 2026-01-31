import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export interface DraggableKPIProps {
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export function DraggableKPI({ id, index, moveCard, children }: DraggableKPIProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "KPI_CARD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "KPI_CARD",
    hover(item: { id: string; index: number }) {
      if (!ref.current) return;
      if (item.index === index) return;
      moveCard(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      {children}
    </div>
  );
}
