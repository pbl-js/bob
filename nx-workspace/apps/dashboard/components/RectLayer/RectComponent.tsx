import React from 'react';
import { ComponentRectData } from '../../../../libs/types/src';
import { useEditorContext } from '../../app/editor/[contentId]/editorContext';
import clsx from 'clsx';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';

export function RectComponent({ componentRectData }: { componentRectData: ComponentRectData }) {
  const { state: editorState, dispatch: editorDispatch } = useEditorContext();
  const isComponentSelected = editorState.selectedBobComponentId === componentRectData.componentId;
  const { top, bottom, left, right, height, width } = componentRectData.rectData;
  const style = { top, bottom, left, right, height, width };

  const droppable = useDroppable({
    id: `rect-component-drop-area-${componentRectData.componentId}`,
    data: {
      isRectComponentDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (e) => console.log('Drag end: ', e),
    onDragMove: (e) => {
      console.log(e.over);
    },
  });

  return (
    <div
      ref={droppable.setNodeRef}
      onClick={() =>
        editorDispatch({
          type: 'set-selected-bob-component-id',
          payload: { selectedBobComponentId: componentRectData.componentId },
        })
      }
      key={componentRectData.componentId}
      className={clsx(
        'hover:border border-blue-400',
        {
          'border border-blue-400': isComponentSelected,
        },
        {
          'border border-blue-400': droppable.isOver,
        }
      )}
      style={style}
    ></div>
  );
}
