import React from 'react';
import { getRegisteredComponents } from '../../utils/api/fetchers';
import clsx from 'clsx';

export const RegisteredComponentListing = async () => {
  const registeredComponents = await getRegisteredComponents();

  return (
    <div className="grid grid-cols-2 gap-2">
      {registeredComponents?.map((component) => (
        <div
          className={clsx(
            'bg-slate-700 rounded-md p-2 h-[60px]',
            'text-xs break-words text-slate-300 cursor-pointer'
          )}
          key={component.name}
        >
          {component.name}
        </div>
      ))}
    </div>
  );
};
