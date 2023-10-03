import { getRegisteredComponents } from 'apps/dashboard/utils/api/fetchers';
import React from 'react';

export const RegisteredComponentListing = async () => {
  const registeredComponents = await getRegisteredComponents();
  console.log(registeredComponents);

  return registeredComponents?.map((component) => (
    <div className="" key={component.name}>
      {component.name}
    </div>
  ));
};
