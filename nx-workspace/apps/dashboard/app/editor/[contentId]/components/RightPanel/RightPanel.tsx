'use client';
import React from 'react';
import { useEditorContext } from '../../editorContext';
import { ComponentContent, ComponentSchemaResponse } from '@types';

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
      {matchComponent.name}
      <div>
        {matchComponentSchema.propsSchema.map((propSchema) => {
          const matchComponentMatchProp = matchComponent.props.find(
            (matchComponentProp) => matchComponentProp.name === propSchema.name
          );
          if (!matchComponentMatchProp) return null;

          if (propSchema.type === 'string' && matchComponentMatchProp.type === 'string')
            return (
              <div>
                <div>{matchComponentMatchProp.name}</div>
                <div>Value: {matchComponentMatchProp.value}</div>
              </div>
            );

          if (propSchema.type === 'number' && matchComponentMatchProp.type === 'number')
            return (
              <div>
                <div>{matchComponentMatchProp.name}</div>
                <div>Value: {matchComponentMatchProp.value}</div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
