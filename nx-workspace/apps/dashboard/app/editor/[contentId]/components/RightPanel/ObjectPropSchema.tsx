'use client';

import { ComponentContent, DataFieldContent, DataFieldSchema_Object, PageContentRequest } from '@types';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@ui/components/ui/popover';
import { Switch } from '@ui/components/ui/switch';
import clsx from 'clsx';
import React from 'react';
import { updateComponents } from './utils';
import { updateComponentsFromPageContent } from 'apps/dashboard/utils/api/mutations';

export function ObjectPropSchema({
  propSchema,
  detailsState,
  setDetailsState,
  details,
  value,
  editProp,
  component,
  sendComponentsToApi,
}: {
  propSchema: DataFieldSchema_Object;
  detailsState: PageContentRequest;
  setDetailsState: React.Dispatch<React.SetStateAction<PageContentRequest>>;
  value: DataFieldContent[] | null;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  details: PageContentRequest;
}) {
  console.log('value: ', value);

  if (!value || value?.length === 0)
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

  return (
    <div className="flex flex-col gap-2 w-full border p-3 rounded-md">
      {value.map((val) => (
        <div key={val.name} className="flex justify-between">
          <div>{val.name}</div>
          {(() => {
            if (val.type === 'string') return <div>{val.value}</div>;
            if (val.type === 'number') return <div className="text-blue-400">{val.value}</div>;
            if (val.type === 'boolean')
              return (
                <div className={clsx({ 'text-green-400': val.value === true, 'text-red-400': val.value === false })}>
                  {val.value === true ? 'true' : 'false'}
                </div>
              );
          })()}
        </div>
      ))}
      <Popover>
        <PopoverTrigger>
          <Button className="w-full">Add object</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col gap-2">
          {propSchema.subfields.map((schema_subfield) => {
            const content_matchSubfield = value.find((val) => val.name === schema_subfield.name);
            const content_restSubfields = value.filter((val) => val.name !== schema_subfield.name);

            return (
              <div className="grid w-full max-w-sm items-center gap-1.5" key={schema_subfield.name}>
                {(() => {
                  if (schema_subfield.type === 'string') {
                    return (
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor={schema_subfield.name}>{schema_subfield.name}</Label>
                        <Input
                          id={schema_subfield.name}
                          value={content_matchSubfield?.type === 'string' ? content_matchSubfield.value : ''}
                          onBlur={sendComponentsToApi}
                          onChange={(e) =>
                            editProp({
                              componentId: component._id,
                              newProp: {
                                type: 'object',
                                name: propSchema.name,
                                subfields: [
                                  ...content_restSubfields,
                                  {
                                    name: schema_subfield.name,
                                    type: 'string',
                                    value: e.target.value,
                                  },
                                ],
                              },
                            })
                          }
                          type="text"
                          placeholder={schema_subfield.name}
                        />
                      </div>
                    );
                  }

                  if (schema_subfield.type === 'number')
                    return (
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor={schema_subfield.name}>{schema_subfield.name}</Label>
                        <Input
                          id={schema_subfield.name}
                          type="text"
                          value={content_matchSubfield?.type === 'number' ? content_matchSubfield.value : ''}
                          onBlur={sendComponentsToApi}
                          onChange={(e) =>
                            editProp({
                              componentId: component._id,
                              newProp: {
                                type: 'object',
                                name: propSchema.name,
                                subfields: [
                                  ...content_restSubfields,
                                  {
                                    name: schema_subfield.name,
                                    type: 'number',
                                    value: Number(e.target.value),
                                  },
                                ],
                              },
                            })
                          }
                        />
                      </div>
                    );

                  if (schema_subfield.type === 'boolean')
                    return (
                      <div className="flex justify-between w-full max-w-sm gap-1.5">
                        <Label htmlFor={schema_subfield.name}>{schema_subfield.name}</Label>
                        <Switch
                          checked={content_matchSubfield?.type === 'boolean' ? content_matchSubfield.value : false}
                          onCheckedChange={async (e) => {
                            const newProp: DataFieldContent = {
                              type: 'object',
                              name: propSchema.name,
                              subfields: [
                                ...content_restSubfields,
                                { name: schema_subfield.name, type: 'boolean', value: e },
                              ],
                            };

                            // editProp({
                            //   componentId: component._id,
                            //   newProp: newProp,
                            // });

                            const updatedComponents = updateComponents({
                              componentId: component._id,
                              newProp,
                              components: detailsState.components,
                            });

                            // Note: We can't use detailsState.components because setState is "async"
                            await updateComponentsFromPageContent({
                              pageContentId: details._id,
                              components: updatedComponents,
                            });
                          }}
                        />
                      </div>
                    );
                })()}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
