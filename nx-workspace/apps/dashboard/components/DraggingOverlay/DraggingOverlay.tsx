'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React from 'react';
import { IS_REGISTERED_COMPONENT_BUTTON } from './consts';
import { RegisteredComponentItem } from '../RegisteredComponentsListing/RegisteredComponentItem';

export function DraggingOverlay() {
  const [dragItem, setDragItem] = React.useState<Active | null>();

  useDndMonitor({
    onDragStart: (e) => {
      setDragItem(e.active);
    },
    onDragCancel: () => {
      setDragItem(null);
    },
    onDragEnd: () => {
      setDragItem(null);
    },
  });

  if (!dragItem) return null;

  let node = <div>No drag item</div>;
  const isRegisteredComponentElement = dragItem.data.current?.[IS_REGISTERED_COMPONENT_BUTTON];

  if (isRegisteredComponentElement) {
    node = <RegisteredComponentItem pageContentId="sdfsdfsdfsd" component={dragItem?.data.current?.component} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
  // IS_REGISTERED_COMPONENT_BUTTON;
  // if (dragItem?.data.current?.[IS_REGISTERED_COMPONENT_BUTTON]) return <DragOverlay>No drag overlay</DragOverlay>;
}
