'use client';

import React from 'react';
import { ComponentSchemaResponse } from '../../../../libs/types/src';
import clsx from 'clsx';
import { addComponentToPageContent } from '../../utils/api/mutations';

type Props = {
  component: ComponentSchemaResponse;
  pageContentId: string;
};

export function RegisteredComponentItem({ component, pageContentId }: Props) {
  return (
    <button
      onClick={() =>
        addComponentToPageContent({
          componentBlueprintId: component._id,
          pageContentId,
          componentData: {
            parentId: 'root',
            name: 'test',
          },
        })
      }
      className={clsx(
        'bg-slate-700 rounded-md p-2 h-[60px]',
        'text-xs break-words text-slate-300 cursor-pointer'
      )}
      key={component.name}
    >
      {component.name}
    </button>
  );
}
