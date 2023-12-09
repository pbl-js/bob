'use client';

import React from 'react';
import { ComponentSchemaResponse } from '@types';
import clsx from 'clsx';
import { addComponentToPageContent } from '../../utils/api/mutations';
import { useDraggable } from '@dnd-kit/core';
import { IS_REGISTERED_COMPONENT_BUTTON } from '../DraggingOverlay/consts';

type Props = {
  component: ComponentSchemaResponse;
  pageContentId: string;
};

export function RegisteredComponentItem({ component, pageContentId }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${component._id}`,
    data: {
      [IS_REGISTERED_COMPONENT_BUTTON]: true,
      component,
    },
  });

  return (
    <button
      ref={setNodeRef}
      // onClick={() =>
      //   addComponentToPageContent({
      //     componentBlueprintId: component._id,
      //     pageContentId,
      //     componentData: {
      //       parentId: 'root',
      //       name: component.name,
      //     },
      //   })
      // }
      className={clsx(
        'bg-slate-700 w-[136px] rounded-md p-2 h-[60px]',
        'text-xs break-words text-slate-300',
        'cursor-move',
        {
          'ring-2 ring-slate-200': isDragging,
        }
      )}
      {...attributes}
      {...listeners}
    >
      {component.name}
    </button>
  );
}
