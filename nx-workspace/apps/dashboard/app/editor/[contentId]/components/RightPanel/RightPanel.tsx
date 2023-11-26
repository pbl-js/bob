'use client';
import React from 'react';
import { useEditorContext } from '../../editorContext';
import { ComponentContent, ComponentSchemaResponse } from '@types';
import clsx from 'clsx';

type Props = {
  components: ComponentContent[];
  componentsSchema: ComponentSchemaResponse[];
};

export function RightPanel({ components, componentsSchema }: Props) {
  const { state } = useEditorContext();

  const matchComponent = components.find(({ _id }) => _id === state.selectedBobComponentId);
  const matchComponentSchema = componentsSchema.find(({ _id }) => matchComponent?.componentBlueprintId === _id);

  if (!matchComponent || !matchComponentSchema) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {matchComponentSchema.propsSchema.map((propSchema) => {
          const matchComponentMatchProp = matchComponent.props.find(
            (matchComponentProp) => matchComponentProp.name === propSchema.name
          );
          if (!matchComponentMatchProp) return null;

          if (propSchema.type === 'string' && matchComponentMatchProp.type === 'string')
            return (
              <div className="flex flex-col gap-1">
                <label>{matchComponentMatchProp.name}</label>
                <input
                  className={clsx('rounded-md bg-slate-700 p-3 border border-slate-600', 'hover:border-slate-500')}
                  type="text"
                  value={matchComponentMatchProp.value}
                />
              </div>
            );

          if (propSchema.type === 'number' && matchComponentMatchProp.type === 'number')
            return (
              <div className="flex flex-col gap-1">
                <label>{matchComponentMatchProp.name}</label>
                <input
                  className={clsx('rounded-md bg-slate-700 p-3 border border-slate-600', 'hover:border-slate-500')}
                  type="text"
                  value={matchComponentMatchProp.value}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
