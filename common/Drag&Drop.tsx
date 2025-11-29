/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DragDropListProps<T> {
  items: T[];
  setItems: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  idKey?: keyof T; // default key for unique id, default "id"
}

const DragDrop = <T extends Record<string, any>>  ({
  items,
  setItems,
  renderItem,
  idKey = "id",
}: DragDropListProps<T>) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i[idKey].toString() === active.id.toString());
      const newIndex = items.findIndex((i) => i[idKey].toString() === over.id.toString());
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const SortableItem = ({ item, index }: { item: T; index: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: item[idKey].toString(),
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderItem(item, index)}
      </div>
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i[idKey].toString())} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <SortableItem key={item[idKey].toString()} item={item} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DragDrop;