import React from 'react';
import { ComponentContent } from '@types';
import { BOB } from './bobInstance';

export function SectionContentRenderer({ components }: { components: ComponentContent[] }) {
  const bobComponents = BOB._customComponents;

  return components.map((component) => {
    const matchBobComponent = bobComponents.find(
      (bobComponent) => bobComponent.name === component.name
    );
    console.log('bobComponents', bobComponents);
    if (!matchBobComponent) return null;

    const Component = matchBobComponent.component;

    // TODO: Zrób tak żeby ten Component miał otypowane propsy
    return <Component key={component._id} />;
  });
}
