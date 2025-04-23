import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CityWeatherWidget } from "../../types/widget";
import { FullWeatherData } from "../../types/weather";
import { SortableCityWidget } from "./SortableCityWidget";

interface DraweMenuWidgetsProps {
  weatherData: FullWeatherData[];
  isEditMode: boolean;
  widgets: CityWeatherWidget[];
  onWidgetsChange: (widgets: CityWeatherWidget[]) => void;
  onLocationSelect: (lat: number, lon: number) => void;
}

export const DraweMenuWidgets: React.FC<DraweMenuWidgetsProps> = ({
  weatherData,
  isEditMode,
  widgets,
  onWidgetsChange,
  onLocationSelect,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);

      const newWidgets = arrayMove(widgets, oldIndex, newIndex).map(
        (w, index) => ({
          ...w,
          order: index,
        })
      );

      onWidgetsChange(newWidgets);
    }
  };

  const handleDelete = (widgetId: string) => {
    const newWidgets = widgets.map((w) =>
      w.id === widgetId ? { ...w, visible: false } : w
    );
    // const newWidgets = widgets.filter((w) => w.id !== widgetId);
    onWidgetsChange(newWidgets);
  };

  const visibleWidgets = widgets.filter((w) => w.visible);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={visibleWidgets.map((w) => w.id)}
        strategy={verticalListSortingStrategy}
      >
        {visibleWidgets.map((widget) => (
          <SortableCityWidget
            key={widget.id}
            widget={widget}
            weatherData={widget.data}
            isEditMode={isEditMode}
            onDelete={handleDelete}
            onCardClick={() =>
              onLocationSelect(widget.data.lat, widget.data.lon)
            }
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
