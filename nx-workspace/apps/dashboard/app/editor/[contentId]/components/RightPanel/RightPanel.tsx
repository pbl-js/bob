'use client';
import React from 'react';
import { useEditorContext } from '../../editorContext';
import { ComponentContent } from '@types';

type Props = {
  components: ComponentContent[];
};

export function RightPanel({ components }: Props) {
  const { state } = useEditorContext();

  const matchComponent = components.find(({ _id }) => _id === state.selectedBobComponentId);
  console.log('matchComponent', matchComponent);
  if (!matchComponent) return <div>No match component</div>;

  return <div>{matchComponent.name}</div>;
}
