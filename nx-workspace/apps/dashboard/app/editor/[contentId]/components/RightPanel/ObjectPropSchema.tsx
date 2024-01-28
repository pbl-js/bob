'use client';

import { DataFieldContent, DataFieldSchema_Object, PageContentRequest } from '@types';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@ui/components/ui/popover';
import React from 'react';

export function ObjectPropSchema({
  propSchema,
  detailsState,
  setDetailsState,
  value,
}: {
  propSchema: DataFieldSchema_Object;
  detailsState: PageContentRequest;
  setDetailsState: React.Dispatch<React.SetStateAction<PageContentRequest>>;
  value: DataFieldContent[] | null;
}) {
  const [isObjectCreating, setIsObjectCreating] = React.useState(false);

  function onClick() {}

  console.log('value: ', value);

  if ((value && value === null) || value?.length === 0)
    return (
      <div className="flex flex-row justify-between items-center gap-1.5">
        <Label>{propSchema.name}</Label>

        <Popover>
          <PopoverTrigger>
            <Button>Add object</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            {propSchema.subfields.map((prop) => {
              if (prop.type === 'string') {
                return (
                  <div key={prop.name} className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor={prop.name}>{prop.name}</Label>
                    <Input
                      id={prop.name}
                      // value={matchComponentMatchProp?.type === 'string' ? matchComponentMatchProp.value : ''}
                      // onBlur={onBlur}
                      // onChange={(e) =>
                      //   onChange({
                      //     componentId: matchComponent._id,
                      //     newProp: {
                      //       type: 'string',
                      //       name: propSchema.name,
                      //       value: e.target.value,
                      //     },
                      //   })
                      // }
                      type="text"
                      placeholder={prop.name}
                    />
                  </div>
                );
              }

              if (prop.type === 'number')
                return (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor={prop.name}>{prop.name}</Label>
                    <Input
                      id={prop.name}
                      type="number"
                      // value={matchComponentMatchProp?.type === 'number' ? matchComponentMatchProp.value : 0}
                      // onBlur={onBlur}
                      // onChange={(e) =>
                      //   onChange({
                      //     componentId: matchComponent._id,
                      //     newProp: {
                      //       type: 'number',
                      //       name: propSchema.name,
                      //       value: Number(e.target.value),
                      //     },
                      //   })
                      // }
                    />
                  </div>
                );
            })}
          </PopoverContent>
        </Popover>
      </div>
    );

  return <div>blank super content</div>;
}
